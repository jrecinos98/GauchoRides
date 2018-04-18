import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from 'Gaucho-Rides/src/components/RideMap'; //adding map


export default class DriverMain extends Component {

	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="ios-car" style={{ color: tintColor, fontSize: 20  }}  />
		)
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
