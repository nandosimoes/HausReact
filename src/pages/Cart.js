import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Footer from '../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deleteIcon from '../../assets/images/remove.png'; 
import CustomText from '../components/CustomText'; // Importar o CustomText

const CART_KEY = '@cart_items';
const DELIVERY_FEE = 2.99;

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(CART_KEY);
                const items = jsonValue != null ? JSON.parse(jsonValue) : [];
                setCartItems(items);
            } catch (e) {
                console.error(e);
            }
        };
        loadCartItems();
    }, []);

    const removeItem = async (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalPrice = subtotal + DELIVERY_FEE;

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <CustomText style={styles.itemName}>{item.name}</CustomText>
                <CustomText style={styles.itemPrice}>R$ {item.price.toFixed(2)}</CustomText>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <Image source={deleteIcon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/images/backgroundCart.png')} style={styles.background}>
            <View style={styles.container}>
                <CustomText style={styles.title}>Carrinho</CustomText>
                <View style={styles.cartContent}>
                    {cartItems.length === 0 ? (
                        <CustomText style={styles.emptyMessage}>Seu carrinho está vazio.</CustomText>
                    ) : (
                        <FlatList
                            data={cartItems}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()} // Certifique-se de que o id é uma string
                        />
                    )}
                </View>
                {cartItems.length > 0 && (
                    <View style={styles.summaryContainer}>
                        <CustomText style={styles.detailsTitle}>Detalhes</CustomText>
                        <View style={styles.summaryRow}>
                            <CustomText style={styles.subtotal}>Subtotal:</CustomText>
                            <CustomText style={styles.subtotalValue}>R$ {subtotal.toFixed(2)}</CustomText>
                        </View>
                        <View style={styles.summaryRow}>
                            <CustomText style={styles.deliveryFee}>Taxa de entrega:</CustomText>
                            <CustomText style={styles.deliveryFeeValue}>R$ {DELIVERY_FEE.toFixed(2)}</CustomText>
                        </View>
                        <View style={styles.summaryRowTotal}>
                            <CustomText style={styles.total}>Total:</CustomText>
                            <CustomText style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</CustomText>
                        </View>
                    </View>
                )}
                {cartItems.length === 0 && (
                    <View style={styles.summaryContainer}>
                        <CustomText style={styles.detailsTitle}>Detalhes</CustomText>
                        <View style={styles.summaryRow}>
                            <CustomText style={styles.subtotal}>Subtotal:</CustomText>
                            <CustomText style={styles.subtotalValue}>R$ 0.00</CustomText>
                        </View>
                        <View style={styles.summaryRow}>
                            <CustomText style={styles.deliveryFee}>Taxa de entrega:</CustomText>
                            <CustomText style={styles.deliveryFeeValue}>R$ 0.00</CustomText>
                        </View>
                        <View style={styles.summaryRowTotal}>
                            <CustomText style={styles.total}>Total:</CustomText>
                            <CustomText style={styles.totalValue}>R$  0.00</CustomText>
                        </View>
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <CustomText style={styles.buttonText}>Finalizar Pedido</CustomText>
                </TouchableOpacity>
            </View>
            <Footer />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    emptyMessage: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    cartContent: {
        flex: 1, 
        justifyContent: 'center',
    },
    itemContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 15,
        borderStyle: 'dashed',
        padding: 10,
    },
    itemImage: {
        width: 120,
        height: 100,
        borderRadius: 20,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    removeButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    summaryContainer: {
        marginTop: 20,
    },
    detailsTitle: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    summaryRowTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: 'white',
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    subtotal: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
    },
    subtotalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    deliveryFee: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
    },
    deliveryFeeValue: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    total: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
    },
    totalValue: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        backgroundColor: '#e52028',
        paddingVertical: 15,
        borderRadius: 18,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CartScreen;