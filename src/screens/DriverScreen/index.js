import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import * as firebase from 'firebase';
import User from '../../actors/User';
import Ride from '../../actors/Ride';
import Area from '../../actors/Area';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR, FIREBASE } from '../../Constants';
import SearchArea2 from './SearchArea2';
import { getTheme } from '../../Utility';

//Main component for driver screen
export default class DriverScreen extends Component {

	static driver_this = null;

	constructor(props) {
		super(props);
		driver_this = this;

		driver_this.state = {
			color_theme: COLOR.THEME_LIGHT
		}

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

	//Create a sample test ride on firebase.
	createTestRide() {
		let ride = new Ride(
			0,
			"Really Really Awesome Ride",
			0,
			User.currentUser.id,
			{1000: true, 100: true},
			12410392,
			new Area(89.0, 111.0, 1),
			new Area(12.0, 333.0, 5)
		);

		//Store to firebase
		var newRide = firebase.database().ref(FIREBASE.RIDES_PATH + '/').push(ride);

		//Update driver information on firebase
		User.currentUser.rides[newRide.key] = 'driver';
		firebase.database().ref(FIREBASE.USERS_PATH + '/' + User.currentUser.id).set(User.currentUser);

		this.getTestRide();
	}

	//Get user's first ride from firebase.
	getTestRide() {
		//console.log("DriverTest: ", User.currentUser);
		let key = Object.keys(User.currentUser.rides)[0];
		firebase.database().ref(FIREBASE.RIDES_PATH + '/' + key).once('value').then(snapshot => {
			//console.log(snapshot.val());
		});
	}

	//Render the component
	render() {

		const customStyle = {

			topBar: [styles.topBar, {
				backgroundColor: driver_this.state.color_theme.APP_BACKGROUND
			}],

			title: [styles.title, {
				color: driver_this.state.color_theme.APP_FOCUS
			}]

		};

		return (
			<View style = {styles.container}>

				<StatusBar hidden={true}/>

				<View style={customStyle.topBar}/>

				<Text style={customStyle.title}>Driver</Text>

				<SearchArea2/>

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
	topBar: {
		backgroundColor: null,
		alignSelf: 'stretch',
		height: 50
	},
	title: {
		color: null,
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		fontSize: 20,
		paddingTop: 15
	}
});
