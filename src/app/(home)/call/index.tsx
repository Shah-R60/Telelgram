import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const callId = "c13f37a4-2a83-4319-8154-38cc6e6a9d83";

const CallScreen = () => {
  const [call, setCall] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);
  const client = useStreamVideoClient();

  useEffect(() => {
    const joinCall = async () => {
      if (!client) {
        console.log("Client not ready");
        return;
      }

      try {
        setIsJoining(true);
        setError(null);
        
        const newCall = client.call("default", callId);
        console.log("Call Object:", newCall);
        
        await newCall.join({ create: true });
        setCall(newCall);
      } catch (err) {
        console.error("Error joining call:", err);
        setError(err.message || "Failed to join call");
      } finally {
        setIsJoining(false);
      }
    };

    joinCall();
  }, [client]);

  if (!client) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Initializing video client...</Text>
      </View>
    );
  }

  if (isJoining) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Joining call...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!call) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Call not ready</Text>
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <CallContent />
    </StreamCall>
  );
}

export default CallScreen