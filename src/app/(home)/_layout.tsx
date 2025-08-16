import { Slot, Stack } from 'expo-router';
import ChatProvider from '../providers/chatProvider';
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
export default function HomeLayout() {
   const { user } = useAuth();
  
      if(!user){
          return <Redirect href="/(auth)/login" />;
      }
      



  return (
    
        <ChatProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="channel" options={{ headerShown: false }} /> */}
          </Stack>
        </ChatProvider>
  );
}
