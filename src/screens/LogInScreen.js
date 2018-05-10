import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Button , TextInput, Image, KeyboardAvoidingView, Alert, YellowBox } from "react-native";
import { COLOR } from "../Constants";
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import User from '../actors/User';
import Ride from '../actors/Ride';
import Area from '../actors/Area';
import LoginForm from "../components/LoginForm";
import LoginBackground from "../components/LoginBackground";
import LoginButton from "../components/LoginButton";
import Database from '../Database';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class LogInScreen extends Component {

    constructor(props){
        super(props);

        this.state=({
            email: "",
            password: "",
            newUser: false,
            loggedIn: false
        });
    }

    signUpUser= (email, password) => {
        try {
            if (!email.includes('.edu')){
                alert("A .edu mail is required for this app.")
                return
            }
            if (email === "" || password === "") {
                alert("Enter valid email and password.")
                return
            }
            else if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters");
                return;
            }
            if(email !== "" && password !== "") {
                Database.signupWithEmail(email, password);
            }

        }
        catch(error){
            console.log(error.toString())
        }
    };

    logInUser = (email,password) => {
        if(email !== "") {
            Database.loginWithEmail(email, password);
        }
        else{
            alert("Please enter a registered emailed and password.")
        }
    };

    static navigationOptions = {
        title:"Welcome",
        headerStyle: {
            backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND
        },
        headerTitleStyle: {
            color: COLOR.THEME_DARK.APP_TITLE_LOGIN,
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            fontWeight: 'normal'
        },

    };

    render() {
        //const {navigate} = this.props.navigation;
        if(this.state.loggedIn){
            return <LoginBackground/>
        }
        return (
            <LoginBackground>
                <LoginForm
                    callback= {(email, password) => {
                        this.setState({
                            email: email,
                            password: password
                        });
                    }}
                    onSubmit= {(email, password) => {
                        this.logInUser(email, password);
                    }}
                    />

                <KeyboardAvoidingView behavior="padding">
                    <View style={loginStyle.buttonContainer}>
                        <LoginButton
                            title="LOGIN"
                            callback={() => {
                                this.logInUser(this.state.email, this.state.password);
                            }}/>
                        <LoginButton
                            title="CONTINUE WITH FACEBOOK"
                            callback={() => {
                                Database.loginWithFacebook();
                            }}/>
                        <Text
                            style={loginStyle.signUpText}
                            onPress={() => {
                                this.signUpUser(this.state.email, this.state.password);
                            }}>
                            Don't have an account? Sign Up
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </LoginBackground>
        );
    }
}

const loginStyle= StyleSheet.create({
    signUpText:{
        color:'white',
        textShadowColor:'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center'
    },
    buttonContainer:{
        paddingTop: 30,
        //paddingBottom: 100
        justifyContent: "center"

    }

});