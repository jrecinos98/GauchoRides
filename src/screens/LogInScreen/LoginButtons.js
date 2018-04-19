import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
import styles from "./LoginStyle"

export class LoginButtons extends Component{
    render(){
        return(
            <View >
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>CONTINUE WITH FACEBOOK</Text>
                </TouchableOpacity>
            </View>
        );
    }
}