import React, {Component} from "react";
import{
	View,
	Test,
	StyleSheet,
	Platform
} from "react-native";


import DriverHomeTab from './AppTabNavigator/DriverHomeTab'
import RiderHomeTab from './AppTabNavigator/RiderHomeTab'
import SearchTab from './AppTabNavigator/SearchTab'
import ProfileTab from './AppTabNavigator/ProfileTab'



import {TabNavigator} from 'react-navigation'
import { Icon } from 'native-base'
//import { Ionicons } from '@expo/vector-icons';



class MainScreen extends Component{
	static navigationOptions = {
		headerLeft: <Icon name="pizza" style={{paddingLeft:10}} />,
		title: "GauchoRides",
		headerRight: <Icon style = {{ paddingRight: 10 }}
		name="ios-send-outline" />
	}
	render(){
		return(
			<AppTabNavigator />
			);

	}
}
export default MainScreen;

const AppTabNavigator = TabNavigator({
	DriverHomeTab: {
		screen: DriverHomeTab
	},
	RiderHomeTab: {
		screen: RiderHomeTab

	},
	SearchTab: {
		screen: SearchTab
	},

	ProfileTab:{
		screen: ProfileTab
	}

},{
	animationEnabled:true,
	swipeEnabled:true,
	tabBarPosition:"bottom",
	tabBarOptions:{
		style:{
			...Platform.select({
				android:{
					backgroundColor:'white'
				}
			})

		},
		activeTintColor:'#000',
		inactiveTintColor:'#d1cece',
		showLabel:false,
		showIcon:true

	}

})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'

	}
});
