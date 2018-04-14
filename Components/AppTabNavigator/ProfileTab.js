import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import * as fireBase from 'firebase'
import {Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

const fireBaseConfig = {

    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",

};

fireBase.initializeApp(fireBaseConfig);


class ProfileTab extends React.Component{
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
                console.log(user)
            }

        })
    }
    signUpUser= (email, password) => {
        try{
            if(this.state.password.length < 6){
                alert("Please enter at least 6 characters");
                return;
            }
            fireBase.auth().createUserWithEmailAndPassword(email,password).then(function(user){

            })
        }
        catch(error){
           // console.log(error.toString())
        }
    };
    logInUser = (email,password) => {
        try{
            fireBase.auth().signInWithEmailAndPassword(email,password).then(function (user){
               console.log(user)
               alert("Login successful.")
            })
        }
        catch(error){
            alert("An error occurred please try again. Make sure you use a verified email and password.")
            //console.log(error.toString())
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
                        onChangeText={(email)=> this.setState({email})}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        onChangeText={(password)=> this.setState({password})}
                    />
                </Item>


                <Button style={ {marginTop: 10, height:50, width: 100} }
                        full
                        // rounded
                        success
                        onPress={()=> this.logInUser(this.state.email, this.state.password)}
                >
                    <Text style={{color: 'white'}}>Login</Text>
                </Button >
                <Button style={ {marginTop: 10, height: 50, width: 100} }
                        full
                        // rounded
                        success
                        onPress={()=> this.signUpUser(this.state.email, this.state.password)}
                >
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </Button>
                <Button style={ {marginTop: 10, height: 50, width: 100} }
                        full
                        // rounded
                        success
                        onPress={()=> this.loginWithFacebook()}
                >
                    <Text style={{color: 'white'}}>Login with Facebook</Text>
                </Button>
			</View>
			);
	}
}

export default ProfileTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})