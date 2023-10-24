import { RefreshControl,StyleSheet,  TouchableOpacity, View,KeyboardAvoidingView,  Alert, Button, ImageBackground,Text, Modal } from 'react-native'
import {CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import firebase from "firebase";
import { Camera, getCameraPermissionsAsync } from 'expo-camera'
import { auth } from '../firebase';
import React, { useState, useEffect,useRef, Component } from 'react';

import { useIsFocused } from '@react-navigation/native';

var returnArr = [];
var n=0; 

const TasksScreen = () => {
const [title,settitle]=useState('');
const [username,setuser]=useState('');
const [rer,setsize]=useState('');
const [istrue,setTrue]=useState(false);
function snapshotToArray(snapshot) {
  
  returnArr = [];
  snapshot.forEach(function(childSnapshot) {  
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      console.log('itemxdd'+item.date);
      returnArr.push(item);
      
   
  });
   n=1;
  return returnArr;
};


useEffect(() => {
 
    
    setTimeout(()=> {
        navigation.navigate('Tasks', { name: 'Jane' });
       }, 100);
    
  
}, [])
  firebase.database()
  .ref('users/'+auth.currentUser?.uid)
  .once('value', websnapshot => {
    setuser(websnapshot.val().username);

    });
  

    firebase.database().ref('рабочие/'+username+'/zadanie').on('value', function(oldsnapshot) {
      console.log(snapshotToArray(oldsnapshot));
  });
    const [check1, setCheck1] = useState(false);
    const navigation = useNavigation()
    const [com, setCom] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const onPress = () => {
        props.navigation.navigate('Tasks');
      };
    return (
        <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.infoText}>Мои задания</Text>
        <View style={styles.container}>
         <View style={styles.box}>
      
         <View style={{flexDirection: 'column'}}>
         {returnArr.map((returnArr) => {
          return  (<View>
            <TouchableOpacity style={{flexDirection: 'column'}} onPress={() => setModalVisible(true)}>
            <Text style={{fontSize:16}}>{returnArr.zadanie}</Text>
            <Text style={{fontSize:20,paddingBottom:10, fontWeight: 'bold'}}>{returnArr.date}</Text>
            </TouchableOpacity>
            </View>)
         })}
      
         
        </View>
      
        </View>
          
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
         <View style={{height:'100%', backgroundColor:'transparent', }}></View>
        <View style={{height:'40%',backgroundColor:'white',marginTop: 'auto', 
      alignItems: 'center', borderTopLeftRadius:22, borderTopRightRadius:22}}>
        
          <Text style={{fontSize:20,paddingTop:'10%', fontWeight: 'bold'}}>Задание 1</Text>
          <Text style={{left:'-30%',fontSize:14,paddingTop:'5%', fontWeight: 'bold'}}>Описание:</Text>
          <Text style={{left:'-30%',fontSize:14,paddingTop:'5%', fontWeight: 'bold'}}>Поручил:</Text>
          <Text style={{left:'-22%',fontSize:14,paddingTop:'5%', fontWeight: 'bold'}}>Сроки выполнения:</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}><Text style={styles.buttonText00}>Вернуться назад</Text></TouchableOpacity>
        </View>
       </Modal>
      </KeyboardAvoidingView>

  );
    
  } 


export default TasksScreen



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop:'15%',

    },
    button: {
      backgroundColor: '#5DB075',
      width: '90%',
      padding: 18,
      borderRadius:100,
      alignItems: 'center',
      marginTop:60,

    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 20,
    },
    choose:{
      alignItems: 'center',
      width:'100%',
      height:'8%',
      flexDirection: 'row',
      backgroundColor:'#E8E8E8',
      borderRadius:32,
    },
    paragraph: {
      margin: 12,
      fontSize: 18,
      color: '#34495e',
    },
    infoText:{
        fontFamily: 'Helvetica',
        fontSize:28,
        fontWeight: '400'
      },
      text1: {
       
        fontSize:16,
        marginLeft:'10%',
        marginRight:'10%',
        color:'#5DB075',
        fontWeight: '500'
      },
      text2: {
        fontSize:16,
        marginRight:'8%',
        marginLeft:'8%',
        color:'#BDBDBD',
        fontWeight: '500'
      },
      text4: {
        paddingLeft:0,
        fontSize:16,
        marginLeft:'10%',
        marginRight:'10%',
        color:'#5DB075',
        fontWeight: '500', 
       
      },
      text3: {
        fontSize:16,
        marginLeft:'8%',
        marginRight:'8%',
        color:'#BDBDBD',
        fontWeight: '500',
  
      },
   

    box:{
      position:'absolute',
      top:'-5%',
      left:'-45%',
      flexDirection: 'row',
    },
    
  });