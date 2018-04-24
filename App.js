import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import NewUserScreen from './src/screens/NewUserScreen'
import { YellowBox } from 'react-native';
import * as firebase from 'firebase';
import LoginBackground from "./src/components/LoginBackground";
import User from "./src/actors/User";
import {FIREDIR_USERS} from "./src/Constants";

//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            loggedIn: false,
            loaded: false
        });
    }

    componentDidMount(){

        // Called everytime firebase authentication is changed (login or logout)
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                firebase.database().ref(FIREDIR_USERS + '/' + user.uid).once('value').then(snapshot => {
                    
                    // If user doesn't exist, we create a reference in Firebase and retrieve the new user.
                    // Otherwise, we initialize a local user object for current user.
                    if (snapshot.val() == null)
                        this.createNewUser(user);
                    else
                        User.currentUser = new User(snapshot.val(), !User.isFB);

                    //NEEDED TO NOT GET CAUGHT IN BACKGROUND SCREEN
                    this.setState({
                        loaded: true,
                        loggedIn: true,
                    });

                });
            }
            else {

                //DO NOT CHANGE THIS NEEDED FOR LOGOUT
                console.log("Component Called\n");
                this.setState({
                    loaded: true,
                    loggedIn: false,
                });
                User.currentUser = null;
            }
        });

    }

    createNewUser(fbUser) {
        let newUser = new User(fbUser, User.isFB);
        firebase.database().ref(FIREDIR_USERS + '/' + newUser.id).set(newUser);
        User.currentUser = newUser;
    }

    render() {
        if (!this.state.loaded) {
            //console.log("Not Loaded");
            return (
                <LoginBackground/>
            );
        }
        else {
            //console.log(this.state.loaded);
            if (this.state.loggedIn ) {
                console.log(User.currentUser);
                console.log("Logged in: "+ this.state.loggedIn );
                return (
                    <LoggedInStack/>
                );
            }
            console.log("Not Logged in");
            return <NewUserScreen/>
        }
    }


}

const LoggedInStack = StackNavigator({
    //Login: {screen: NewUserScreen},
    Main: {screen: MainScreen},
}, {
    initialRouteName: "Main",
});
