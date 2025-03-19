import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/myStore'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/RootNavigation'
import { Divider, Switch } from 'react-native-paper'
import { setUser } from '../redux/slices/UserSlice'

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditDetails'>

const About = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>()
  const insets = useSafeAreaInsets()
  const user = useSelector((state: RootState) => state.users.user)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const dispatch = useDispatch();

  const openXAccount = () => {
    const xUsername = 'IamAvanish24'
    const xProfileUrl = `https://x.com/${xUsername}`
    Linking.openURL(xProfileUrl).catch(err => console.error('Error opening X profile:', err))
  }
  const openDiscordAccount = () => {
    const Username = '_.avanish._'
    const ProfileUrl = `https://discord.com/invite/${Username}`
    Linking.openURL(ProfileUrl).catch(err => console.error('Error opening X profile:', err))
  }

  const SignOut = async () => {
    try {
      dispatch(setUser({
        isAuthenticated: false
      }))
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  
  const menuItems = [
    { title: 'Theme', icon: 'theme-light-dark', hasSwitch: true },
    { title: 'Join on X', icon: 'twitter', action: openXAccount },
    { title: 'Join on Discord ', icon: 'discord', action: openDiscordAccount },
    { title: 'Contact Support via Email', icon: 'email-outline', action: () => console.log('Email pressed') },
  ]
  return (
    <ScrollView style={{ flex: 1, }}>
      <View style={{ alignItems: 'center', marginTop: insets.top + 50, paddingHorizontal: 16 }}>
        <View>
          <Image
            source={require('../assets/boy.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>
            {user?.name || 'User Name'}
          </Text>
          <Text style={{ fontSize: 16, marginTop: 4, }}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 12,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: '#4DA6FF'
          }}
          onPress={() => navigation.navigate('EditDetails')}
        >
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {menuItems.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 16,
                paddingHorizontal: 16,
                width: '100%',
                backgroundColor: '#fff'
              }}
              disabled={item.hasSwitch}
              onPress={item.action}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcon name={item.icon} size={24} style={{ marginRight: 16 }} />
                <Text style={{ fontSize: 16, }}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                />
              ) : (
                <MaterialIcon name="chevron-right" size={24} />
              )}
            </TouchableOpacity>
            {index < menuItems.length - 1 && (
              <Divider style={{ height: 1, marginLeft: 56, }} />
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={{
          marginTop: 24,
          marginHorizontal: 16,
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24,
          backgroundColor: '#4DA6FF'
        }}
        onPress={() => SignOut()}
      >
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', marginTop: 16, fontSize: 12, }}>
        Version 0.0.1
      </Text>
      <View style={{ height: insets.bottom + 20 }} />
    </ScrollView>
  )
}

export default About