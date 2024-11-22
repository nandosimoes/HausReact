import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';

const backgroundReviewCart = require('../../assets/images/backgroundReviewCart.png');
const CART_KEY = '@cart_items';
const DELIVERY_FEE = 2.99;
const MAX_SUMMARY_HEIGHT = 150;
const ADDRESS_KEY = '@address_info';

export default function ReviewCartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(CART_KEY);
                const items = jsonValue != null ? JSON.parse(jsonValue) : [];
                setCartItems(items);

                const calculatedSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
                setSubtotal(calculatedSubtotal);
                setTotalPrice(calculatedSubtotal + DELIVERY_FEE);
            } catch (e) {
                console.error(e);
            }
        };
        loadCartItems();
    }, []);

    useEffect(() => {
        const loadAddress = async () => {
            try {
                const addressJson = await AsyncStorage.getItem(ADDRESS_KEY);
                if (addressJson != null) {
                    setAddress(JSON.parse(addressJson));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadAddress();
    }, []);

    const ListHeader = () => (
        <View style={styles.summaryRowHeader}>
            <Text style={styles.headerText}>Pedido:</Text>
            <Text style={styles.headerText}>Quantidade:</Text>
            <Text style={styles.headerText}>Valor:</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.summaryRowOrder}>
            <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    const AddressSection = () => {
        if (!address) return null;
        return (
            <View style={styles.addressSection}>
                <Text style={styles.addressTitle}>Endereço de Entrega:</Text>
                <Text style={styles.addressText}>
                    {address.street}, {address.number}
                </Text>
                {address.complement ? (
                    <Text style={styles.addressText}>
                        Complemento: {address.complement}
                    </Text>
                ) : null}
                {address.reference ? (
                    <Text style={styles.addressText}>
                        Referência: {address.reference}
                    </Text>
                ) : null}
            </View>
        );
    };

    return (
        <ImageBackground source={backgroundReviewCart} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <ScrollView
                    style={styles.summaryContainer}
                    contentContainerStyle={styles.summaryContentContainer}
                    nestedScrollEnabled={true}
                >
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={ListHeader}
                        scrollEnabled={false}
                    />
                    <View style={styles.summaryRowSubtotal}>
                        <Text style={styles.subtotal}>Subtotal:</Text>
                        <Text style={styles.subtotalValue}>R$ {subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.deliveryFee}>Taxa de entrega:</Text>
                        <Text style={styles.deliveryFeeValue}>R$ {DELIVERY_FEE.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRowTotal}>
                        <Text style={styles.total}>Total:</Text>
                        <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
                    </View>
                </ScrollView>


                <AddressSection />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Payment')}
                >
                    <Text style={styles.buttonText}>Finalizar Pedido</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    addressSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: 'white',
        marginBottom: 3,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        marginTop: '40%',
        marginHorizontal: 20
    },
    summaryContainer: {
        maxHeight: MAX_SUMMARY_HEIGHT,
    },
    summaryContentContainer: {
        flexGrow: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        color: 'white',
    },
    summaryRowHeader: {
        flexDirection: 'row',
        paddingVertical: 5,
        color: 'white',
        justifyContent: 'space-around',
        width: '132%'
    },
    summaryRowSubtotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    summaryRowOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
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
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        marginRight: 10,
    },
    itemQuantity: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
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