import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import * as firebase from 'firebase';
import User from '../../actors/User';
import Ride from '../../actors/Ride';
import Area from '../../actors/Area';
import { FIREDIR_RIDES, FIREDIR_USERS } from "../../Constants";


export default class DriverMain extends Component {

	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="ios-car" style={{ color: tintColor, fontSize: 20  }}  />
		)
	}

	componentDidMount(){
		this.getTestRide();
	}

	createTestRide() {
		let ride = new Ride(
			0,
			"Awesome Ride",
			"Really Really Awesome Ride",
			0,
			User.currentUser.id,
			{1000: true, 100: true},
			12410392,
			new Area(89.0, 111.0, 1),
			new Area(12.0, 333.0, 5)
		);

		//Store to firebase
		var newRide = firebase.database().ref(FIREDIR_RIDES + '/').push(ride);

		//Update driver information on firebase
		User.currentUser.rides[newRide.key] = 'driver';
		firebase.database().ref(FIREDIR_USERS + '/' + User.currentUser.id).set(User.currentUser);

		this.getTestRide();
	}

	getTestRide() {
		let key = Object.keys(User.currentUser.rides)[0];
		firebase.database().ref(FIREDIR_RIDES + '/' + key).once('value').then(snapshot => {
			console.log(snapshot.val());
		});
	}


	render() {
		return (
			<View style = {styles.container}>
				<Text>Driver</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
