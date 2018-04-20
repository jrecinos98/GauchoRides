import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Button , TextInput, Image, KeyboardAvoidingView, Alert } from "react-native";
import * as firebase from 'firebase';
import {LoginForm} from "./LogInScreen/LoginForm";
import {LogInBackgroundImage} from "../components/Background/BackgroundImage"
import {LoginButtons} from "./LogInScreen/LoginButtons";
import {COLOR_APP_BACKGROUND, COLOR_APP_BACKGROUND_OPAQUE, COLOR_APP_FOCUS, COLOR_APP_LOGIN_TITLE, FIREDIR_USERS} from "../Constants";
import User from '../actors/User'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const firebaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

firebase.initializeApp(firebaseConfig);


export default class NewUserScreen extends Component {

    constructor(props){
        super(props);

        this.state=({
            email: "",
            password: ""
        })

    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {

            if(user != null) {

                firebase.database().ref(FIREDIR_USERS + '/' + user.uid).once('value').then(snapshot => {

                    //Either login or signup if logged into facebook
                    User.currentUser = (snapshot.val() != null) ? new User(snapshot.val(), false) : this.storeNewUser(user);

                    //Debug purpose
                    Alert.alert(User.currentUser.name, "You have logged in!");
                    console.log("CurUser: ", User.currentUser);

                    //Now, do something with user object User.currentUser
                    this.props.navigation.navigate('Main', {name: "MainScreen"});
                });
            }
            else {
                alert("Facebook account not found.");
            }

        });
    }

    storeNewUser(fbUser) {
        let newUser = new User(fbUser, true);
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
        title: "Welcome, Gaucho",
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
        return (
            <LogInBackgroundImage>
                <LoginForm/>
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

                <KeyboardAvoidingView behavior="padding" style={styles.buttonContainer}>
                    <Button
                        style={styles.buttonStyle}
                        title="Launch Main Screen"
                        onPress={() => {
                            navigate('Main', {name: "MainScreen"})
                            console.log("hi");
                        }}>
                        <Text style={{color: 'white'}}>Launch MainScreen </Text>
                    </Button>

                </KeyboardAvoidingView>
            </LogInBackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        marginBottom: 10,
        alignItems: undefined,

    },
    buttonContainer: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 50,
        marginBottom: 0,
        backgroundColor: COLOR_APP_BACKGROUND_OPAQUE,
        borderRadius: 10,
        padding: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
    },
    buttonStyle: {
        marginTop: 100,
        marginBottom: 5
    },
    cardContainer: {
        flex: 1,

        opacity: 0.5,

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