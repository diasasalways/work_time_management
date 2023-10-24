import { useNavigation } from '@react-navigation/core'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, TouchableHighlight, Button, Image, Alert } from 'react-native'
import { Text } from 'galio-framework';
import firebase from "firebase";
import { Camera, getCameraPermissionsAsync } from 'expo-camera'
import { auth } from '../firebase';
import React, { useState, useEffect,useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-ionicons'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useIsFocused } from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StopWatch from 'react-native-stopwatch-timer/lib/stopwatch';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const LOCATION_TRACKING = 'background-location-tracking';
//wewe();
const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'
var arr = [];
var user='';var notify=0; 
var number;



const HomeScreen = () => {
  var usernamecheck = firebase.auth().currentUser;
  const navigation = useNavigation();
  if(usernamecheck === null){
  navigation.navigate('Login');
}
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }
  var title;
  var body;

function snapshotToArray(snapshot) {
  arr=[];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      arr.push(item);


  });


  return arr;
};
firebase.database()
.ref('users/'+auth.currentUser?.uid)
.once('value').then( websnapshot => {
user=websnapshot.val().username;

});
function takenumber(user){
firebase.database().ref('рабочие/'+user).get('value').then( function(oldsnapshot) {
  number=oldsnapshot.val().num;
//console.log(number);

});

}
takenumber(user);
query(user);
function query(user){
  firebase.database().ref('рабочие/'+user+'/zadanie').get('value').then( function(oldsnapshot) {
    snapshotToArray(oldsnapshot);


  });}





  arr.map((arr) => {
     title="Задание до "+arr.date;
     body="Задание:"+arr.zadanie;
     if(notify<number){
      schedulePushNotification(title,body);
     }
     notify+=1;
  })





useEffect(() => {

  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };



}, []);  

  



  
  useEffect(() => {
    (async () => {
     

      let location = await Location.getCurrentPositionAsync({});
    
    })();
  }, []);
  
  
  
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      gpsLocationFromDevice = await Location.getCurrentPositionAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      
      if (status === 'granted') {
      
      
    }

      Location.setGoogleApiKey(apiKey);

      console.log(status);
    })();
  }, [getLocation]);




  const handleNewNotification = async notificationObject => {
    try {
      const newNotification = {
        id: notificationObject.messageId,
        date: notificationObject.sentTime,
        title: notificationObject.data.title,
        body: notificationObject.data.message,
        data: JSON.parse(notificationObject.data.body),
      }
      // add the code to do what you need with the received notification  and, e.g., set badge number on app icon
      console.log(newNotification)
      await Notifications.setBadgeCountAsync(1)
    } catch (error) {
      console.error(error)
    }
  }


  

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) => handleNewNotification(data.notification)
  )


  useEffect(() => {
    // register task to run whenever is received while the app is in the background
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)
  
    // listener triggered whenever a notification is received while the app is in the foreground
    const foregroundReceivedNotificationSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        handleNewNotification(notification.request.trigger.remoteMessage)
      }
    )
  
    return () => {
      // cleanup the listener and task registry
      foregroundReceivedNotificationSubscription.remove()
      Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK)
    }
  }, [])
 
  
  const [check, setcheck] = useState('');
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [isTrue, setTrue] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [t, setTime] = useState('');
  const [w1, setWait] = useState('');
  const [longitude1, setLong] = useState('');
  const [latitude1, setLati] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [getLocation, setGetLocation] = useState(false);
  const [qocation, Getqocation] = useState(null);
  let apiKey = 'YOUR_API_KEY';
  const [hours2, setpriwel] = useState('');
  const [uwel, setuwel] = useState('');
  const [isaa, setaa] = useState(false);
  var save = async () => {
    try {
   await AsyncStorage.setItem("Time", t)
    } catch (err) {
      alert(err);
    }
  };
 
 
 
 
   var load = async () => {
    try {
      const value = await AsyncStorage.getItem("Time");
      if (value !== null) {
        // We have data!!
        console.log ('--------------');
        console.log ('--------------');
        console.log(value);
        setWait(value);
        console.log ('--------------');
        console.log ('--------------');
      }
    } catch (error) {
      // Error retrieving data
    }
  };
 
  save();
  load();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
 
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      }
    })();
  }, []);
 
 
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(!scanned);
    if (hours2 === "") {
      var today = new Date();
      var hours = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      setpriwel(hours);
      setaa(true)
    }
    setIsStopwatchStart(!isStopwatchStart);
 
  };
 
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      gpsLocationFromDevice = await Location.getCurrentPositionAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
 
      if (status === 'granted') {
        let location = await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
          deferredUpdatesInterval: 1000,
          activityType: Location.ActivityType.AutomotiveNavigation,
          distanceInterval: 1
        })
 
      }
 
      Location.setGoogleApiKey(apiKey);
 
      console.log(status);
    })();
  }, [getLocation]);
 


  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
          const res = await Location.hasServicesEnabledAsync();
          if(!res) {console.log("No location");
         
            setIsStopwatchStart(false);
            setcheck('0');
            Alert.alert('Ошибка', 'Вы не включили геопозицию', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }else{
          setcheck('1');
          let location = await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.BestForNavigation,
            showsBackgroundLocationIndicator: true,
            deferredUpdatesInterval: 1000,
            activityType: Location.ActivityType.AutomotiveNavigation,
            distanceInterval: 1
        },)
        }
         
      })();
    }, 8000);
    return () => clearInterval(interval);
  }, []);


  TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => { 
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
  
    if(data) {
        const { locations } = data;
  console.log(locations);
  Getqocation(locations);
        console.log('send to api');
     
    }
  
  
    let longitude = qocation[0].coords.longitude;
    let latitude = qocation[0].coords.latitude;
    console.log(longitude);
    console.log(latitude);
    
  
    //50.273187, 57.144213
 if(latitude<1000 && latitude>0 && longitude<100 && longitude>0 ){
 
            setLati('1');
            setLong('1');
            
      
    }else{
    
    setIsStopwatchStart(false);
    Alert.alert('Ошибка', 'Вы не в зоне действия', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
   
      
    }
  });


  var lat = latitude1;
  var long = longitude1;


  if (hasPermission === null) {
    return <Text style={{fontSize:25, justifyContent: 'center',marginTop:'80%'}}>Запрашивается доступ к камере</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{fontSize:25, justifyContent: 'center',marginTop:'80%'}}>Доступ к камере запрещен</Text>;
  }


 if(true){ return (
  <View style={styles.container}>


{isFocused &&
  <Camera 
  
    onBarCodeScanned={isTrue ? undefined : handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
  />}
<BarcodeMask edgeColor={'#ff3636'} showAnimatedLine={false} width={300} height={300} edgeBorderWidth={4}
outerMaskOpacity={0.6}
edgeRadius={10} edgeHeight={50} edgeWidth={50} radius={10} />


<TouchableOpacity style={{position: 'absolute', left:'7%',top:'8%'}}   onPress={ () => navigation.openDrawer()}> 
<Image 
    source={require('./menu_icon.png')}  
    style={{ width: 40,height: 40, paddingLeft:0, opacity:10}}/>         
</TouchableOpacity>


  <TouchableOpacity underlayColor={'none'}
    onPress={Add(w1, hours2, uwel)
    }>
  </TouchableOpacity>




  {scanned &&
    <TouchableOpacity style={styles.button} underlayColor={'none'}
      onPress={() => {
        //setScanned(false);
        var today = new Date();
        var aurscaa = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        setuwel(aurscaa);
        setIsStopwatchStart(!isStopwatchStart);
        setTrue(!isTrue);
      }}>


      <Text style={styles.buttonText}>
        {isTrue ? 'Начать' : 'Стоп'
        }
      </Text>
    </TouchableOpacity>
  }


  <View style={styles.button3}>
    <Stopwatch style={styles.button}
      laps

      start={isStopwatchStart}
      //To start
      reset={resetStopwatch}
      //To reset
      options={options}
      //options for the styling
      getTime={(time) => {
        setTime(time);
        console.log(time);
      }}


    />


  </View>

</View>





  )}else{
    return (  <View style={styles.container}>
      <Image
         style={{ justifyContent: 'center',
         alignItems: 'center',marginTop:'35%'}}        //We are using online image to set background
          source={
         require('../200w.gif')
          }
   
        />
         <Text style={{fontSize: 25, fontWeight: 'bold',}}>Идет сбор текущей локации</Text>
      </View>);

  }

}

