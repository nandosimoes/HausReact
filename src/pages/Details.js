// src/screens/DetailsScreen.js

import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const backgroundDetails = require('../../assets/images/backgroundDetails.png');

export default function DetailsScreen({ route, navigation }) {
    const { burger } = route.params;
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: burger.id,
            name: burger.name,
            price: parseFloat(burger.price.replace('R$ ', '').replace(',', '.')), // Converte o preço para número
            quantity: quantity,
        };

        // Navega para a página do carrinho e passa os itens do carrinho
        navigation.navigate('Cart', { cartItems: [cartItem] });
    };

    return (
        <ImageBackground source={backgroundDetails} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={{ uri: burger.image }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{burger.name}</Text>
                            <Text style={styles.price}>{burger.price}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={decrement}>
                                <Icon name="remove" size={24} color="#333" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={increment}>
                                <Icon name="add" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.description}>{burger.description}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
            </View>
            <Footer style={styles.footer} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%',
    },
    card: {
        marginTop: '18%',
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        borderRightWidth: 7,
        borderBottomWidth: 7,
    },
    image: {
        width: '99%',
        height: '61%',
        borderRadius: 10,
        marginBottom: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        textAlign: 'left',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 2,
        marginTop: 0,
        borderColor: '#A6A6A6',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 10,
    },
    description: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
        textAlign: 'left',
        width: '100%',
    },
    button: {
        backgroundColor: '#66bb6c',
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 250,
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
        borderRightWidth: 7,
        borderBottomWidth: 7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});