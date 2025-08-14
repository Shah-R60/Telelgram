import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

const MainTabScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MainTabScreen</Text>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff1111ff',
    
  },
});

export default MainTabScreen