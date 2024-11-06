// src/pages/Details.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DetailsScreen({ route }) {
  const { burger } = route.params; // Pega os dados passados pela HomeScreen

  return (
    <View style={styles.container}>
      <Image source={burger.image} style={styles.image} />
      <Text style={styles.name}>{burger.name}</Text>
      <Text style={styles.description}>{burger.description}</Text>
      <Text style={styles.price}>{burger.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#31a140',
  },
});
