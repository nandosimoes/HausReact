import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const profileImages = [
    { id: 1, source: require('../../assets/images/profile1.png') },
    { id: 3, source: require('../../assets/images/profile3.png') },
    { id: 4, source: require('../../assets/images/profile4.png') },
    { id: 2, source: require('../../assets/images/profile2.png') }
];

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get('http://10.0.2.2:3000/users'); 
            const users = response.data;
            return users.some(user => user.email === email); 
        } catch (error) {
            console.error("Erro ao verificar e-mail:", error);
            return false; 
        }
    };

    const handleRegister = async () => {
        if (name && email && password && selectedImage) {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                Alert.alert('Erro', 'Este e-mail já está cadastrado.');
                return;
            }

            const newUser  = { 
                name, 
                email, 
                password, 
                profileImage: selectedImage 
            };
            try {
                await axios.post('http://10.0.2.2:3000/users', newUser ); 
                Alert.alert('Sucesso', 'Usuário cadastrado!');
                setName('');
                setEmail('');
                setPassword('');
                setSelectedImage(null);
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
                console.error("Erro ao cadastrar usuário:", error);
            }
        } else {
            Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem de perfil.');
        }
    };

    return (
        <ImageBackground source={require('../../assets/images/backgroundCadastro.png')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Nome completo:" 
                        style={styles.input} 
                        value={name} 
                        onChangeText={setName} 
                    />
                    <TextInput 
                        placeholder="Email:" 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address"
                    />
                    <TextInput 
                        placeholder="Senha:" 
                        style={styles.input} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry 
                    />
                </View>

                <View style={styles.imageContainer}>
                    {profileImages.map((img, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedImage(`assets/images/profile${img.id}.png`)}>
                            <Image 
                                source={img.source} 
                                style={[
                                    styles.profileImage, 
                                    selectedImage === `assets/images/profile${img.id}.png` && styles.selectedImage
                                ]} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Já tem conta? Logar -se</Text>
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
        alignItems: 'center',
        paddingTop: '20%',
    },
    inputContainer: { 
        width: '100%', 
        alignItems: 'center',
        marginTop: '50%'
    },
    input: { 
        width: 320,
        padding: 6, 
        borderRadius: 25, 
        marginBottom: 10, 
        backgroundColor: 'white',
        paddingLeft: 10
    },
    imageContainer: { 
        marginTop: '28%',
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginBottom: 20,  
    },
    profileImage: { 
        width: 60, 
        height: 60,
        padding: 20,
        objectFit: 'contain', 
        backgroundColor: 'white',
        borderRadius: 80, 
        marginHorizontal: 10, 
        borderWidth: 2,
        borderColor: 'black'
    },
    selectedImage: { 
        borderColor: '#31a140', 
        borderWidth: 2 
    },
    button: { 
        backgroundColor: '#E52028', 
        paddingVertical: 20,
        borderRadius: 85,
        width: 180, 
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 20
    },
    link: { 
        color: '#fff', 
        textAlign: 'center', 
        marginTop: 8,
        fontSize: 12 
    },
});