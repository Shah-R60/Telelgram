import { Stack } from 'expo-router';
import ChatProvider from '../providers/chatProvider.tsx';
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider.tsx';
import React from "react";
import VideoProvider from '../providers/VideoProvider.tsx';
export default function HomeLayout() {
   const { user } = useAuth();
  
      if(!user){
          return <Redirect href="/(auth)/login" />;
      }
      



  return (
    
        <ChatProvider>
          <VideoProvider>
          <Stack>
            <Stack.Screen name="call/index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="channel" options={{ headerShown: false }} />
          </Stack>
          </VideoProvider>
        </ChatProvider>
  );
}
