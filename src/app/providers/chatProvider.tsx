import { Slot, Stack } from 'expo-router';
import { useEffect, useState, PropsWithChildren } from 'react';
import { StreamChat } from "stream-chat";
import { ActivityIndicator } from 'react-native';
import { Chat, OverlayProvider } from "stream-chat-expo";

// Use the API key directly for now to test
const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
// const API_KEY = "au592tv2s8hq";
console.log("API Key:", API_KEY);
const client = StreamChat.getInstance(API_KEY);

const ChatProvider = ({children}: PropsWithChildren) => {
const [isReady, setIsReady] = useState(false);

  useEffect(()=>{
    const connect = async()=>{
                await client.connectUser(
            {
              id: "jlahey",
              name: "Jim Lahey",
              image: "https://i.imgur.com/fR9Jz14.png",
            },
            client.devToken('jlahey')
          );
          setIsReady(true);
    };
    
    connect();

    return ()=>{
        // client.disconnectUser();
        if (isReady) {
        client.disconnectUser();
      }
        setIsReady(false);
    }
  }, []);

  // Show loading while connecting
  if (!isReady) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' ,alignContent: 'center' }} />;
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