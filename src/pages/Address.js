import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';

const backgroundFinish = require('../../assets/images/backgroundAddress.png');
const ADDRESS_KEY = '@address_info';

export default function AddressScreen({ navigation }) {
    const [neighborhood, setNeighborhood] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');

    const handleSaveAddress = async () => {
        if (!neighborhood || !cep || !street || !number) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            const addressInfo = {
                neighborhood,
                cep,
                street,
                number
            };
            await AsyncStorage.setItem(ADDRESS_KEY, JSON.stringify(addressInfo));
            navigation.navigate('ReviewCart');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ImageBackground source={backgroundFinish} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Bairro"
                        placeholderTextColor="#808080"
                        value={neighborhood}
                        onChangeText={setNeighborhood}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CEP"
                        placeholderTextColor="#808080"
                        value={cep}
                        onChangeText={setCep}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rua"
                        placeholderTextColor="#808080"
                        value={street}
                        onChangeText={setStreet}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="N°"
                        placeholderTextColor="#808080"
                        value={number}
                        onChangeText={setNumber}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity 
                        style={[
                            styles.button,
                            (!neighborhood || !cep || !street || !number) && styles.buttonDisabled
                        ]}
                        onPress={handleSaveAddress}
                    >
                        <Text style={styles.buttonText}>Adicionar Endereço</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    inputContainer: {
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 30,
        padding: 5,
        marginBottom: 10,
        fontSize: 14,
        paddingLeft: 10,
        width: '85%'
    },
    button: {
        backgroundColor: '#e52028',
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 5,
        alignItems: 'center',
        borderRightWidth: 8,
        borderBottomWidth: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontWeight: 'bold',
    },
});