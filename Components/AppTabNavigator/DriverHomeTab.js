import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

class DriverHomeTab extends Component{
	static navigationOptions = {
		tabBarIonicons: ({ tintColor}) => (
			<Ionicons name="ios-send-outline" style={{ color: tintColor }} />
		)

	}
	render(){
		return(
			<View style = {styles.container}>
				<Text>Driver</Text>
			</View>
		);
	}
}

export default DriverHomeTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})