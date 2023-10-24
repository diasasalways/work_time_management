import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './screens/navigation/AppStack'



export default function App() {
  return (
    <NavigationContainer>
      
      <AppStack/>
   
    </NavigationContainer>

    
  );
  


}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
