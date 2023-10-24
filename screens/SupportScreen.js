import firebase from "../firebase";
import { StyleSheet,  TouchableOpacity, View,KeyboardAvoidingView,TextInput, Alert, Button, ImageBackground} from 'react-native'
import { Text } from 'galio-framework'
import { auth } from '../firebase'
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/core'

const createTwoButtonAlert = () =>
    Alert.alert('Отправка вопроса', 'Вы успешно отправили ваш вопрос, ответ придёт на вашу почту!', [
      { text: 'OK' },
    ]);



    

const SupportScreen = () => {

  const [picked, setPicked] = useState(1.15);
  const [answer, setAnswer] = useState('')
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  const Answers = () => {
   if(picked ===  "1.08" ){
     setAnswer('Вы выбрали 2')
   }else if(picked ===  "1.05"){
    setAnswer('Вы выбрали 1')
   } else if(picked ===  "1.10"){
    setAnswer('Вы выбрали 3')
   }else if(picked ===  "1.14"){
    setAnswer('Вы выбрали 4')
   }else if(picked ===  "1.15"){
    setAnswer('Вы выбрали 5')
   }else if(picked ===  "1.16"){
    setAnswer('Вы выбрали 6')
   }
  }
  const navigation = useNavigation()
    return (
      
        <KeyboardAvoidingView
        style={styles.container}
      >
        
        <TouchableOpacity style={{position: 'absolute', left:'7%',top:'8%'}}   onPress={ () => navigation.openDrawer()}> 
         <ImageBackground
    source={require('./menu_icon.png')}  style={{ width: 40,
      height: 40, paddingLeft:0}}/></TouchableOpacity>
        <View style={styles.inputContainer}>
         <Text style={styles.infoText}>Часто задаваемые вопросы:</Text>
         
      <Picker
        selectedValue={picked}
        style={{ height: 60, width: 600,  }}
        onValueChange={(itemValue, itemIndex) =>
          setPicked(itemValue)
        }>

        <Picker.Item label="Canda 5%" value={"1.05"} color="black"  />
        <Picker.Item label="Japan 8%" value={"1.08"} color="black" />
        <Picker.Item label="USA 10%" value={"1.10"} color="black" />
        <Picker.Item label="Egypt 14%" value={"1.14"} color="black" />
        <Picker.Item label="Saudi Arabia 15%" value={"1.15"} color="black" />
        <Picker.Item label="China 16%" value={"1.16"} color="black" />
        <Picker.Item label="Algeria 17%" value={"1.17"} color="black" />
        <Picker.Item label="18%" value={1.18} color="black" />
        <Picker.Item label="German 19%" value={1.19} color="black" />
        <Picker.Item label="German 19%" value={1.20} color="black" />
      </Picker>
      
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={Answers}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Найти ответ</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>{answer}</Text>

       
        </View>
        
        <Text style={styles.helpText}>Хотите задать вопрос в поддержку?</Text>
          <TextInput style={styles.input} placeholder="Ваше сообщение" onChangeText={onChangeText} value={text} />

          <TouchableOpacity
            onPress={createTwoButtonAlert}
            style={styles.button1}
          >
            <Text style={styles.buttonText}>Отправить вопрос</Text>
          </TouchableOpacity>
       
      </KeyboardAvoidingView>

  );


  } 

export default SupportScreen



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop:'20%',
      alignItems: 'center',
    },
    inputContainer: {
      justifyContent: 'center',
    alignItems: 'center',
  
    },
    input: {
      backgroundColor: '#EFEFEF',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 15,
      width: "80%",
      height: 50, 
     
      
    },
    buttonContainer: {
     
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "33%",
    },
    button: {
      backgroundColor: '#5DB075',
      width: '100%',
      padding: 15,
      borderRadius: 100,
      alignItems: 'center',
      marginTop:16
    },
    button1: {
      backgroundColor: '#5DB075',
      width: '50%',
      padding: 15,
      borderRadius: 100,
      alignItems: 'center',
      marginTop:16
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    logo: {
      width:'100%',
      marginBottom:25 
    },
    infoText:{
      paddingLeft: '7%',
      color: 'black',
     paddingTop: '8%',
      fontSize:20,
      fontFamily: 'Helvetica',
      fontWeight:'400'
      
    },
    helpText:{
      color: 'black',
      fontSize:20,
      fontFamily: 'Helvetica',
      padding:10,
      marginTop: 30
    }
  })