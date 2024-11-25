import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import BurgerCard from '../components/burguerCard';
import Footer from '../components/footer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const backgroundImage = require('../../assets/images/backgroundHome.png');
const filterIcons = [
  { name: 'Lanches', icon: require('../../assets/images/icon1.png') },
  { name: 'Combos', icon: require('../../assets/images/icon4.png') },
  { name: 'Acompanhamentos', icon: require('../../assets/images/icon3.png') },
  { name: 'Bebidas', icon: require('../../assets/images/icon5.png') },
  { name: 'Sobremesas', icon: require('../../assets/images/icon2.png') },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [burgers, setBurgers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await axios.get('http://10.0.2.2:3000/burgers');
      setBurgers(response.data); 
    };
    fetchBurgers();
  }, []);

  const handleFilterPress = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredBurgers = selectedCategory
    ? burgers.filter(burger => burger.category === selectedCategory)
    : burgers;

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Image source={require('../../assets/images/searchIcon.png')} style={styles.icon} />
          <Text style={styles.searchText}>O que gostaria de pedir hoje?</Text>
        </View>

        <View style={styles.filterContainer}>
          {filterIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleFilterPress(item.name)}
              style={[
                styles.filterBox,
                selectedCategory === item.name && styles.activeFilter,
              ]}
            >
              <Image source={item.icon} style={styles.filterIcon} />
            </TouchableOpacity>
          ))}
        </View>

        {selectedCategory && (
          <Text style={styles.filterText}>{selectedCategory}:</Text>
        )}

        <ScrollView style={styles.burgersContainer} showsVerticalScrollIndicator={false}>
          {filteredBurgers.map(burger => (
            <TouchableOpacity
              key={burger.id}
              onPress={() => navigation.navigate('Details', { burger })}
            >
              <BurgerCard burger={burger} />
            </TouchableOpacity>
          ))}
        </ScrollView>

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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginTop: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  filterBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
 paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },
  activeFilter: {
    backgroundColor: '#e52028',
  },
  filterIcon: {
    width: 34,
    height: 34,
  },
  filterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    paddingVertical: 5,
    width: '98%',
    backgroundColor: '#4ec2e4',
    textAlign: 'center',
    borderRadius: 30,
    borderRightWidth: 4,
    borderBottomWidth: 5,
  },
  burgersContainer: {
    flex: 1,
    width: '100%',
  },
});