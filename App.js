// App.js

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/pages/Welcome';
import HomeScreen from './src/pages/Home';
import DetailsScreen from './src/pages/Details';
import LoginScreen from './src/pages/Login';
import RegisterScreen from './src/pages/Register';
import UserScreen from './src/pages/User';
import CartScreen from './src/pages/Cart';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; 

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
    await Font.loadAsync({
        'Agrandir': require('./assets/fonts/Agrandir-Regular.otf'),
        
    });
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        headerBackVisible: false,
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        title: 'Detalhes',
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: 'Login',
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ 
                        title: 'Cadastro', 
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="User " 
                    component={UserScreen} 
                    options={{ 
                        title: 'User ', 
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="Cart" 
                    component={CartScreen} 
                    options={{ 
                        title: 'Cart', 
                        headerTitleAlign: 'center'
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}