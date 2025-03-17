import { View, Text, Animated, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { setUser } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSignUp = () => {
    if (name.length > 0 && name.trim() && email.length > 0 && email.trim() && confirmPassword.length > 0 && confirmPassword.trim() && password.length > 0 && password.trim()) {
      if (password === confirmPassword) {
        dispatch(setUser({
          name,
          email,
          password,
          isAuthenticated: true
        }));
        setName('');
        setEmail('');
        setConfirmPassword('');
        setPassword('');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Error', 'Passwords do not match');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{
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
          paddingHorizontal: 20,
        }}>
          {/* Logo */}
          <Animated.View style={{
            marginBottom: 40,
            opacity: fadeAnim,
            transform: [
              { translateY },
              { scale: scaleAnim },
              { rotate: spin }
            ],
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: '#007AFF',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}>
              <Text style={{
                fontSize: 36,
                fontWeight: 'bold',
                color: '#ffffff',
              }}>P</Text>
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: 40,
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}>
            Create Account
          </Animated.Text>

          {/* Form */}
          <Animated.View style={{
            width: '100%',
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}>
            <Animated.View style={{
              transform: [{ scale: scaleAnim }],
            }}>
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  marginBottom: 15,
                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  marginBottom: 15,
                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  marginBottom: 15,
                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  marginBottom: 20,
                  fontSize: 16,
                }}
              />
            </Animated.View>

            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#007AFF',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }}
              onPress={handleSignUp}
            >
              <Text style={{
                color: '#ffffff',
                fontSize: 16,
                fontWeight: '600',
              }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: '#007AFF',
                fontSize: 14,
              }}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;