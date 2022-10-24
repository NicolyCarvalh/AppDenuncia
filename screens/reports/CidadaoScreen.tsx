import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import {Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import main from '../../styles/main';

import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input'
import { auth, db } from '../../config/firebase';
import { collection, addDoc, GeoPoint, Timestamp } from "firebase/firestore";


//helpers
import { alertMessage } from 'helpers/alertMessage';
import { textValidator } from 'helpers/textValidator';
import { findLocation } from 'helpers/locationHelper';
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';
import ScreenBase from '../ScreenBase';
import RichTextBox from '../../components/RichTextBox';
import NumericUpDown from '../../components/NumericUpDown';
import AppButton from '../../components/AppButton';
import ComboBox from '../../components/ComboBox';
import CidadaoModel from '../../model/CidadaoModel';


export default class CidadaoScreen extends ScreenBase{

    constructor(props: any) {
      super(props);
      this.state = {
        //form
        description: '',
        peso: 60,
        sexo: 'M',

        //state combobox
        items_sexo: [ 'Masculino', 'Feminino']
      };
    }

    render(){
      const send = async() => {
        let descError = textValidator(this.state.description);
        if(descError){
          alertMessage("error", 'Ops!', descError)
          return;
        }

        let location = await findLocation();
        console.log(location);
        let cidadaoModel = new CidadaoModel(auth.currentUser?.uid, Timestamp.fromDate(new Date()), 
                                  new GeoPoint(location.coords.latitude, location.coords.longitude), this.state.sexo, this.state.description, this.state.peso);
        console.log(cidadaoModel);

        const dbRef = collection(db, "cidadao");
        addDoc(dbRef, JSON.parse( JSON.stringify(cidadaoModel)))
          .then(async () => {
              alertMessage('success', 'Sucesso!', "Sua ocorrência foi enviada com sucesso!");
              //this.resetScreen();
          })
          .catch(error => {
              handleFirebaseError(error)
          })
      }

      return (
        <ScrollView>
          <View style={main.centered} >

            <RichTextBox text='Descreva a situação da pessoa' 
              placeHolder='O cidadão está embriagado e incomodando outros moradores.'
              onChangeText={(text) => this.setState({ description : text})} />

            <NumericUpDown text='Peso aproximado (kg)' 
                default={60}
                onChange={value => this.setState({ peso: value })}/>

            <ComboBox text='Sexo da pessoa' 
              value={this.state.sexo} 
              placeHolder= 'Selecione o sexo'
              items={this.state.items_sexo}
              onChangeValue={value => this.setState( {sexo: value })}/>

            <AppButton text='Enviar' onPress={send}/>
          </View>
        </ScrollView>
        
      );
    }

}