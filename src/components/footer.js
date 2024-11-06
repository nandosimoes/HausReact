// src/components/widgets/Footer.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Ícones das páginas
const icons = [
    { name: 'Home', icon: require('../../assets/images/home.png') },
    { name: 'Page1', icon: require('../../assets/images/searchIcon.png') },
    { name: 'Page2', icon: require('../../assets/images/carrinho.png') },
    { name: 'Page3', icon: require('../../assets/images/user.png') },
];

export default function Footer() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.footer}>
            {icons.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(item.name)}
                    style={styles.iconContainer}
                >
                    <View
                        style={[
                            styles.iconBackground,
                            route.name === item.name && styles.activeBackground,
                        ]}
                    >
                        <Image
                            source={item.icon}
                            style={[
                                styles.icon,
                                route.name === item.name && styles.activeIcon,
                            ]}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        paddingTop: 10,
        width: '100%',
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: '#777', 
    },
    activeIcon: {
        tintColor: 'white', 
    },
    iconBackground: {
        width: 50, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, 
    },
    activeBackground: {
        backgroundColor: 'green',
    },
});
