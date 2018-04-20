import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../Constants';


import DriverScreen from './DriverScreen'
import RiderScreen from './RiderScreen'
import ProfileScreen from './ProfileScreen'

export default class MainScreen extends Component{

	static navigationOptions = {
		header: null
		// headerLeft: <Ionicons name="ios-refresh" style={{paddingLeft:10, fontSize: 20, color: COLOR_APP_UNFOCUS}} />,
  //       title: 'Gaucho Rides',
		// headerStyle: {
		// 	backgroundColor: COLOR_APP_BACKGROUND
		// },
		// headerTitleStyle: {
		// 	color: COLOR_APP_TITLE,
		// 	textAlign: 'center',
		// 	alignSelf: 'center',
		// 	flex: 1,
		// 	fontWeight: 'normal'
  //       },
		// headerRight: <Ionicons style = {{ paddingRight: 10, fontSize: 20,color: COLOR_APP_UNFOCUS }}/>
	};

	render(){
		return(
			<AppTabNavigator />
		);

	}
}


const AppTabNavigator = TabNavigator(
	{
		Driver: {
			screen: DriverScreen
		},
		Passenger: {
			screen: RiderScreen
		},
		Profile:{
			screen: ProfileScreen
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
						backgroundColor: COLOR_APP_BACKGROUND,

					},
					ios:{
                        backgroundColor: COLOR_APP_BACKGROUND,
                    }
				})
			},

            activeTintColor: COLOR_APP_FOCUS,
			inactiveTintColor: COLOR_APP_UNFOCUS,
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
