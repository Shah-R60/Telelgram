import { Redirect, Stack } from 'expo-router';
import ChatProvider from '../../providers/chatProvider';
import { useAuth } from '../../providers/AuthProvider';
import VideoProvider from '../../providers/VideoProvider';
import CallProvider from '../../providers/CallProvider';
import NotificationsProvider from '../../providers/NotificationProvider';

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ChatProvider>
      <NotificationsProvider>
        <VideoProvider>
          <CallProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="users" options={{ title: 'Users' }} />
              <Stack.Screen name="channel/[cid]" options={{ title: 'Channel' }} />
              <Stack.Screen name="call/index" options={{ headerShown: false, title: 'Call' }} />
            </Stack>
          </CallProvider>
        </VideoProvider>
      </NotificationsProvider>
    </ChatProvider>
  );
}