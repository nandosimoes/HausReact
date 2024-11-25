import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';

const backgroundFinish = require('../../assets/images/backgroundFinish.png');

export default function DetailsScreen({ navigation }) {
    return (
        <ImageBackground source={backgroundFinish} style={styles.background} resizeMode="cover">
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')} 
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#e52028',
        paddingVertical: 30,
        paddingHorizontal: 150,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
        marginTop: '150%',
        borderRightWidth: 8,
        borderBottomWidth: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});