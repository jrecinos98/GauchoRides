import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Button , TextInput, Image} from "react-native";
import {Input, Item, Label, Card } from 'native-base';
import * as fireBase from 'firebase';
import {COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_LOGIN_TITLE} from "../Constants";


const fireBaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

fireBase.initializeApp(fireBaseConfig);


export default class NewUserScreen extends Component {

    constructor(props){
        super(props);

        this.state=({
            email: "",
            password: ""
        })

    }

    componentDidMount(){
        fireBase.auth().onAuthStateChanged((user) => {
            if(user != null){
                //alert("You have already registered.")
                console.log(user)
            }

        })
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
                fireBase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                    console.log(user);
                })
            }
        }
        catch(error){
            console.log(error.toString())
        }
    };

    logInUser = (email,password) => {
        if(email !== "") {
            try {
                fireBase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
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
            const credential = fireBase.auth.FacebookAuthProvider.credential(token);
            fireBase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <BackgroundImage>
                <View style={styles.container}>

                    <Item floatingLabel>
                        <Label style={{color: 'white'}}>Email</Label>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            onChangeText={(email) => this.setState({email})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label style={{color: 'white'}}>Password</Label>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            onChangeText={(password) => this.setState({password})}/>
                    </Item>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.buttonStyle}
                            title="Launch Main Screen"
                            onPress={() =>
                                navigate('Main', {name: "MainScreen"})}>
                            <Text style={{color: 'white'}}>Launch MainScreen </Text>
                        </Button>
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





                    </View>
                </View>
            </BackgroundImage>
        );
    }
}

class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground source={require("../../public/assets/ucsb_background.jpg")}
                             style={styles.backgroundImage}
                //imageStyle is used because we only want to apply the stretch to the image
                // not the entire view hierarchy
                             imageStyle={{resizeMode: 'stretch'}}
            >

                {this.props.children}

            </ImageBackground>
        )
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
        marginTop: 10,
        marginBottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLOR_APP_BACKGROUND,
        opacity: 0.6,
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
        marginTop: 5,
        marginBottom: 5
    },
    backgroundImage: {
        flex: 1,
        //alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    cardContainer: {
        flex: 1,

        opacity: 0.5,

    }


});
