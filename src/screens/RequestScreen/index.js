import React, { Component } from "react";
import {StatusBar, View, Text, StyleSheet, Button, Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import User from '../../actors/User';
import Ride from '../../actors/Ride';
import Area from '../../actors/Area';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {COLOR, DIMENSION, FIREBASE} from '../../Constants';
import RequestArea from './RequestArea';
import {createRide, getTheme} from '../../Utility';
import Database from '../../Database';
import Spinner from '../../components/Spinner';
import {extractCity} from "../../Utility";

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

                <RequestArea

                    originTag={'Set Pick-Up Location'}
                    destinationTag={'Set Drop-Off Location'}
                    color_theme={driver_this.state.color_theme}
                    onSubmit={(searchInputs, chosenDate, chosenSeats, description, price) => {
                        this.spinner.show(true);
                        createRide(FIREBASE.REQUESTS_PATH, searchInputs,chosenDate, chosenSeats, description, price, (successful) => {
                            if(successful) {
                                this.props.navigation.goBack(null);
                                this.spinner.show(false);
                            }
                            else{
                                this.spinner.show(false)
                            }
                        });
                    }}/>

                <Spinner ref={(instance) => this.spinner = instance}/>

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
