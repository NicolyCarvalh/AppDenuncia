import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

import {Text} from '../Themed'

import main from '../../styles/main';

interface Props {
    text: string,
    placeHolder: string,
    onChangeText: (text: string) => void
}

export default class RichTextBox extends React.Component<Props>{

    constructor(props: any){
        super(props)
        this.state = {
            height: 1
        }
    }

    render(): React.ReactNode {
        return(
            <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
              <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>{this.props.text}</Text>
              <TextInput style={[styles.richinput, {height: Math.max(35, this.state.height)}]}
                    onChangeText={this.props.onChangeText}
                    onContentSizeChange={(e) =>  this.setState( { height: e.nativeEvent.contentSize.height })}
                    autoCapitalize="words"
                    textContentType="name"
                    multiline={true}
                    keyboardType="default" placeholder={this.props.placeHolder} />
            </View>
        )
    }

    

}