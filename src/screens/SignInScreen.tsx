import { View, Text, Animated, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { MD3LightTheme, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignInScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();
  }, []);

  const initialValuesObject = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object({
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Only Gmail is allowed').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password is too short')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must include uppercase, lowercase, number, and special character')
      .required('Password is required'),
  });
  const handleSignIn = async (values: any) => {
    if (values.email.trim() && values.password.trim()) {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          if (userData.email === values.email && userData.password === values.password) {
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Formik initialValues={initialValuesObject} validationSchema={validationSchema} onSubmit={handleSignIn}>
          {({ values, setFieldValue, handleSubmit, errors }) => (
            <ScrollView contentContainerStyle={[styles.scrollContainer, insets]} keyboardShouldPersistTaps="handled">
              <View style={styles.innerContainer}>
                <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
                  <View style={styles.logo}><Text style={styles.logoText}>P</Text></View>
                </Animated.View>
                <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY }] }]}>Welcome Back</Animated.Text>
                <Animated.View style={[styles.inputContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
                  <TextInput value={values.email} onChangeText={txt => setFieldValue("email", txt)} mode="outlined" label="Email" theme={MD3LightTheme} style={styles.input} />
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                  <TextInput value={values.password} onChangeText={txt => setFieldValue("password", txt)} mode="outlined" label="Password" theme={MD3LightTheme} secureTextEntry style={styles.input} />
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  <TouchableOpacity style={styles.signInButton} onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>
                    <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </ScrollView>
          )}
        </Formik>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
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
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
  },
  signInButton: {
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#007AFF',
    fontSize: 14,
  },
  errorText: { color: 'red' },
})

export default SignInScreen;