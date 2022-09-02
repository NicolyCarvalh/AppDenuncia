import * as React from 'react';
import { FloatingAction } from "react-native-floating-action";
// expo libraries
import * as Location from 'expo-location';
import {useNavigation } from '@react-navigation/native';

//helpers
import { alertMessage } from 'helpers/alertMessage';

//config
import { auth } from '../config/firebase';

export default function PlusButton() {
  const navigation = useNavigation();


  const handlePress = async (name) => {
    if(name == 'bt_new'){
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alertMessage('error',
          "Permissão insuficiente",
          "Desculpa, nós precisamos da permissão de Localização para isso funcionar");
        return;
      }
      navigation.navigate('Root', { screen: 'ReportScreen' })
    }else if(name == 'bt_logout'){
      try {
        await auth.signOut();
        navigation.navigate('Root', { screen: 'LoginScreen' })
    
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <FloatingAction actions={actions} iconWidth={30} showBackground={false} iconHeight={30} buttonSize={70}
      onPressItem={name => handlePress(name)}
    />
  );
};

const actions = [
  {
    text: "Nova denúncia",
    icon: require("assets/images/icons/plus.png"),
    name: "bt_new",
    position: 1,
    buttonSize: 50,
    textStyle: {fontSize: 16, fontWeight: 'bold' }
  },

  {
    text: "Sair",
    icon: require("assets/images/icons/logout.png"),
    name: "bt_logout",
    position: 2,
    buttonSize: 50,
    textStyle: {fontSize: 16, fontWeight: 'bold' }
  },
 
];