import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

/**
 *  Component used to inform the user that a background task is being performed. It will be displayed until the task is completed.
 */
export default class Spinner extends Component{

	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};
	}

	show(visible) {
		this.setState({
			visible: visible
		});
	}

    render(){
    	if (!this.state.visible)
    		return null;

        return(
            <View
                style={styles.spinner}>
                <ActivityIndicator size="large" color='black' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
	spinner: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.6)'
	}
});
