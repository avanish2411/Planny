import { View, Text, Animated, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { clearUser, setUser } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearExpense } from '../redux/slices/ExpenseSlice';
import { clearTodo } from '../redux/slices/TodoSlice';
import { TextInput, MD3LightTheme } from 'react-native-paper';
import { Platform } from 'react-native';


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

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.clear();
      dispatch(clearUser());
      dispatch(clearExpense());
      dispatch(clearTodo())
      const userData = {
        name,
        email,
        password,
        isAuthenticated: true
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      dispatch(setUser(userData));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('MainTabs')
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'Something went wrong during sign-up. Please try again.');
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
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
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
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  label="Name"
                  theme={MD3LightTheme}
                  placeholderTextColor={'#aaa'}
                  style={{ marginBottom: 10 }}
                />


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
                  secureTextEntry
                  mode="outlined"
                  label="Password"
                  theme={MD3LightTheme}
                  placeholderTextColor={'#aaa'}
                  style={{ marginBottom: 10 }}
                />

                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  mode="outlined"
                  label="Confirm Password"
                  theme={MD3LightTheme}
                  placeholderTextColor={'#aaa'}
                  style={{ marginBottom: 10 }}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;