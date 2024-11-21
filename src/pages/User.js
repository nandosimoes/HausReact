import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import Footer from '../components/footer';

const images = {
    profile1: require('../../assets/images/profile1.png'),
    profile2: require('../../assets/images/profile2.png'),
    profile3: require('../../assets/images/profile3.png'),
    profile4: require('../../assets/images/profile4.png'),
};

export default function UserProfileScreen({ route, navigation }) {
    const { userId } = route.params;
    const [user, setUser] = useState(null);

    // Adicionando focus listener para atualizar os dados quando a tela receber foco
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUser();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const userProfileImage = images[user.profileImage.split('/').pop().split('.')[0]];

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../../assets/images/backgroundProfile.png')} style={styles.background}>
                <View style={styles.container}>
                    <Image source={userProfileImage} style={styles.profileImage} />
                    <Text style={styles.userName}>{user.name}</Text>

                    <TouchableOpacity 
                        style={[styles.button, styles.button1]} 
                        onPress={() => navigation.navigate('AtualizarCadastro', { userId: user.id })}
                    >
                        <Text style={styles.buttonText}>Atualizar cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.button2]} 
                        onPress={() => navigation.navigate('Page2')}
                    >
                        <Text style={styles.buttonText}>Adicionar endereço</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.button3]} 
                        onPress={() => navigation.navigate('SobreNos')}
                    >
                        <Text style={styles.buttonText}>Sobre nós</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        marginTop: '40%',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    userName: {
        marginTop: '18%',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
    },
    button: {
        paddingVertical: 12,
        borderRadius: 100,
        width: '80%',
        alignItems: 'center',
        marginVertical: 5,
        borderRightWidth: 8,
        borderBottomWidth: 8,
    },
    button1: {
        backgroundColor: '#66bb6c', 
    },
    button2: {
        backgroundColor: '#e52028', 
    },
    button3: {
        backgroundColor: '#f5b419',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});