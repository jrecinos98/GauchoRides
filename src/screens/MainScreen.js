import React, { Component } from "react";
import{ AsyncStorage, View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, STRING } from '../Constants';

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
		this.updateTheme();
		MainScreenInstance = this;
	}

	updateTheme() {
		AsyncStorage.getItem(STRING.THEME.KEY).then((value) => {

			if (value === STRING.THEME.DARK) {
				this.setState({
					color_theme: COLOR.THEME_DARK
				});
			}
			else if (value === STRING.THEME.LIGHT) {
				this.setState({
					color_theme: COLOR.THEME_LIGHT
				});
			}
			else {
				this.setState({
					color_theme: COLOR.THEME_LIGHT
				});
			}
			console.log(this.state.color_theme);
		});
	}

	render(){
		const MyTabNavigator = AppTabNavigator(this.state.color_theme);

		return(
			<MyTabNavigator/>
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
const AppTabNavigator = (color_theme) => TabNavigator(
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
						backgroundColor: color_theme.APP_BACKGROUND,

					},
					ios:{
                        backgroundColor: color_theme.APP_BACKGROUND,
                    }
				})
			},

            activeTintColor: color_theme.APP_FOCUS,
			inactiveTintColor: color_theme.APP_UNFOCUS,
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
