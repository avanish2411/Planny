import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Track = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      paddingTop: insets.top,
    }}>
      <Text>Track</Text>
    </View>
  )
}

export default Track