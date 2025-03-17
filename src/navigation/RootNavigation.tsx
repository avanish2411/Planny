import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import BottomTabNavigation from './BottomNavigation';
import { useEffect, useState } from 'react';
import SplashScreen from '../screens/SplashScreen';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/myStore';

type RootStackParamList = {
  Splash: undefined;
  AuthStack: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.users.user);
  const isAuthenticated = user?.isAuthenticated;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={BottomTabNavigation} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
