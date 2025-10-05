import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link, router,Redirect, Stack } from 'expo-router';
import { ChannelList } from 'stream-chat-expo';
import { useAuth } from '../../providers/AuthProvider.tsx';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const MainTabScreen = () => {
  console.log('tab/chat page')
  const { user } = useAuth();
  return (<>
  <Redirect href='/(home)/call'/>
  <Stack.Screen options={{ headerRight: () => (
    <Link href={'/(home)/users'} asChild>
      <FontAwesome5 
      name="users" 
      size={24} 
      color="black" 
      style={{ marginHorizontal: 10 }} />
    </Link>
  ) }} />
    <ChannelList
      filters={{ members: { $in: [user?.id] } }}
      onSelect={(channel) =>
        router.push(`/channel/${channel.cid}`)} />
  </>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff1111ff',

  },
});

export default MainTabScreen