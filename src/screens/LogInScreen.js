import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Button , TextInput, Image, KeyboardAvoidingView, Alert, YellowBox } from "react-native";
import Constants from "../Constants";
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import LoginForm from "../components/LoginForm";
import LoginBackground from "../components/LoginBackground";
import OpacityButton from "../components/OpacityButton";
import Database from '../Database';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

/**
 * New or un-authenticated users are greeted with this screen. It allows users to log-in with facebook or with a .edu email.
 */
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
                window.alert("A .edu mail is required for this app.")
                return
            }
            if (email === "" || password === "") {
                window.alert("Enter valid email and password.")
                return
            }
            else if (this.state.password.length < 6) {
                window.alert("Please enter at least 6 characters");
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
            window.alert("Please enter a registered emailed and password.")
        }
    };

    static navigationOptions = {
        title:"Welcome",
        headerStyle: {
            backgroundColor: Constants.COLOR.THEME_DARK.APP_BACKGROUND
        },
        headerTitleStyle: {
            color: Constants.COLOR.THEME_DARK.APP_TITLE_LOGIN,
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
                        <OpacityButton
                            title="LOGIN"
                            callback={() => {
                                this.logInUser(this.state.email, this.state.password);
                            }}/>
                        <OpacityButton
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