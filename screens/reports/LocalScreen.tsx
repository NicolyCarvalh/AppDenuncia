import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Image, TextInput, Alert, TouchableOpacity } from 'react-native';
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
import LocalModel from '../../model/LocalModel';


export default class LocalScreen extends ScreenBase {

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

  render() {

    const send = async () => {

      let nome = this.state.nome;
      let ponto_referencia = this.state.ponto_referencia;
      let contato = this.state.contato;
      let telefone = this.state.telefone;
      let retorno = this.state.retorno;
      let obs = this.state.obs;

      let erro = textValidator(nome)
      if(erro){
        alertMessage('error', 'Erro!', `Erro no campo nome. ${erro}`); 
        return;
      }

      erro = textValidator(ponto_referencia)
      if(erro){
        alertMessage('error', 'Erro!', `Erro no campo ponto de referência. ${erro}`); 
        return;
      }

      erro = textValidator(contato)
      if(erro){
        alertMessage('error', 'Erro!', `Erro no campo contato. ${erro}`); 
        return;
      }

      erro = textValidator(telefone)
      if(erro){
        alertMessage('error', 'Erro!', `Erro no campo telefone. ${erro}`); 
        return;
      }

      let location = await findLocation();

      let localModel = new LocalModel(auth.currentUser?.uid, Timestamp.fromDate(new Date()), new GeoPoint(location.coords.latitude, location.coords.longitude)
        , nome, ponto_referencia, contato, telefone, retorno, obs);

      const dbRef = collection(db, "local");
      addDoc(dbRef, JSON.parse(JSON.stringify(localModel)))
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
          <RichTextBox text="Nome" placeHolder='Digite o nome' onChangeText={(valor) => this.setState({ nome: valor })}></RichTextBox>

          <RichTextBox text="Ponto de referência" placeHolder='Digite o ponto de referência' onChangeText={(valor) => this.setState({ ponto_referencia: valor })}></RichTextBox>

          <RichTextBox text="Contato" placeHolder='Digite o contato' onChangeText={(valor) => this.setState({ contato: valor })}></RichTextBox>

          <RichTextBox text="Telefone" placeHolder='Digite o telefone' onChangeText={(valor) => this.setState({ telefone: valor })}></RichTextBox>

          <NumericUpDown text="Retorno" default={0} onChange={(valor) => this.setState({ retorno: valor })}></NumericUpDown>

          <RichTextBox text="Observação" placeHolder='Digite alguma observação' onChangeText={(valor) => this.setState({ obs: valor })}></RichTextBox>

          <AppButton text='Enviar' onPress={send} />
        </View>
      </ScrollView>

    );
  }

}