import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import NewUserScreen from './src/screens/NewUserScreen'
import { YellowBox } from 'react-native';
import * as firebase from 'firebase';
import {LogInBackgroundImage} from "./src/components/Background/BackgroundImage";
import User from "./src/actors/User";
import {FIREDIR_USERS} from "./src/Constants";

//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            loggedIn: false,
            loaded: false
        });
    }

    componentDidMount(){

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                firebase.database().ref(FIREDIR_USERS + '/' + user.uid).once('value').then(snapshot => {
                    //If the snapshot value exists then we create a new user object and assign it. Else we create a reference in Firebase and return a new user.
                    User.currentUser = (snapshot.val() != null) ? new User(snapshot.val(), !User.isFB) : this.storeNewUser(user);


                    //Debug purpose

                   // console.log("CurUser: ", User.currentUser);
                    //Now, do something with user object User.currentUser

                    //NEEDED TO NOT GET CAUGHT IN BACKGROUND SCREEN
                    this.setState({loaded: true
                    });
                    this.setState(oldState =>{
                       return {loggedIn:!oldState.loggedIn}
                    });

                });
            }
            else{
                //DO NOT CHANGE THIS NEEDED FOR LOGOUT
                this.setState({
                    loaded: true,
                    loggedIn: false,
                });
            }
        });
    }

    storeNewUser(fbUser) {
        let newUser = new User(fbUser, User.isFB);
        firebase.database().ref(FIREDIR_USERS + '/' + newUser.id).set(newUser);
        return newUser;
    }

    render() {
        //console.log(User.currentUser);
        //console.log(this.state.loaded);
        if (!this.state.loaded) {
            //console.log("Not Loaded");
            return (
                <LogInBackgroundImage/>
            );
        }
        else {
            //console.log(this.state.loaded);
            if (this.state.loggedIn && User.currentUser != null) {
                console.log("Logged in");
                return (
                    <LoggedInStack/>
                );
            }
            console.log("Not Logged in");
            return <LoggedOutStack/>
        }
    }


}

const LoggedOutStack = StackNavigator({
    Login: {screen: NewUserScreen},
    Main: {screen: MainScreen}
}, {
    initialRouteName: "Login",
});

const LoggedInStack = StackNavigator({
    Login: {screen: NewUserScreen},
    Main: {screen: MainScreen},
}, {
    initialRouteName: "Main",
});
