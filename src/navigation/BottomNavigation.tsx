import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import About from '../screens/About';
import Track from '../screens/Track';
import 'react-native-gesture-handler';
import CustomTabBar from './CustomTabBar';

type BottomTabParamList =
  {
    Home: undefined;
    Track: undefined;
    About: undefined;
  };

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
