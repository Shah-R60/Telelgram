import { Slot, Stack } from 'expo-router';
import { useEffect, useState, PropsWithChildren } from 'react';
import { StreamChat } from "stream-chat";
import { ActivityIndicator } from 'react-native';
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';

// Use the API key directly for now to test
const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
// const API_KEY = "au592tv2s8hq";
console.log("API Key:", API_KEY);
const client = StreamChat.getInstance(API_KEY);


const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  const { profile } = useAuth();
  // console.log(user);

  useEffect(() => {

      let didConnect = false; 
    if (!profile) {
      return;
    }
    const connect = async () => {

      
      try {

        // const defaultAvatar = "https://avatar.iran.liara.run/public/boy"
        console.log('Connecting user:', profile.id, profile.full_name, profile.avatar_url);
        const imageUrl = profile.avatar_url
          ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl
          : undefined; // Pass undefined if no avatar

        await client.connectUser(
          {
            id: profile.id,
            // 2. Provide a fallback for the name
            name: profile.full_name || 'New User',
            image: imageUrl,
          },

          client.devToken(profile.id)
        );
        didConnect = true; 
        setIsReady(true);

      }
      catch (error) {
        // setIsReady(true);
        console.error('Error connecting user:', error);
      }

    };

    connect();

    return () => {
      if (didConnect) {
        client.disconnectUser();
      }
      setIsReady(false);
    }
  }, [profile?.id]);

  // Show loading while connecting
  if (!isReady) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} />;
  }

  return (

    <OverlayProvider>
      <Chat client={client}>
        {children}
      </Chat>
    </OverlayProvider>
  )
}

export default ChatProvider;