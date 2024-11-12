import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const icons = [
    { name: 'Home', icon: require('../../assets/images/home.png') },
    { name: 'Cart', icon: require('../../assets/images/carrinho.png') },
    { name: 'User', icon: require('../../assets/images/user.png') }, // Certifique-se de que o nome aqui é "User "
];

export default function Footer() {
    const navigation = useNavigation();
    const route = useRoute();
    const userId = route.params?.userId || 1; // Pega o userId da rota ou usa 1 como padrão

    return (
        <View style={styles.footer}>
            {icons.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        if (item.name === 'User') {
                            navigation.navigate(item.name, { userId }); // Navega para User
                        } else {
                            navigation.navigate(item.name);
                        }
                    }}
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
        backgroundColor: '#66bb6c',
    },
});