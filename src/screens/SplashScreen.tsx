import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* Logo */}
        <Animated.View style={{
          marginBottom: 20,
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 25,
            backgroundColor: '#007AFF',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}>
            <Text style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>P</Text>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#333333',
          letterSpacing: 1,
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}>
          Planny
        </Animated.Text>
      </View>
    </View>
  );
};

export default SplashScreen;