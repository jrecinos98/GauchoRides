import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from '../Constants';

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
		History:{
			screen: HistoryStack
		},

		Profile:{
			screen: ProfileStack
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
						backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND,

					},
					ios:{
                        backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND,
                    }
				})
			},

            activeTintColor: COLOR.THEME_DARK.APP_FOCUS,
			inactiveTintColor: COLOR.THEME_DARK.APP_UNFOCUS,
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
