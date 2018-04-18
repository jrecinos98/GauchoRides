import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform } from "react-native";
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import DriverMain from './DriverScreen'
import RiderMain from './RiderScreen'
import ProfileMain from './ProfileScreen'


export default class MainScreen extends Component{
	static navigationOptions = {
		headerLeft: <Ionicons name="ios-refresh" style={{paddingLeft:10, fontSize: 20}} />,
		title: "GauchoRides",
		backgroundColor: '#4db6ac',
		headerRight: <Ionicons style = {{ paddingRight: 10, fontSize: 20 }}
		name="ios-send-outline" />
	}
	render(){
		return(
			<AppTabNavigator />
			);

	}
}


const AppTabNavigator = TabNavigator(
	{
		Driver: {
			screen: DriverMain
		},
		Rider: {
			screen: RiderMain
		},
		Profile:{
			screen: ProfileMain
		}
	},
	{
		animationEnabled:true,
		swipeEnabled:true,
		tabBarPosition:"bottom",
		tabBarOptions:{
			style:{
				...Platform.select({
					android:{
						backgroundColor:'#4db6ac'
					}
				})
			},
			activeTintColor:'#212121',
			inactiveTintColor:'#d1cece',
			showIcon:true,
			showLabel:true //set to false if don't want name
		}
	}
);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
