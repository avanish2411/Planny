import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/myStore'
import { setUser } from '../redux/slices/UserSlice'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MD3LightTheme, TextInput } from 'react-native-paper';

const EditDetails = () => {
    const user = useSelector((state: RootState) => state.users.user)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets();
    const [name, setName] = useState<string>(user?.name?.toString() || '');
    const [email, setEmail] = useState<string>(user?.email?.toString() || '');
    const [password, setPassword] = useState<string>(user?.password?.toString() || '');
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const EditedDetails = ({ name, email, password }: { name: string, email: string, password: string }) => {
        if (name.length > 0 && name.trim() && email.length > 0 && email.trim() && password.length > 0 && password.trim()) {
            dispatch(setUser({
                name,
                email,
                password,
            }))
            setName('')
            setEmail('')
            setPassword('');
        }
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
            }}>
                <View style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: insets.top + 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: 30,
                        textAlign: 'center',
                    }}>
                        Edit Profile
                    </Text>

                    <View style={{ gap: 15 }}>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            mode="outlined"
                            label="Name"
                            placeholderTextColor='#999'
                            theme={MD3LightTheme}
                        />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            editable={false}
                            mode="outlined"
                            label="Email"
                            theme={MD3LightTheme}
                        />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            mode="outlined"
                            label="Password"
                            placeholderTextColor='#999'
                            secureTextEntry={!showPassword}
                            theme={MD3LightTheme}
                            right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => EditedDetails({ name, email, password })}
                        style={{
                            backgroundColor: '#007AFF',
                            borderRadius: 15,
                            paddingVertical: 15,
                            marginTop: 30,
                            shadowColor: '#007AFF',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            Save Changes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditDetails