import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import CreateButton_Android from './index-android';
import CreateButton_IOS from './index-ios';

export default class CreateButton extends Component{
    render(){
    	return (
			(Platform.OS === 'android') ?
		    	<CreateButton_Android
		    		color_theme={this.props.color_theme}
		    		onRideRequestPress={() => {
		    			this.props.onRideRequestPress();
		    		}}
		    		onRideCreatePress={() => {
		    			this.props.onRideCreatePress();
		    		}}
		    	/>
		    :
		    	<CreateButton_IOS
		    		color_theme={this.props.color_theme}
		    		onRideRequestPress={() => {
		    			this.props.onRideRequestPress();
		    		}}
		    		onRideCreatePress={() => {
		    			this.props.onRideCreatePress();
		    		}}
		    	/>
    	);
    }
}
