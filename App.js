
//import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import NewUserScreen from './src/screens/NewUserScreen'
import { YellowBox } from 'react-native';
import * as fireBase from 'firebase';

import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);


//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

export default class App extends React.Component {
    constructor(prop){
        super(prop);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentDidMount(){
        isSignedIn()
            .then(res =>
                this.setState({ signedIn: res, checkedSignIn: true }),
            )
            .catch(err => alert("An error occurred"));
    }/*
    componentDidMount(){
        fireBase.auth().onAuthStateChanged((user) => {
            if(user != null){
                //this.setState({signedIn: true, checkedSignIn:true });
                alert("You have already registered.");
                console.log(user)
            }

        })
    }*/

    render() {
      const {checkedSignIn, signedIn} = this.state;
        if (!checkedSignIn) {
            return null;
        }
      if(!signedIn){
          return(<SignedOutStackNavigator/>);
      }
      else {
          return (
              <LogInStackNavigator/>
          );
      }
  }

}
export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};

const SignedOutStackNavigator = StackNavigator({
    Login: {screen: NewUserScreen},
    Main: {
        screen: MainScreen
    },
}, {
    initialRouteName: "Login",
});
const LogInStackNavigator = StackNavigator({
    Main: {
        screen: MainScreen
    },
});






//Expo.registerRootComponent(App);
