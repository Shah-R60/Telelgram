import {
CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY ;
const userId = 'c13f37a4-2a83-4319-8154-38cc6e6a9d83';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzEzZjM3YTQtMmE4My00MzE5LTgxNTQtMzhjYzZlNmE5ZDgzIn0.MWI2CxtKpML19YaRjpLIEafcOhNhlQVZcfuw2anOn6U";
const callId = "default_3b0ea552-0b63-4962-9776-430140a8cbad";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });


const CallScreen = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallContent />
        </StreamCall>
    </StreamVideo>
  )
}

export default CallScreen