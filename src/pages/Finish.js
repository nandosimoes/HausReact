import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

const backgroundFinish = require('../../assets/images/backgroundFinish.png');
export default function DetailsScreen() {

    return (
        <ImageBackground source={backgroundFinish} style={styles.background} resizeMode="cover">
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

});