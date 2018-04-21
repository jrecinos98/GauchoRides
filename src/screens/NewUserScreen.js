import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Button , TextInput, Image, KeyboardAvoidingView, Alert } from "react-native";
import * as firebase from 'firebase';
import {LoginForm} from "./LogInScreen/LoginForm";
import {LogInBackgroundImage} from "../components/Background/BackgroundImage"
import {LoginButtons} from "./LogInScreen/LoginButtons";
import {COLOR_APP_BACKGROUND, COLOR_APP_BACKGROUND_OPAQUE, COLOR_APP_FOCUS, COLOR_APP_LOGIN_TITLE, FIREDIR_USERS} from "../Constants";

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

import User from '../actors/User';
import Ride from '../actors/Ride';
import Area from '../actors/Area';
import { NavigationActions } from 'react-navigation'


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

firebase.initializeApp(firebaseConfig);


const wipeLogin = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main'})
    ]
});


export default class NewUserScreen extends Component {

    constructor(props){
        super(props);

        this.state=({
            email: "",
            password: "",
            newUser: false,
            loggedIn: false
        });
    }


    //For the transition to be smooth
    componentDidMount(){

        firebase.auth().onAuthStateChanged((user) => {

            if (user != null) {
                //Needed to make it display background image with loading.
                this.setState({loggedIn: true});
                //Retrieves the data (a snapshot) from firebase once and assigns it to User.currentUser
                firebase.database().ref(FIREDIR_USERS + '/' + user.uid).once('value').then(snapshot => {

                    //If the snapshot value exists then we create a new user object and assign it. Else we create a reference in Firebase and return a new user.
                    User.currentUser = (snapshot.val() != null) ? new User(snapshot.val(), !User.isFB) : this.storeNewUser(user);

                   // this.props.navigation.dispatch(wipeLogin);
                    console.log("TO MAIN");

                    this.props.navigation.navigate('Main');
                });

            }

        });
    }


    //Creates a new user in Firebase. (For now they can only be Facebook users)
    storeNewUser(fbUser) {
        let newUser = new User(fbUser, User.isFB);
        firebase.database().ref(FIREDIR_USERS + '/' + newUser.id).set(newUser);
        return newUser;
    }

    signUpUser= (email, password) => {
        try {
            if (email === "" || password === "") {
                alert("enter valid email and password.")
            }
            else if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters");
                return;
            }
            if(email !== "" && password !== "") {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(fbUser){
                    User.currentUser = this.storeNewUser(fbUser);
                });
            }
        }
        catch(error){
            console.log(error.toString())
        }
    };

    logInUser = (email,password) => {
        if(email !== "") {
            try {
                firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                    console.log(user);
                    alert("Login successful.")
                })
            }
            catch (error) {
                alert("An error occurred please try again. Make sure you use a verified email and password.")
                //console.log(error.toString())
            }
        }
        else{
            alert("Please enter a registered emailed and password.")
        }
    };

    static navigationOptions = {
        title:"Welcome",
        headerStyle: {
            backgroundColor: COLOR_APP_BACKGROUND
        },
        headerTitleStyle: {
            color: COLOR_APP_LOGIN_TITLE,
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            fontWeight: 'normal'
        },

    };

    //Log in user with facebook
    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
        ('615345508804840', {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        if(this.state.loggedIn){
            return <LogInBackgroundImage/>
        }
        return (
            <LogInBackgroundImage>
                <LoginForm/>
                <KeyboardAvoidingView behavior="padding">
                    <View style={loginStyle.buttonContainer}>
                        <LoginButtons
                            title="LOGIN"
                            callback={() => {
                                this.logInUser(this.state.email, this.state.password);
                            }}/>

                        <LoginButtons
                            title="CONTINUE WITH FACEBOOK"
                            callback={() => {
                                this.loginWithFacebook();
                            }}/>
                        <Text style={loginStyle.signUpText}>Don't have an account? Sign Up</Text>
                    </View>
                </KeyboardAvoidingView>
            </LogInBackgroundImage>
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
        paddingBottom: 100
    }

});


/*
   <Button
                            style={styles.buttonStyle}
                            title="Continue with Facebook"
                            onPress={() => this.loginWithFacebook()}>
                            <Text style={{color: 'white'}}>Continue with Facebook</Text>
                        </Button>


                        <Button
                            style={styles.buttonStyle}
                            title="Login with umail account"
                            onPress={() => this.logInUser(this.state.email, this.state.password)}>
                            <Text style={{color: 'white'}}>Login</Text>
                        </Button>


                        <Button
                            style={styles.buttonStyle}
                            title="Sign Up"
                            onPress={() => this.signUpUser(this.state.email, this.state.password)}>
                            <Image source={require("../../public/assets/facebook_button.png") } >
                            <Text style={{color: 'white'}}>Sign Up</Text>
                            </Image>

                        </Button>
 */