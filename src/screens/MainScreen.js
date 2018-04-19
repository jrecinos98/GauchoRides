import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { appMainColor, appTintColor, appInactiveTintColor} from '../Constants';

import DriverMain from './DriverScreen'
import RiderMain from './RiderScreen'
import ProfileMain from './ProfileScreen'


export default class MainScreen extends Component{

	static navigationOptions = {
		headerLeft: <Ionicons name="ios-refresh" style={{paddingLeft:10, fontSize: 20, color: appTintColor}} />,
        title: <Text style={{color: appTintColor }}>GauchoRides</Text>,
        headerStyle: {
            backgroundColor: appMainColor,
            height: 56,
            elevation: null,
        },
        activeTintColor:'#FFD700',
        inactiveTintColor:'#d1cece',
		headerRight: <Ionicons style = {{ paddingRight: 10, fontSize: 20,color: appTintColor }}
		name="ios-send-outline" />
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
			screen: DriverMain
		},
		Passenger: {
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
						backgroundColor:appMainColor,

					},
					ios:{
                        backgroundColor:'#FFFFFF',
                    }
				})
			},
            activeTintColor: appTintColor,
			inactiveTintColor:appInactiveTintColor,
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
