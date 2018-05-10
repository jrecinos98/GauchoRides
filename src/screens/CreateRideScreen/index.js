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
import SearchArea2 from './SearchArea2';
import { getTheme } from '../../Utility';
import Database from '../../Database';

var i = 0;

//Main component for driver screen
export default class CreateRideScreen extends Component {

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

	//Create a sample test ride on Database.
	createTestRide(index) {
		let ride = new Ride(
			0,
			"Test Ride" + index,
			5,
			User.currentUser.id,
			{1000: true, 100: true},
			Math.floor(new Date() / 1000),
			new Area(34.4133, -119.8610, 1, "Goleta"),
			new Area(37.338208, -121.886329, 5, "Oak Park")
		);

		Database.createRide(ride);
	}

	//Get user's first ride from Database.
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

        let statusTheme = (driver_this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content" : "light-content";

        return (
            <View style={styles.container}>

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
                    <Text style={customStyle.title}>Create Ride</Text>
                </View>

                <SearchArea2 color_theme={driver_this.state.color_theme}/>

                <Button onPress={() => this.createTestRide(i++)} title="Create Test Ride On Database"> </Button>

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
