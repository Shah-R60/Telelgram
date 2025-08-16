import { View, Text , StyleSheet } from 'react-native'
import React , {useState} from 'react'
import { router } from 'expo-router';
import {  ChannelList ,} from 'stream-chat-expo';
import { useAuth } from '../../providers/AuthProvider';

const MainTabScreen = () => {
  console.log('tab/chat page')
  const { user } = useAuth();
  return <ChannelList 
  filters={{members:{$in:[user?.id]}}}
  onSelect={(channel)=> 
  router.push(`/channel/${channel.cid}`)}/>;
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