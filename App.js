// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/pages/Welcome';
import HomeScreen from './src/pages/Home';
import DetailsScreen from './src/pages/Details';
import LoginScreen from './src/pages/Login';
import RegisterScreen from './src/pages/Register';

const Stack = createNativeStackNavigator();

export default function App() {
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
