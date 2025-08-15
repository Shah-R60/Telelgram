import { View, ActivityIndicator,Text } from 'react-native'
import React , {useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import {Channel as ChannelType, useChatContext} from 'stream-chat-expo';  
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, 
  ChannelList ,
  MessageList,
  MessageInput} from 'stream-chat-expo';
const ChannelScreen = () => {

  const [channel, setChannel] = useState<ChannelType | null>(null);
  const {cid} = useLocalSearchParams<{cid: string}>();
  const {client} = useChatContext();

  React.useEffect(() => {
    const fetchChannel = async () => {
      const channel = await client.queryChannels({cid});
      setChannel(channel[0]);
    };

    fetchChannel();
  }, [cid]);

  if(!channel) {
    return <ActivityIndicator />;
  }
  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
      </Channel>
  )
}

export default ChannelScreen