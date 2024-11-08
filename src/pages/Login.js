import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import userData from '../data/userData';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const user = userData.find(u => u.email === email && u.password === password);
        if (user) {
            navigation.navigate('Home');
        } else {
            Alert.alert('Erro', 'Email ou senha incorretos.');
        }
    };

    return (
        <ImageBackground source={require('../../assets/images/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>

                <TextInput 
                    placeholder="Email" 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                />
                <TextInput 
                    placeholder="Senha" 
                    style={styles.input} 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry 
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: '70%'
    },

    input: { 
        width: 320,
        padding: 8, 
        borderRadius: 25, 
        marginBottom: 10, 
        backgroundColor: 'white'
    },
    button: { 
        backgroundColor: '#E52028', 
        padding: 8, 
        borderRadius: 25,
        width: 180, 
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginTop: '5%'
    },
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold' 
    },
    link: { 
        color: '#fff', 
        textAlign: 'center', marginTop: 10 
    },
});
