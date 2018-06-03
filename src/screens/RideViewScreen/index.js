import React, { Component } from "react";
import{ View, StyleSheet, StatusBar, Platform, Text, TouchableOpacity,
        ScrollView, Dimensions, Modal, AsyncStorage, Image } from "react-native";
import { COLOR, STRING, FIREBASE } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import CenterText from "../../components/CenterText";
import Database from '../../Database';
import Utility from '../../Utility';
import WheelRating from '../../components/WheelRating';
import OpacityButton from '../../components/OpacityButton';
import User from '../../actors/User';


export default class RideViewScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            color_theme: COLOR.THEME_LIGHT,
            driver: {},
            riders: []
        };

        const rideview_this = this;
        let ride = this.props.navigation.state.params.ride;

        Utility.getTheme(function(app_theme) {
            rideview_this.setState({
                color_theme: app_theme
            });
        });

        Database.getUser(ride.driver, (driver) => {
            this.setState({
                driver: driver
            });
        });

        Database.getUserList(ride.passengers, (riders) => {
            console.log('ending');
            this.setState({
                riders: riders
            });
        });
    }

    registerRide(ride, user) {
        ride.passengers.push(user.id);
        user.rides[ride.id] = 'passenger';
        Database.updateRide(FIREBASE.RIDES_PATH, ride);
        Database.updateUser(user);
        this.props.navigation.goBack(null);
    }

    getConfirmButton(ride, user, customStyle) {
        if (ride.driver === User.currentUser.id)
            return (
                <CenterText style={customStyle.titleText}>
                    You are the driver!
                </CenterText>
            );

        else if (ride.passengers.includes(User.currentUser.id))
            return (
                <CenterText style={customStyle.titleText}>
                    You already registered!
                </CenterText>
            );

        else
            return (
                <OpacityButton
                    title={"Confirm Ride!"}
                    callback={() => {
                        this.registerRide(ride, User.currentUser);
                    }}
                />
            );
    }

    render(){

        const customStyle = {
            buttonClose: [styles.buttonClose, {
                color: this.state.color_theme.APP_FOCUS
            }],
            titleText: [styles.titleText, {
                color: this.state.color_theme.APP_FOCUS
            }],
            container: [styles.container, {
                backgroundColor: this.state.color_theme.APP_BACKGROUND
            }]
        };

        let ride = this.props.navigation.state.params.ride;
        let driver = this.state.driver;
        let riders = this.state.riders;

        return(
            <ScrollView style={customStyle.container}>

                <View style={styles.titleBar}>
                    <Ionicons
                        name="ios-close"
                        style={customStyle.buttonClose}
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}/>
                    <CenterText style={customStyle.titleText}> Ride Information </CenterText>
                </View>


                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={{uri: 'https://graph.facebook.com/' + driver.fbID + '/picture?type=large'}}
                        borderRadius={50}
                        style={styles.driverImage}/>

                    <View style={styles.driverTextWrapper}>
                        <Text style={customStyle.titleText}>
                            {driver.name}
                        </Text>
                        <WheelRating/>
                    </View>
                </View>

                <CenterText style={customStyle.titleText}> Origin: {ride.origin.name}</CenterText>
                <CenterText style={customStyle.titleText}> Destination: {ride.destination.name}</CenterText>
                <CenterText style={customStyle.titleText}> Seats: {ride.seats}</CenterText>
                <CenterText style={customStyle.titleText}> Time: {Utility.formatDate(new Date(ride.time * 1000))}</CenterText>
                <CenterText style={customStyle.titleText}> Price: {ride.price}</CenterText>

                {this.getConfirmButton(ride, User.currentUser, customStyle)}

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: null,
        flex: 1,
        padding: 20,
    },
    buttonClose: {
        color: null,
        fontSize: 50,
        width: 100
    },
    titleBar: {
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 20,
        color: null
    },
    driverTextWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    driverImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 5
    }
});
