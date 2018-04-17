import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as fireBase from 'firebase';


const fireBaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

fireBase.initializeApp(fireBaseConfig);


export default class ProfileMain extends React.Component {

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
                alert("You have already registered.")
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
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="ios-contact-outline" style={{ color: tintColor }} />
		)

	};

	async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
        ('615345508804840', {permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            const credential = fireBase.auth.FacebookAuthProvider.credential(token);
            fireBase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error);
            })
        }
    }

	render(){
		return(
			<View style = {styles.container}>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        onChangeText={(email)=> this.setState({email})}/>
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        onChangeText={(password)=> this.setState({password})}/>
                </Item>
                <Button style={ {marginTop: 10, height:50, width: 100} }
                        full
                        success
                        onPress={()=> this.logInUser(this.state.email, this.state.password)}>
                    <Text style={{color: 'white'}}>Login</Text>
                </Button>
                <Button style={ {marginTop: 10, height: 50, width: 100} }
                        full
                        success
                        onPress={()=> this.signUpUser(this.state.email, this.state.password)}>
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </Button>
                <Button style={ {marginTop: 10, height: 50, width: 100} }
                        full
                        success
                        onPress={()=> this.loginWithFacebook()}>
                    <Text style={{color: 'white'}}>Login with Facebook</Text>
                </Button>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}

    //backgroundImage: {
    //    flex: 1,
    //    alignSelf: 'stretch',
    //    width: null,
    //    justifyContent: 'center'
    //}




})
