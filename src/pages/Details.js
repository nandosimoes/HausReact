import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../components/footer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundDetails = require('../../assets/images/backgroundDetails.png');
const CART_KEY = '@cart_items';

export default function DetailsScreen({ route, navigation }) {
    const { burger } = route.params;
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        const cartItem = {
            id: burger.id,
            name: burger.name,
            price: parseFloat(burger.price.replace('R$ ', '').replace(',', '.')),
            quantity: quantity,
            image: burger.image,
        };
    
        try {
            const existingCart = await AsyncStorage.getItem(CART_KEY);
            const cartItems = existingCart ? JSON.parse(existingCart) : [];
            const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);
    
            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity += cartItem.quantity;
            } else {
                cartItems.push(cartItem);
            }
    
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
            navigation.navigate('Cart');
        } catch (e) {
            console.error(e);
        }
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
                    <ScrollView style={styles.descriptionContainer}>
                        <Text style={styles.description}>{burger.description}</Text>
                    </ScrollView>
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
        height: '65%',
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
        height: '60%',
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
    descriptionContainer: {
        width: '100%',
        height: 20,
    },
    description: {
        fontSize: 16,
        color: '#777',
        textAlign: 'left',
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