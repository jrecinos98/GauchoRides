import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
import styles from "./LoginStyle"

export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            email: "",
            password: ""
        })

    }

    render() {
        return (
            <View style={styles.textContainer}>
                <TextInput style={styles.input}
                           keyboardType="email-address"
                           placeholder="Email"
                           placeholderTextColor='white'
                           returnKeyType="next"
                           autoCorrect={false}
                           autoCapitalize={"none"}
                           onSubmitEditing={()=> this.passWordInput.focus()}
                           onChangeText={(email) => this.setState({email})}/>

                <TextInput style={styles.input}
                           placeholder="Password"
                           placeholderTextColor='white'
                           returnKeyType="go"
                           secureTextEntry={true}
                           autoCorrect={false}
                           autoCapitalize={"none"}
                           ref={(input) => this.passWordInput= input}
                           onChangeText={(password) => this.setState({password})}/>

            </View>
        );
    }

}
