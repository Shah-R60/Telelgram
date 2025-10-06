import { View, Text, ActivityIndicator } from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { tokenProvider } from '../../utils/TokenProvider.tsx';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { useAuth } from './AuthProvider.tsx';
import { supabase } from '../../lib/supabase.ts';
// import process from "node:process";
const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

export default function VideoProvider({ children }: PropsWithChildren) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }

    const initVideoClient = async () => {
      const imageUrl = profile.avatar_url
        ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl
        : undefined;

      const user = {
        id: profile.id,
        name: profile.full_name || 'Anonymous User',
        image: imageUrl,
      };
      const client = new StreamVideoClient({ apiKey, user, tokenProvider });
      setVideoClient(client);
    };

    initVideoClient();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [profile?.id]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}