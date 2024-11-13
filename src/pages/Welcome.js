// src/pages/Welcome.js

import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText';

const backgroundImage = require('../../assets/images/backgroundWelcome.png');

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
        >
            <View style={styles.container}>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <CustomText style={styles.buttonText}>Começar</CustomText>
            </TouchableOpacity>
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
        padding: 20,
    },
    button: {
        width: '60%', 
        backgroundColor: '#66bb6c',
        paddingVertical: 20, 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 50,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});