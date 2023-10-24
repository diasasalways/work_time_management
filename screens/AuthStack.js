import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator> 
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home"
         component={HomeScreen}
         options={{ title: 'Главная страница', headerStyle: {
          backgroundColor: '#eded6b',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        }, }}
          />
           <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
             
  );
};

export default AuthStack;