var today = new Date();
var hours = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
async function schedulePushNotification(title1,body1) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title1,
      body: body1,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

 /*
export function wewe(){
  var usernamecheck = firebase.auth().currentUser;
  if(usernamecheck != null){
  firebase.database()
  .ref('users/'+auth.currentUser?.uid)
  .on('value', snapshot => {
  
    firebase.database()
  .ref('рабочие/'+snapshot.val().username+'/zadanie')
  .on('value', wesnapshot => {  
    var username=snapshot.val().username;
    console.log('User data: ', wesnapshot.val());
    wesnapshot.forEach(childSnapshot =>{  firebase.database()
      .ref('рабочие/'+username+'/zadanie/'+childSnapshot.key)
    .on('value', snapshot => {  
      var title="Задание до "+snapshot.val().date;
      var body="Задание:"+snapshot.val().zadanie;
       schedulePushNotification(title,body);
    });})
  });
  });}
}*/
export function Add(w1, hours2, uwel) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var aurscaa = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    firebase.database().ref('users/' + auth.currentUser?.uid).once('value').then((snapshot) => {
      console.log(snapshot.val());
      firebase.database().ref('рабочие/' + snapshot.val().username + '/' + date).set(
        {
          имя: auth.currentUser?.email,
          дата:date,
          время: w1,
          прибытие: hours2,
          выход: uwel
        }
      ).then(() => {
        //console.log('INSERTED !');
      }).catch((error) => {
        console.log(error);
      });
    })
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  container1: {
    alignItems: 'center',
    paddingTop: 140

  },
  button: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    paddingBottom: 0,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    top: '70%',
    height: '7%',

  },
  button1: {
    backgroundColor: '#0782F9',
    alignItems: 'center',
    width: '25%',
    padding: 15,
    borderRadius: 30,
    marginTop: 70,
    marginStart: '65%',
    backgroundColor: '#f51d1d'


  },
  button3: {
    backgroundColor: 'white',
    width: '40%',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    top: '75%'

  },
  timer: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    color: '#237CFF',
    textDecorationColor: '#237CFF',
    fontSize: 40,
  },
  buttonText: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:1,
    textAlign: 'center',
    top:'30%',
    fontSize:'20',
  },
  buttonText1: {
    fontSize: 16,
    position: 'absolute',
    justifyContent: 'center',

  },
  button2: {
    backgroundColor: '#0782F9',
    alignItems: 'center',
    width: '33%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginStart: '62%',
    height: 45,
  },

  Text1: {
    marginStart: '60%'
  }

}

);
const options = {
  container: {
    color: '#237CFF',
    fontSize: 40,
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    textDecorationColor: '#237CFF',
  },
};
