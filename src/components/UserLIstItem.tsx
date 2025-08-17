import { View, Text } from 'react-native'
import React from 'react'

const UserListItem = ({ user }) => {
  return (
    <View style={{ padding: 12, borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#ff0f0fff' }}>
      <Text style={{ fontWeight: 'bold' }}>{user.full_name}</Text>
    </View>
  )
}

export default UserListItem