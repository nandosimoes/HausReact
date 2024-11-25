import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native'; 

const backgroundSobreNos = require('../../assets/images/backgroundSobreNos.png');
const iconInsta = require('../../assets/images/iconInsta.png'); 
const iconFace = require('../../assets/images/iconFace.png');

export default function DetailsScreen() {
    const openInstagram = () => {
        Linking.openURL('https://www.instagram.com/hausburgers/'); 
    };

    const openFacebook = () => {
        Linking.openURL('https://www.facebook.com/hausburgers'); 
    };

    return (
        <ImageBackground source={backgroundSobreNos} style={styles.background} resizeMode="cover">
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={openFacebook} style={styles.iconButton}>
                    <Image source={iconFace} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInstagram} style={styles.iconButton}>
                    <Image source={iconInsta} style={styles.icon} />
                </TouchableOpacity>
            </View>
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
    iconContainer: {
        position: 'absolute',
        bottom: 150,
        
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconButton: {
        padding: 5, 
    },
    icon: {
        width: 45,
        height: 45,
    },
});