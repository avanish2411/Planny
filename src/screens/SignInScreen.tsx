import { View, Text, Animated, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { MD3LightTheme, TextInput } from 'react-native-paper'

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignInScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


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

  const toMainPage = async () => {
    if (email.trim() && password.trim()) {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          if (userData.email === email && userData.password === password) {
            dispatch(setUser({ ...userData, isAuthenticated: true }));
            navigation.navigate('MainTabs');
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
        } else {
          Alert.alert('Error', 'No user found. Please sign up.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to sign in');
      }
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }

  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#ffffff',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            justifyContent: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
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
              transform: [{ translateY }],
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
              Welcome Back
            </Animated.Text>

            {/* Form */}
            <Animated.View style={{
              width: '100%',
              opacity: fadeAnim,
              transform: [{ translateY }],
            }}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                label="Email"
                theme={MD3LightTheme}
                placeholderTextColor={'#aaa'}
                style={{ marginBottom: 10 }}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                label="Password"
                theme={MD3LightTheme}
                placeholderTextColor={'#aaa'}
                secureTextEntry
                style={{ marginBottom: 15 }}
              />

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
                onPress={() => toMainPage()}
              >
                <Text style={{
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: '600',
                }}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: '#007AFF',
                  fontSize: 14,
                }}>Don't have an account? Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen; 