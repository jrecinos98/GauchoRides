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
import CreateArea from './CreateArea';
import { getTheme } from '../../Utility';
import Database from '../../Database';

import {extractCity} from "../../Utility";

const APIKEY = 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw';
const mode = 'driving'; // 'walking';


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

				<CreateArea
					color_theme={driver_this.state.color_theme}
					onSubmit={async (searchInputs, chosenDate) => {
						if (searchInputs === undefined || searchInputs.pickupInput === undefined || searchInputs.dropoffInput === undefined)
                            return;
                        var ORIGIN = searchInputs.pickupInput;
                        var DESTINATION = searchInputs.dropoffInput;
                        let originLatLon = {};
                        let destLatLon = {};
                        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ORIGIN}&key=${APIKEY}`)
                            .then(response => response.json())
                            .then(async responseJson => {
                                originLatLon = responseJson.results[0].geometry.location;
                                await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${DESTINATION}&key=${APIKEY}`)
                                    .then(response => response.json())
                                    .then(async responseJson => {
                                        destLatLon = responseJson.results[0].geometry.location;
                                    });
                            });

                        //console.log("Origin: ", originLatLon.lat);
                        //console.log("Destination: ", destLatLon);

                        let ride = new Ride(
                            0,
                            "My Ride",
                            5,
                            User.currentUser.id,
                            [],
                            Math.floor(chosenDate / 1000),
							new Area(originLatLon.lat, originLatLon.lng, 5, searchInputs.pickupInput),
							new Area(destLatLon.lat, destLatLon.lng, 5, searchInputs.dropoffInput)
						);

						let pickupCity = extractCity(searchInputs.pickupInput);
						let dropoffCity = extractCity(searchInputs.dropoffInput);
						Database.createRide(ride, pickupCity, dropoffCity);

						this.props.navigation.goBack(null);
					}}/>

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
