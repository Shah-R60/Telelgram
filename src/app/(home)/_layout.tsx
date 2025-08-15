import { Slot, Stack } from 'expo-router';
import ChatProvider from '../providers/chatProvider';
export default function HomeLayout() {




  return (
    
        <ChatProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="channel" options={{ headerShown: false }} /> */}
          </Stack>
        </ChatProvider>
  );
}
