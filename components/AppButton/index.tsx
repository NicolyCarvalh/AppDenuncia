import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

import {Text} from '../../components/Themed'

interface Props {
    text: string,
    onPress: () => void
}

export default class AppButton extends React.Component<Props>{

    constructor(props: any){
        super(props)
    }

    
    render(): React.ReactNode {

        const pressButton = () => {
            this.props.onPress();
        }
    

        return(
            <TouchableOpacity style={styles.button} onPress={pressButton}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity >
        )
    }

    

}