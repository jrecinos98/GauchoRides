import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import * as firebase from 'firebase';
import User from '../../actors/User';
import Ride from '../../actors/Ride';
import Area from '../../actors/Area';
import { FIREDIR_RIDES, FIREDIR_USERS } from "../../Constants";
import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';


//Main component for driver screen
class DriverMain extends Component {

	//Render driver screen tab icon and top bar.
	static navigationOptions = ({ navigation }) => {

        return {
            tabBarIcon: ({ tintColor}) => (
				<Ionicons name="ios-car" style={{ color: tintColor, fontSize: 20  }} />
			),
            title: 'Driver',
            headerStyle: {
				backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
				color: COLOR_APP_TITLE,
				textAlign: 'center',
				alignSelf: 'center',
				flex: 1,
				fontWeight: 'normal'
            }
        };
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
		var newRide = firebase.database().ref(FIREDIR_RIDES + '/').push(ride);

		//Update driver information on firebase
		User.currentUser.rides[newRide.key] = 'driver';
		firebase.database().ref(FIREDIR_USERS + '/' + User.currentUser.id).set(User.currentUser);

		this.getTestRide();
	}

	//Get user's first ride from firebase.
	getTestRide() {
		//console.log("DriverTest: ", User.currentUser);
		let key = Object.keys(User.currentUser.rides)[0];
		firebase.database().ref(FIREDIR_RIDES + '/' + key).once('value').then(snapshot => {
			//console.log(snapshot.val());
		});
	}

	//Render the component
	render() {
		return (
			<View style = {styles.container}>
				<Text>Driver</Text>
			</View>
		);
	}
}

//Stack navigator for driver screen
export default DriverScreen = StackNavigator({
    DriverMain: {screen: DriverMain}
});

//Style sheet for driver main screen.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
