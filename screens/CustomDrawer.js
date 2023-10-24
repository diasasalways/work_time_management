import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
  

  import { auth } from '../firebase';
  import firebase from "../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';


  const CustomDrawer = props => {

  const navigation = useNavigation()
  
  const createTwoButtonAlert = () =>
    Alert.alert('Выход из аккаунта', 'Вы успешно вышли из аккаунта!', [
      { text: 'OK', onPress: () => navigation.navigate("Login") },
    ]);

   const Profile = () => {
     navigation.navigate("Profile");
   }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        createTwoButtonAlert();
        
      })
      .catch(error => alert(error.message))
  }

  
  return (
    <View style={{flex: 1, backgroundColor: '#5DB075'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#5DB075'}}>
        <ImageBackground
     
          style={{padding: 20,}}>

           
              <TouchableOpacity onPress={Profile} style={{}}>
          <Image
            source={require('./assets/images/avatar.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          </TouchableOpacity>
          
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {auth.currentUser?.email}
          </Text>
          <View style={{flexDirection: 'row'}}>
        
            
          </View>
        </ImageBackground>
        <View style={{flex: 1, colors: '#5DB075', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#5DB075'}}>
        <TouchableOpacity onPress={handleSignOut} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={26} />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 5,
              }}>
              Выйти
            </Text>
          </View>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

export default CustomDrawer;