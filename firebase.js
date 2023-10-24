// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJxE4r47hjPzOGRsj9LYAv2DK1Oc7xjrY",
  authDomain: "deadinside-again.firebaseapp.com",
  databaseURL: "https://deadinside-again-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "deadinside-again",
  storageBucket: "deadinside-again.appspot.com",
  messagingSenderId: "453932000007",
  appId: "1:453932000007:web:0ea34a4bbeb39f9ace1ba2",
  measurementId: "G-72J5T8L053"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };

