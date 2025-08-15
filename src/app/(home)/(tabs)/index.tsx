import { View, Text , StyleSheet } from 'react-native'
import React , {useState} from 'react'
import { router } from 'expo-router';
import { Channel, 
  ChannelList ,
  MessageList,
  MessageInput} from 'stream-chat-expo';
// import {Channel as ChannelType , StreamChat , MessageList} from 'stream-chat';
const MainTabScreen = () => {
  const [channel , setChannel] = useState();
 
  return <ChannelList onSelect={(channel)=> router.push(`/channel/${channel.cid}`)}/>;
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