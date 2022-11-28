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
import ColetaModel from '../../model/ColetaModel';


export default class LocalScreen extends ScreenBase{

    constructor(props: any) {
      super(props);
      this.state = {
        //form
        nome: '',
        ponto_referencia: '',
        contato: '',
        telefone: '',
        retorno: 0,
        obs: ''
      };
    }

    render(){

      const send = async() => {

        let litros = this.state.litros;
        let retorno = this.state.retorno;
        let galoes = this.state.galoes;
        let obs = this.state.obs;

        let location = await findLocation();
      
        let coletaModel = new ColetaModel(auth.currentUser?.uid, Timestamp.fromDate(new Date()), new GeoPoint(location.coords.latitude, location.coords.longitude), litros, retorno, galoes, obs);

        const dbRef = collection(db, "coleta");
        addDoc(dbRef, JSON.parse( JSON.stringify(coletaModel)))
          .then(async () => {
              alertMessage('success', 'Sucesso!', "Sua ocorrência foi enviada com sucesso!"); // https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/api.md
              //this.resetScreen();
          })
          .catch(error => {
              handleFirebaseError(error)
          })
      }

      return (
        <ScrollView>
          <View style={main.centered} >

            <RichTextBox text="Ponto de referência" placeHolder='Digite o ponto de referência' onChangeText={(valor) => this.setState({contato: valor})}></RichTextBox>


            <RichTextBox text="Contato" placeHolder='Digite o contato' onChangeText={(valor) => this.setState({contato: valor})}></RichTextBox>

            <RichTextBox text="Telefone" placeHolder='Digite o telefone' onChangeText={(valor) => this.setState({telefone: valor})}></RichTextBox>

            <NumericUpDown text="Retorno"   default={0}  onChange={(valor) => this.setState({retorno: valor})}></NumericUpDown>

            <RichTextBox text="Observação" placeHolder='Digite alguma observação' onChangeText={(valor) => this.setState({obs: valor})}></RichTextBox>

            <AppButton text='Enviar' onPress={send}/>
          </View>
        </ScrollView>
        
      );
    }

}