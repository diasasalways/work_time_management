import { StyleSheet,  View,KeyboardAvoidingView, Image,TouchableOpacity,ImageBackground, Alert } from 'react-native'
import { Text } from 'galio-framework'
import firebase from "../firebase"; import { auth } from '../firebase';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'





const ProfileScreen = () => {
  const navigation = useNavigation()

  const createTwoButtonAlert = () =>
Alert.alert('Выход из аккаунта', 'Вы успешно вышли из аккаунта!', [
  { text: 'OK', onPress: () => navigation.navigate("Login") },
]);


const handleSignOut = () => {
auth
  .signOut()
  .then(() => {
    createTwoButtonAlert();
    
  })
  .catch(error => alert(error.message))
}

    return (
        <KeyboardAvoidingView
        style={styles.container}
      >
        <View style={{backgroundColor:'#5DB075',position: 'absolute',  width:'100%', height:'36%'}}></View>
        <TouchableOpacity style={{position: 'absolute', left:'7%',top:'8%'}}   onPress={ () => navigation.openDrawer()}> 
         <ImageBackground
    source={require('./menu_icon.png')}  style={{ width: 40,
      height: 40, paddingLeft:0}}/></TouchableOpacity>
      <Text style={{position: 'absolute', justifyContent: 'center', alignItems: 'center',top:'8%', fontSize:28, color: 'white', fontWeight: 'bold'}}>Профиль</Text>
      <TouchableOpacity onPress={handleSignOut} style={{position: 'absolute', justifyContent: 'center', alignItems: 'center',top:'9%',right:'6%'}}>
      <Text style={{fontSize:20, color: '#E34F4F'}}>Выход</Text>
      </TouchableOpacity>
        <View style={styles.inputContainer}>
        <Image
            source={require('./Tima.jpg')}
            style={{height: 180, width: 180, borderRadius:100, borderColor: 'white',borderWidth:4 , marginBottom: 10}}
          />
         <Text style={styles.infoText}>Зархомов Темирлан</Text>
         <Text style={styles.infoText2}>{auth.currentUser?.email}</Text>
         <View
  style={{
    backgroundColor:'#E8E8E8',position: 'absolute',  width:'75%', height:4,bottom:'36%'
  }}
/>
         <Text style={styles.infoText3}>Номер телефона:</Text>
         <Text style={styles.infoText2}>8-(775)-238-70-12</Text>
         <View
  style={{
    backgroundColor:'#E8E8E8',position: 'absolute',  width:'75%', height:4,bottom:'18%'
  }}
/>
         <Text style={styles.infoText3}>Должоность:</Text>
         <Text style={styles.infoText2}>Главный менеджер</Text>
         <View
  style={{
    backgroundColor:'#E8E8E8',position: 'absolute',  width:'75%', height:4,bottom:'0%'
  }}
/>
        </View>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Перейти к заданиям</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          
        
        </View>
      </KeyboardAvoidingView>

  );


  } 

export default ProfileScreen



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop:'30%',
      alignItems: 'center',
    },
    inputContainer: {
      justifyContent: 'center',
    alignItems: 'center',
    paddingTop:'15%',
  
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 15,
      
    },
    buttonContainer: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "50%",
    },
    button: {
      backgroundColor: '#5DB075',
      width: '90%',
      padding: 18,
      borderRadius:100,
      alignItems: 'center',
      marginTop:60
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 20,
    },
    logo: {
      width:'100%',
      marginBottom:25 
    },
    infoText:{
      fontSize:25,
      fontFamily: 'Helvetica',
      padding:10,
      paddingTop:20,
      fontWeight:'500'
    },
    infoText2:{
      fontSize:22,
      fontFamily: 'Helvetica',
      padding:10,
      paddingTop:1,
      fontWeight:'500'
    },
    infoText3:{
      fontSize:24,
      fontFamily: 'Helvetica',
      padding:10,
      paddingTop:10,
      fontWeight:'400'
    },
    helpText:{

    }
  })