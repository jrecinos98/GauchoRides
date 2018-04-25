import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../Constants';

// import DriverStack from './DriverStack';
import DriverScreen from './DriverScreen';
import RiderScreen from './RiderScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import Settings from './ProfileScreen/Settings';

//Main screen of the app.
export default class MainScreen extends Component{

	static navigationOptions = {
		header: null
	};

	render(){
		return(
			<AppTabNavigator />
		);
	}
}


//Stack navigator for driver screen
const DriverStack = StackNavigator({
    DriverScreen: {screen: DriverScreen}
});

//Stack navigator for rider screen
const RiderStack = StackNavigator({
    RiderScreen: {screen: RiderScreen}
});

//Stack navigator for profile screen
const ProfileStack = StackNavigator({
    ProfileScreen: {screen: ProfileScreen},
    // Settings: {screen: Settings}
});
const HistoryStack = StackNavigator({
    HistoryScreen: {screen: HistoryScreen},
    // Settings: {screen: Settings}
});


//Tab navigator for main screen.
const AppTabNavigator = TabNavigator(
	{
		Driver: {
			screen: DriverStack
		},
		Passenger: {
			screen: RiderStack
		},
		Profile:{
			screen: ProfileStack
		},
		History:{
			screen: HistoryStack
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
