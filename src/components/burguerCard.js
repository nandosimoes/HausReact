import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function BurgerCard({ burger }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: burger.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{burger.name}</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} numberOfLines={2}>
                        {burger.description}
                    </Text>
                </View>
                <Text style={styles.price}>{burger.price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        borderStyle: 'dashed',
        borderColor: 'black',
        marginVertical: 2,
        borderWidth: 1,
        borderRightWidth: 10,
        borderBottomWidth: 10,
    },
    image: {
        width: 130,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#777',
    },
    descriptionContainer: {
        maxHeight: 50,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#31a140',
        marginTop: 5,
    },
});