import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            width: '100%',
            height: 50,
            backgroundColor: 'yellow',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: insets.bottom
        }}>
            {state.routes.map((tab, index) => {
                const isFocused = state.index === index;
                return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate(tab.name)} style={{ 
                        backgroundColor: 'red', 
                        borderTopWidth: state.index === index ? 2 : 0, 
                        borderTopColor: isFocused ? "green" : "transparent",
                        height:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        width:'20%'
                    }}>
                        <Text>{tab.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default CustomTabBar