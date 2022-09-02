import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import {Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import main from '../../styles/main';

import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input'
import { auth, db } from '../../config/firebase';
import { collection, addDoc, GeoPoint, Timestamp } from "firebase/firestore";
import * as Location from 'expo-location';


//helpers
import { alertMessage } from 'helpers/alertMessage';
import { textValidator } from 'helpers/textValidator';
import { findLocation } from 'helpers/locationHelper';
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';
import isOnline  from 'helpers/firebaseConnectionStatus'

export default function UserScreen() {
  const navigation = useNavigation();

  // description
  const [description, setDescription] = React.useState({ value: '', error: '' })
  const [height, setHeight] = React.useState(1)

  //combobox
  const [open, setOpen] = React.useState(false);
  const [sexo, setSexo] = React.useState('M');
  const [items, setItems] = React.useState([
    {label: 'Masculino', value: 'M'},
    {label: 'Feminino', value: 'F'}
  ]);

  //peso
  const [peso, setPeso] = React.useState(60);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nova Ocorrência", headerLeft: () => (
      <Pressable style={{marginLeft: 20}} onPress={()=>{navigation.navigate('Root', { screen: 'ReportScreen' })}}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </Pressable>
      )
    });
  });

  async function send(){
    let descError = textValidator(description.value);
    if(descError){
      alertMessage("error", 'Ops!', descError)
      return;
    }

    let location = await findLocation();
    let data = {
      'codigo_usuario': auth.currentUser?.uid, // chave secundaria do usuario
      'data': Timestamp.fromDate(new Date()), // data e hora
      'info_1': description.value, // descrição
      'info_2': peso,
      'info_3': sexo,
      'localizacao': new GeoPoint(location.coords.latitude, location.coords.longitude),
      'ocorrencia': 1
    }
    console.log(data)

    navigation.reset({ // reseta os campos de todas as janelas do path Root
      index: 0,
      routes: [{ name: 'Root' }]
    })

    const dbRef = collection(db, "denuncias");
    addDoc(dbRef, data)
      .then(async () => {
          console.log("Document has been added successfully");
          alertMessage('success', 'Sucesso!', "Sua ocorrência foi enviada com sucesso!");
          //navigation.navigate('Root', {name: 'UserScreen'})
      })
      .catch(error => {
          handleFirebaseError(error)
      })
  }

  return (
    
    <View style={main.centered} >
        <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
          <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>Descreva a situação da pessoa</Text>
          <TextInput style={[main.richinput, {height: Math.max(35, height)}]} value={description.value}
                onChangeText={(text) => {
                  setDescription({ value: text, error: '' })
                }}
                onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                autoCapitalize="words"
                textContentType="name"
                multiline={true}
                keyboardType="default" placeholder="O cidadão está embriagado e incomodando outros moradores." />
        </View>

        <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
          <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>Peso aproximado (kg)</Text>
          <View style={{marginTop: 15, backgroundColor: 'transparent'}}>
            <NumericInput
              value={peso} 
              onChange={value => setPeso(value)} 
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              totalWidth={140} 
              totalHeight={40} 
              iconSize={50}
              step={1}
              valueType='real'
              rounded 
              textColor='#000'
              rightButtonBackgroundColor='#1177d1'
              leftButtonBackgroundColor='#1177d1'/>
          </View>
          
        </View>

        <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
          <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>Sexo da pessoa</Text>
          <DropDownPicker style={{
            width: '100%', alignContent: 'center', borderRadius: 0, borderColor: 'transparent'
            }}
            open={open}
            value={sexo}
            items={items}
            setOpen={setOpen}
            setValue={setSexo}
            setItems={setItems}
          />
        </View>
        
        <View style={{marginTop: '30%', width: '100%'}}>
          <View style={main.centered}>
            <TouchableOpacity style={[main.buttonSignOut, {}]} onPress={send}>
              <Text style={main.buttonText}>Enviar</Text>
            </TouchableOpacity >
          </View>
          
        </View>
        


    </View>
  )
};

