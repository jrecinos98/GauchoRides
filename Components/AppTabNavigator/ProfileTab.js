import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet
} from "react-native";

import { Ionicons } from '@expo/vector-icons';


class ProfileTab extends Component{
	static navigationOptions = {
		tabBarIonicons: ({ tintColor}) => (
			<Ionicons name="md-checkmark-circle" style={{ color: tintColor }} />
		)

	}
	render(){
		return(
			<View style = {styles.container}>
				<Text>Profile</Text>
			</View>
			);
	}
}

export default ProfileTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})