import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Main from './src/screens/Main'
import LogInScreen from './src/screens/LogInScreen'
import { YellowBox } from 'react-native';
import LoginBackground from "./src/components/LoginBackground";
import User from "./src/actors/User";
import Database from './src/Database';

//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);


/**
 * Initialize Database
 */
Database.initialize();

/**
 * Main class in project. It serves as the entry point of the app.Authentication is performed here and the user is sent to Login Screen if not authenticated or the Main Stack otherwise.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            loggedIn: false,
            loaded: false
        });
    }

    componentDidMount(){

        // Called every time database authentication is changed (login or logout)
        Database.onAuthChanged((user) => {

            if (user != null) {
                Database.getUser(user.uid, (dbUser) => {

                    // If user doesn't exist, we create a reference in database and retrieve the new user.
                    if (dbUser == null)
                        this.createNewUser(user);

                    // Otherwise, we initialize a local user object for current user.
                    else
                        User.currentUser = new User(dbUser, !User.newUserFromFB);

                    //NEEDED TO NOT GET CAUGHT IN BACKGROUND SCREEN
                    this.setState({
                        loaded: true,
                        loggedIn: true,
                    });

                });
            }
            else {
                //DO NOT CHANGE THIS NEEDED FOR LOGOUT
                this.setState({
                    loaded: true,
                    loggedIn: false,
                });
                User.currentUser = null;
            }
        });

    }

    /**
     * If user does not exist create it on Firebase
     * @param fbUser
     */
    createNewUser(fbUser) {

        let newUser = new User(fbUser, User.newUserFromFB);
        User.currentUser = newUser;
        Database.createUser(newUser);
    }

    render() {
        if (!this.state.loaded) {
            return (
                <LoginBackground/>
            );
        }
        else {

            if (this.state.loggedIn ) {

                return (
                    <RootStack/>
                );
            }
            return <LogInScreen/>
        }
    }


}
const RootStack = StackNavigator({
    Main: {screen: Main},
}, {
    initialRouteName: "Main",
});

