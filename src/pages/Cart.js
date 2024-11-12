// src/screens/CartScreen.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';

const CartScreen = ({ route, navigation }) => {
    const { cartItems } = route.params; // Recebe os itens do carrinho

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Preço: R$ {item.price.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text style={styles.total}>Total: R$ {totalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Finalizar Compra</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
        color: '#e52028',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#66bb6c',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CartScreen;