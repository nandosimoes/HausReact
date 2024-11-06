import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/pages/Welcome';
import HomeScreen from './src/pages/Home';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
