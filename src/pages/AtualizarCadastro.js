import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground, Text } from 'react-native';
import axios from 'axios';

const profileImages = [
    { id: 1, source: require('../../assets/images/profile1.png'), path: 'assets/images/profile1.png' },
    { id: 2, source: require('../../assets/images/profile2.png'), path: 'assets/images/profile2.png' },
    { id: 3, source: require('../../assets/images/profile3.png'), path: 'assets/images/profile3.png' },
    { id: 4, source: require('../../assets/images/profile4.png'), path: 'assets/images/profile4.png' }
];

export default function UpdateProfileScreen({ route, navigation }) {
    const { userId } = route.params;
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);
            const userData = response.data;
            setUser(userData);
            setEmail(userData.email);
            setSelectedImagePath(userData.profileImage);
            
            const currentImageObj = profileImages.find(img => img.path === userData.profileImage);
            setCurrentImage(currentImageObj ? currentImageObj.source : null);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    const handleUpdate = async () => {
        if (email && password && selectedImagePath) {
            const updatedUser = {
                ...user,
                email,
                password,
                profileImage: selectedImagePath
            };

            try {
                await axios.put(`http://10.0.2.2:3000/users/${userId}`, updatedUser);
                Alert.alert(
                    'Sucesso',
                    'Dados atualizados com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Navega de volta para a tela de usuário após atualização bem-sucedida
                                navigation.navigate('User', { 
                                    userId: userId,
                                    timestamp: new Date().getTime() // Força atualização
                                });
                            }
                        }
                    ]
                );
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível atualizar os dados.');
                console.error("Erro ao atualizar dados do usuário:", error);
            }
        } else {
            Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem de perfil.');
        }
    };

    const handleImageSelect = (imagePath, imageSource) => {
        setSelectedImagePath(imagePath);
        setCurrentImage(imageSource);
    };

    return (
        <ImageBackground source={require('../../assets/images/backgroundAttCadastro.png')} style={styles.background}>
            <View style={styles.container}>
                <Image
                    source={currentImage}
                    style={styles.mainProfileImage}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email:</Text>
                    <TextInput
                        placeholder="Digite seu email"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <Text style={styles.inputLabel}>Atualize senha:</Text>
                    <TextInput
                        placeholder="Digite sua nova senha"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.imageContainer}>
                    {profileImages.map((img) => (
                        <TouchableOpacity 
                            key={img.id} 
                            onPress={() => handleImageSelect(img.path, img.source)}
                        >
                            <Image
                                source={img.source}
                                style={[
                                    styles.profileImage,
                                    selectedImagePath === img.path && styles.selectedImage
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Atualizar informações de login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>Voltar para o perfil</Text>
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
        paddingTop: '25%',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '25%',
    },
    inputLabel: {
        width: 320,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 25
    },
    input: {
        width: 320,
        padding: 8,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
        height: 40,
    },
    imageContainer: {
        marginTop: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 50,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
    mainProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#31a140',
        backgroundColor: 'white',
    },
    selectedImage: {
        borderColor: '#31a140',
        borderWidth: 3,
    },
    button: {
        backgroundColor: '#E52028',
        paddingVertical: 15,
        borderRadius: 85,
        width: 350,
        alignItems: 'center',
        marginTop: 25,
        borderRightWidth: 8,
        borderBottomWidth: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 8,
        fontSize: 12,
    },
});