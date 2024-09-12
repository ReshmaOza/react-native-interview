import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Popular Movies' }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Movie Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
