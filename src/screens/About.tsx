import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/myStore';
import EditIcon from 'react-native-vector-icons/Octicons';

const About = () => {
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.users.user)
  console.log(user)
  return (
    <View style={{ paddingTop: insets.top }}>
      <Image
        source={require('../assets/Images/colorfulBackground.jpg')}
        style={{ position: 'absolute', width: '100%', height: 180, opacity: 0.9 }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute', right: 10, top: 20,
          backgroundColor: 'grey', width: 40, height: 40,
          justifyContent: 'center', alignItems: 'center',
          borderRadius: 20
        }}
      >
        <EditIcon name="pencil" size={25} color="black" />
      </TouchableOpacity>
      <View style={{ flexDirection: 'column', marginLeft: '3%', marginTop: '30%', alignItems: 'flex-start' }}>
        <Image
          source={require('../assets/Images/boy.png')}
          style={{ height: 80, width: 80, backgroundColor: 'white', borderRadius: 40 }}
        />
        <View style={{ marginLeft: 5, marginTop: 8 }}>
          <Text style={{ fontSize: 32, fontWeight: '600' }}>{user?.name}</Text>
          <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
            {user?.email}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          bottom: 90,
          left: 140,
          alignSelf: 'center',
          backgroundColor: 'lightblue',
          paddingHorizontal: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8
        }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 14 }}>Edit Details</Text>
      </TouchableOpacity>
    </View>
  )
}

export default About