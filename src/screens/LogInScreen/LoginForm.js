import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
import styles from "./LoginStyle"

export class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.email = "";
        this.password = "";
    }

    render() {
        return (
            <View style={styles.textContainer}>

                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor='white'
                    placeholder="Email"
                    returnKeyType="next"
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    onSubmitEditing={()=> {
                        this.passWordInput.focus();
                    }}
                    onChangeText={(email) => {
                        this.email = email;
                        this.props.callback(this.email, this.password);
                    }}/>

                <TextInput style={styles.input}
                    placeholder="Password"
                    placeholderTextColor='white'
                    returnKeyType="go"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    ref={(input) => {
                        this.passWordInput= input;
                    }}
                    onSubmitEditing={()=> {
                        this.props.onSubmit(this.email, this.password);
                    }}
                    onChangeText={(password) => {
                        this.password = password;
                        this.props.callback(this.email, this.password)
                    }}/>

            </View>
        );
    }

}
