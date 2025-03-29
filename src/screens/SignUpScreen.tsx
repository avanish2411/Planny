import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, Alert, KeyboardAvoidingView, ScrollView, Platform,
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, MD3LightTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthStackParamList } from '../navigation/AuthStack';
import { clearUser, setUser } from '../redux/slices/UserSlice';
import { clearExpense } from '../redux/slices/ExpenseSlice';
import { clearTodo } from '../redux/slices/TodoSlice';

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name is too short').required('Name is required'),
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Only Gmail is allowed').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password is too short')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must include uppercase, lowercase, number, and special character')
      .required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  });

  const handleSignUp = async (values: any) => {
    try {
      await AsyncStorage.clear();
      dispatch(clearUser());
      dispatch(clearExpense());
      dispatch(clearTodo());
      const userData = { ...values, isAuthenticated: true };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      dispatch(setUser(userData));
      navigation.navigate('MainTabs');
    } catch {
      Alert.alert('Error', 'Something went wrong during sign-up. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} validationSchema={validationSchema} onSubmit={handleSignUp}>
          {({ values, setFieldValue, handleSubmit, errors }) => (
            <ScrollView contentContainerStyle={{ ...styles.scrollContainer, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }} keyboardShouldPersistTaps="handled">
              <View style={styles.innerContainer}>
                <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY }, { scale: scaleAnim }, { rotate: spin }] }]}>
                  <View style={styles.logo}><Text style={styles.logoText}>P</Text></View>
                </Animated.View>
                <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY }] }]}>Create Account</Animated.Text>
                <Animated.View style={[styles.inputContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
                  <TextInput value={values.name} onChangeText={txt => setFieldValue('name', txt)} mode="outlined" label="Name" theme={MD3LightTheme} style={styles.input} />
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                  <TextInput value={values.email} onChangeText={txt => setFieldValue('email', txt)} mode="outlined" label="Email" theme={MD3LightTheme} style={styles.input} />
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                  <TextInput value={values.password} onChangeText={txt => setFieldValue('password', txt)} secureTextEntry mode="outlined" label="Password" theme={MD3LightTheme} style={styles.input} />
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  <TextInput value={values.confirmPassword} onChangeText={txt => setFieldValue('confirmPassword', txt)} secureTextEntry mode="outlined" label="Confirm Password" theme={MD3LightTheme} style={styles.input} />
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                  <TouchableOpacity style={styles.signUpButton} onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.signInLink}>
                    <Text style={styles.signInText}>Already have an account? Sign In</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  innerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: { marginBottom: 20 },
  logo: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  logoText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  inputContainer: { width: '100%' },
  input: { marginBottom: 10 },
  errorText: { color: 'red' },
  signUpButton: { width: '100%', height: 50, backgroundColor: '#007AFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 3, marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  signInLink: { marginTop: 20, alignItems: 'center' },
  signInText: { color: '#007AFF', fontSize: 14 },
});


export default SignUpScreen;
