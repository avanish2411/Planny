import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIcon from 'react-native-vector-icons/Feather'
import TrackIcon from 'react-native-vector-icons/MaterialIcons'
import ProfileIcon from 'react-native-vector-icons/Feather'


const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            width: '100%',
            height: 60,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 25,
            marginBottom: insets.bottom
        }}>
            {state.routes.map((tab, index) => {
                const isFocused = state.index === index;
                return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate(tab.name)} style={{
                        borderTopWidth: state.index === index ? 3 : 0,
                        borderTopColor: isFocused ? "#1E90FF" : "transparent",
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '25%',
                        marginVertical: 15
                    }}>
                        {tab.name === 'Home' && <HomeIcon name='home' size={24} color={isFocused ? 'black' : 'gray'} />}
                        {tab.name === 'Track' && <TrackIcon name='track-changes' size={24} color={isFocused ? 'black' : 'gray'} />}
                        {tab.name === 'About' && <ProfileIcon name='user' size={24} color={isFocused ? 'black' : 'gray'} />}
                        <Text style={{ color: isFocused ? 'black' : 'gray' ,fontWeight:'600'}}>{tab.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default CustomTabBar