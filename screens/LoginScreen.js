import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground} from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'



const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        //navigation.navigate("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }
  

  return (


    <KeyboardAvoidingView

    
      style={styles.container}
    >
 
   <TouchableOpacity style={{position: 'absolute', left:'7%',top:'8%'}}   onPress={ () => navigation.openDrawer()}> 
         <ImageBackground
    source={require('./menu_icon.png')}  style={{ width: 40,
      height: 40, paddingLeft:0}}/></TouchableOpacity>
   
   <View>
   
     <Text style={styles.headText}>Вход в систему</Text>
   </View>
      <View style={styles.inputContainer}>
      
        <TextInput
          placeholder="Почта пользователя"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль пользователя"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        <Text style={styles.passText}>Забыли пароль от аккаунта?</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  inputContainer: {
    width: '90%',
    marginBottom:'10%',
    


  },

  headText:{
    paddingBottom:'10%',
    fontWeight: '500',
    fontSize: 32
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: "5%",
    borderRadius: 10,
    marginTop: 15,
    fontSize: 18,
  
    
  },

  passText:{
    paddingTop:25,
    fontSize: 16,
    fontWeight:'600',
    color: '#5DB075',
  },

  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  button: {
    backgroundColor: '#5DB075',
    width: '100%',
    padding: 18,
    borderRadius:100,
    alignItems: 'center',
    
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
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  
})
