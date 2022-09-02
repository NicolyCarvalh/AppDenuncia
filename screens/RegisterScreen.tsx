import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import { useEffect } from 'react';

// expo & libraries
import {SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

//components
import { Text, View ,} from '../components/Themed';
import MenuIcon from '../components/MenuIcon';

import main from '../styles/main';

//assets
import logo from 'assets/images/capivara.png';
import background from 'assets/cpan.jpg';

//firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {db, app} from '../config/firebase'

//helpers
import { emailValidator } from 'helpers/emailValidator'
import { passwordValidator } from 'helpers/passwordValidator'
import { nameValidator } from 'helpers/nameValidator'
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';
import { alertMessage } from 'helpers/alertMessage';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState({ value: '', error: '' })
  const [name, setName] = React.useState({ value: '', error: '' })
  const [password, setPassword] = React.useState({ value: '', error: '' })

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });


  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if(emailError){
      alertMessage("error", 'Ops!', emailError);
      return;
    }
    if(nameError){
      alertMessage("error", 'Ops!', nameError);
      return;
    }
    if(passwordError){
      alertMessage("error", 'Ops!', passwordError);
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userData) =>{ 
        updateProfile(auth.currentUser, {displayName: name.value}).then(() => { console.log('perfil atualizado')});
        navigation.navigate('Root', { screen: 'UserScreen' })
        
     })
    .catch(error => {
        handleFirebaseError(error)
    });
  }

  return (
    
    <View style={main.centered}>
      <Image source={background} style={{height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 0, width: '100%', position: 'absolute'}}/>
      <Image source={logo} style={{marginBottom: 2}}/>
      
      <View style={main.card}>
          <Text style={{color: "#000", fontWeight: "bold", fontSize: 18}}>Criar nova conta</Text>
          <Text style={{color: "#000", fontSize: 15}}>Preencha os dados para continuar.</Text>

          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <SimpleLineIcons style={main.inputIcon} name="user" size={20} color="#343a40" />
            </View>
            <TextInput style={main.input} value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                autoCapitalize="words"
                textContentType="name"
                keyboardType="default" placeholder="Digite seu nome e sobrenome" />
          </View>

          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <Foundation style={main.inputIcon} name="mail" size={20} color="#343a40" />
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

          <TouchableOpacity style={main.buttonSignOut} onPress={onSignUpPressed}>
            <Text style={main.buttonText}>Registrar</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => {navigation.navigate('Root', { screen: 'LoginScreen' })}}>
            <Text style={{ alignSelf:'center', margin: 15, color: "#1177d1"}}>Já tenho uma conta.</Text>
          </TouchableOpacity>
          

      </View>
      

    </View>
  )
};