import React, { Component } from "react";
import {StatusBar, View, Text, StyleSheet, Button, Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import User from '../../actors/User';
import Ride from '../../actors/Ride';
import Area from '../../actors/Area';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
import CreateArea from '../CreateRideScreen/CreateArea';
import { getTheme } from '../../Utility';
import Database from '../../Database';

var i = 0;

//Main component for driver screen
export default class RequestRideScreen extends Component {

    static driver_this = null;

    constructor(props) {
        super(props);
        driver_this = this;

        driver_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };

        getTheme(function(theme) {
            driver_this.setState({
                color_theme: theme
            });
        });
    }

    //Render driver screen tab icon and top bar.
    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="ios-car" style={{ color: tintColor, fontSize: 20  }} />
        )
    };

    //Called when component is mounted.
    componentDidMount(){
        this.getTestRide();
    }


    //Get user's first ride from database.
    getTestRide() {
        //console.log("DriverTest: ", User.currentUser);
        let id = Object.keys(User.currentUser.rides)[0];
        Database.getRide(id, (ride) => {
            console.log(ride);
        });
    }

    //Render the component
    render() {

        const customStyle = {

            topBar: [styles.topBar, {
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: driver_this.state.color_theme.APP_BACKGROUND
            }],

            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: driver_this.state.color_theme.APP_FOCUS
            }],
            backArrow: [styles.backArrow, {
                fontSize: DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,
                color: driver_this.state.color_theme.APP_FOCUS
            }],

        };

        let statusTheme = (driver_this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content": "light-content";

        return (
            <View style = {styles.container}>

                <StatusBar barStyle={statusTheme}/>
                <View style={customStyle.topBar}>
                    {
                        (Platform.OS === 'ios') ?
                            <Ionicons

                                name='ios-arrow-back'
                                style={customStyle.backArrow}
                                onPress={() => {
                                    this.props.navigation.goBack(null);
                                }}/>
                            : null
                    }

                    <Text style={customStyle.title}>Request Ride</Text>
                </View>

                <CreateArea color_theme={driver_this.state.color_theme}/>


            </View>
        );
    }
}

//Style sheet for driver main screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    backArrow: {
        paddingLeft: 25,
        paddingTop: null,
        fontSize: null,
        color: null,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null
    },
    title: {
        color: null,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        fontSize: null,
        paddingTop: null
    }
});
