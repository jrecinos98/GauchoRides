import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
import styles from "./LoginStyle"

export class LoginButtons extends Component{

    render(){
        return(
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.callback()}>
                <Text style={styles.buttonText}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}