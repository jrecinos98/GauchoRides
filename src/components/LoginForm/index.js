import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { COLOR } from "../../Constants";

export default class LoginForm extends Component {

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

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND_OPAQUE,
        //alignItems: 'center',
        //justifyContent: 'center',
        //justifyContent: 'space-between'
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginTop:10,
        color: '#FFF',
        paddingHorizontal: 10
    }
});
