import React, { Component } from "react";
import{ AsyncStorage, View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, STRING } from '../Constants';
import { getTheme } from '../Utility';

// import DriverStack from './DriverStack';
import DriverScreen from './DriverScreen';
import RiderScreen from './RiderScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import Settings from './ProfileScreen/Settings';

export var MainScreenInstance = null;

//Main screen of the app.
export default class MainScreen extends Component{

	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			color_theme: COLOR.THEME_DARK
		};

		MainScreenInstance = this;
		this.updateTheme();
	}

	updateTheme() {
		getTheme(function(theme) {
			console.log("My THeme", theme);
			MainScreenInstance.setState({
				color_theme: theme
			});
		});
	}

	render(){
		const MyTabNavigator = AppTabNavigator(this.state.color_theme);

		return(
			<MyTabNavigator/>
		);
	}
}


//Tab navigator for main screen.
const AppTabNavigator = (color_theme) => TabNavigator(
	{
		Driver: {
			screen: DriverScreen
		},
		Passenger: {
			screen: RiderScreen
		},
		History:{
			screen: HistoryScreen
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
						backgroundColor: color_theme.APP_BACKGROUND,
						//height:50
					},
					ios:{
                        backgroundColor: color_theme.APP_BACKGROUND,
                    }
				})
			},

            activeTintColor: color_theme.APP_FOCUS,
			inactiveTintColor: color_theme.APP_UNFOCUS,
			showIcon:true,
			showLabel:Platform.OS === 'ios' //set to false if don't want name
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
