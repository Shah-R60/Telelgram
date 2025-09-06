import { ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React , {useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useChatContext} from 'stream-chat-expo';  
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, 
  MessageList,
  MessageInput} from 'stream-chat-expo';
import { Channel as StreamChannel } from 'stream-chat';
const ChannelScreen = () => {

  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const {cid} = useLocalSearchParams<{cid: string}>();
  const {client} = useChatContext();

  React.useEffect(() => {
    const fetchChannel = async () => {
      try {
        const channel = await client.queryChannels({cid});
        setChannel(channel[0]);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannel();
  }, [cid]);

  if(!channel) {
    return <ActivityIndicator />;
  }
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ChannelScreen