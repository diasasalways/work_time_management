import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomDrawer';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../HomeScreen';
import LoginScreen from '../LoginScreen';
import ProfileScreen from '../ProfileScreen'
import SupportScreen from '../SupportScreen'
import TasksScreen from '../TasksScreen'
import AuthStack from '../AuthStack';
import EmptyTaskScreen from '../EmptyTaskScreen';
const Drawer = createDrawerNavigator();
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../firebase'
import firebase from "firebase";


var usernamecheck = firebase.auth().currentUser;
const AppStack = () => {

  
  if(usernamecheck == null){
    return (
      <Drawer.Navigator
  drawerContent={props => <CustomDrawer {...props} />} initialRouteName='Login' 
  screenOptions={{
    swipeEdgeWidth: 0,
    headerShown: false,
    drawerActiveBackgroundColor: '#4a945f',
    drawerActiveTintColor: '#fff',
    drawerInactiveTintColor: '#333',
    drawerLabelStyle: {
      marginLeft: -25,
      fontSize: 20,
    },
  }}>
    
  <Drawer.Screen
    name="Home"
    component={HomeScreen}
    options={{
      title:"Главная страинца",
      drawerIcon: ({color}) => (
        <Ionicons name="home" size={26} color={color} type="Ionicons" />
      ),
    }}
  />

  <Drawer.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      title:"Профиль",
      drawerIcon: ({color}) => (
       
        <Ionicons name="person-outline" size={26} color={color} />
      ),
    }}
  />
    <Drawer.Screen
    name="Tasks"
    component={TasksScreen}
    options={{
      title:"Мои задания",
      drawerIcon: ({color}) => (
        <Ionicons name="reader-outline" size={26} color={color} />
      ),
    }}
  />
   <Drawer.Screen
    name="Support"
    component={SupportScreen}
    options={{
      title:"Помощь",
      drawerIcon: ({color}) => (
        <Ionicons name="information-circle-outline" size={26} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name="Login"
    component={LoginScreen}
    options={{
      drawerLabel: () => null,
                title: null,
                drawerIcon: () => null
    }}
  />
  <Drawer.Screen
    name="EmptyTask"
    component={EmptyTaskScreen}
    options={{
      drawerLabel: () => null,
                title: null,
                drawerIcon: () => null
    }}
  />
  
</Drawer.Navigator>
    )
  }
  else{
    return(
    <Drawer.Navigator
drawerContent={props => <CustomDrawer {...props} />}
screenOptions={{
  headerShown: false,
  drawerActiveBackgroundColor: '#4a945f',
  drawerActiveTintColor: '#fff',
  drawerInactiveTintColor: '#333',
  drawerLabelStyle: {
    marginLeft: -25,
    fontSize: 20,
  },
}}>
  
<Drawer.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title:"Главная страинца",
    drawerIcon: ({color}) => (
      <Ionicons name="home" size={26} color={color} type="Ionicons" />
    ),
  }}
/>
<Drawer.Screen
  name="Login"
  component={LoginScreen}
  options={{
    title:"Логин",
    drawerIcon: ({color}) => (
      <Ionicons name="log-in-outline" size={26} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title:"Профиль",
    drawerIcon: ({color}) => (
     
      <Ionicons name="person-outline" size={26} color={color} />
    ),
  }}
/>
  <Drawer.Screen
  name="Tasks"
  component={TasksScreen}
  options={{
    title:"Мои задания",
    drawerIcon: ({color}) => (
      <Ionicons name="reader-outline" size={26} color={color} />
    ),
  }}
/>
 <Drawer.Screen
  name="Support"
  component={SupportScreen}
  options={{
    title:"Помощь",
    drawerIcon: ({color}) => (
      <Ionicons name="information-circle-outline" size={26} color={color} />
    ),
  }}
/>

</Drawer.Navigator>
)}

};

export default AppStack;