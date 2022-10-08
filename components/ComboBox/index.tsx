import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

import {Text} from '../Themed'

import main from '../../styles/main';
import NumericInput from "react-native-numeric-input";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
    text: string,
    value: any,
    placeHolder: string,
    items: any[],
    onChangeValue: (value: any) => void
}

export default class AppButton extends React.Component<Props>{

    constructor(props: any){
        super(props)
        this.state = {
            open: false,
            value: this.props.value,
            items: this.props.items,

        }
    }

    render(): React.ReactNode {

        const { open, sexo, items } = this.state;

        const setOpen = (open) => {
            this.setState({
            open
            });
        }
        
        const setValue = (callback) => {
            this.setState(state => ({
                value: callback(state.value)
            }));
        }
        
        const setItems = (callback) => {
            this.setState(state => ({
                items: callback(state.items)
            }));
        }

        return(
            <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
              <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>{this.props.text}</Text>
              <DropDownPicker style={{
                width: '100%', alignContent: 'center', borderRadius: 0, borderColor: 'transparent'
                }}
                placeholder= {this.props.placeHolder}
                open={open}
                value={sexo}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={() => {
                    console.log('aaaaa')
                    console.log(this.state.value);
                    this.props.onChangeValue(this.props.value);}}
              />
            </View>
        )
    }

    

}