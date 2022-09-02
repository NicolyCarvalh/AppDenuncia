import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import {SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import { Text, View ,} from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect } from 'react';
import main from '../styles/main';

import logo from 'assets/images/capivara.png'; 
import anonimo from 'assets/images/anonimo.png';
import google from 'assets/images/google.png';
import background from 'assets/cpan.jpg';

import { getAuth, signInAnonymously, signInWithEmailAndPassword  } from "firebase/auth";

//helpers
import { alertMessage } from 'helpers/alertMessage';
import { emailValidator } from 'helpers/emailValidator'
import { passwordValidator } from 'helpers/passwordValidator'
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';

import { auth } from '../config/firebase';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState({ value: '', error: '' })
  const [password, setPassword] = React.useState({ value: '', error: '' })

  auth.onAuthStateChanged(() => { // evento quando logar/deslogar
    if(auth.currentUser){ // verifica se foi feito login
      navigation.navigate('Root', { screen: 'UserScreen' })
    }
  })

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  const signAnononly = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        navigation.navigate('Root', { screen: 'UserScreen' })
      })
      .catch((error) => {
        handleFirebaseError(error)
      });
  }

  const onLogInPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if(emailError){
      alertMessage('error', 'Ops!', emailError);
      return;
    }
    if(passwordError){
      alertMessage('error', 'Ops!', passwordError);
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate('Root', { screen: 'UserScreen' })
      })
      .catch((error) => {
        handleFirebaseError(error)
      });
  }

  return (
    
    <View style={main.centered}>
      <Image source={background} style={{height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 0, width: '100%', position: 'absolute'}}/>
      <Image source={logo} style={{marginBottom: 2}}/>
      
      <View style={main.card}>
          <Text style={{color: "#000", fontWeight: "bold", fontSize: 18}}>Seja bem-vindo(a)!</Text>
          <Text style={{color: "#000", fontSize: 15}}>Faça o login ou entre anonimamente.</Text>
          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <SimpleLineIcons style={main.inputIcon} name="user" size={20} color="#343a40" />
            </View>
            <TextInput style={main.input} value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address" placeholder="Digite seu e-mail" />
          </View>

          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <MaterialCommunityIcons  style={main.inputIcon} name="key" size={20} color="#343a40" />
            </View>
            <TextInput style={main.input} onChangeText={(text) => setPassword({ value: text, error: '' })} placeholder="Digite sua senha" secureTextEntry={true}/>
          </View>

          <TouchableOpacity style={main.buttonSignOut} onPress={onLogInPressed}>
            <Text style={main.buttonText}>Fazer Login</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => {navigation.navigate('Root', { screen: 'RegisterScreen' })}}>
            <Text style={{ alignSelf:'center', margin: 15, color: "#1177d1"}}>Criar uma conta</Text>
          </TouchableOpacity>
          
          <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center'}} />
            <Text style={{ alignSelf:'center', paddingHorizontal:5, color: "#000"}}>ou se preferir</Text>
            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center'}} />
          </View>

          <View style={{backgroundColor:'transparent', flexDirection: 'row',
        flexWrap: 'wrap',}}>
            <TouchableOpacity style={main.buttonOtherLogin} activeOpacity={0.5} >
              <Image
                source={google}
                style={main.buttonImageIconStyle}
              />
            </TouchableOpacity>

            <TouchableOpacity style={main.buttonOtherLogin} activeOpacity={0.5} onPress={signAnononly}>
              <Image
                source={anonimo}
                style={main.buttonImageIconStyle}
              />
            </TouchableOpacity>
          </View>
          

      </View>
      

    </View>
  )
};