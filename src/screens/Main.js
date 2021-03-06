import React, { Component } from "react";
import{ AsyncStorage, View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Constants from '../Constants';
import Utility from '../Utility';

import CreateScreen from './CreateScreen';
import  {HomeStack} from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import SettingScreen from "./SettingScreen";
import CreateRequestScreen from "./CreateRequestScreen";
import RideViewScreen from "./RideViewScreen";
import UserViewScreen from "./UserViewScreen";
import MessagesScreen from "./MessagesScreen";
import RequestScreen from "./RequestScreen";

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ListScreen from './ListScreen';
export var MainScreenInstance = null;
export var MyAppStack=null;

/**
 * Contains the Navigator objects which dictate the available Screens and allows navigation within the app.
 */
export default class Main extends Component{

	static navigationOptions = {
		header: null
	};

    /**
	 * Retrieves the theme from local storage and sets the app theme
     * @param props
     */
	constructor(props) {
		super(props);
		this.state = {
			color_theme: Constants.COLOR.THEME_DARK
		};

		MainScreenInstance = this;
		this.updateTheme();
	}

    /**
	 * Sets the theme of the app
     */
	updateTheme() {
		Utility.getTheme(function(theme) {
			MainScreenInstance.setState({
				color_theme: theme
			});
		});
	}

	render(){
        const MyTabNavigator = AppTabNavigator(this.state.color_theme);
        MyAppStack= AppStack(MyTabNavigator);
		return(
			<MyAppStack/>
		);
	}
}


/*
 * Tab navigator for main screen.
 * @param color_theme
 * @returns {*}
 * @constructor
 */
const AppTabNavigator = (color_theme) => TabNavigator(
	{
		Home: {
			screen: HomeStack
		},
		Requests:{
			screen: RequestScreen
		},
		History:{
			screen: HistoryScreen
		},

		Profile:{
			screen: ProfileScreen
		}
	
	},
	{
        headerMode:{
            headerMode: 'screen'
        },
		initialRouteName: 'Home',
		animationEnabled:true,
		swipeEnabled: Platform.OS === 'android',
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
			showLabel:Platform.OS === 'ios'
		}
	}
);

/*
 * Stack containing screens that render over the TabNavigator screens.
 * @param Tab_Navigator
 * @returns {*}
 * @constructor
 */
const AppStack = (Tab_Navigator) => StackNavigator(
    {
        Main: {
            screen: ({navigation})=> <Tab_Navigator screenProps ={{rootNavigation: navigation}}/>
        },
        CreateRide: {
            screen: CreateScreen,
        },
        RequestRide: {
            screen: CreateRequestScreen
        },
        Settings: {
            screen: SettingScreen
        },
		ListScreen: {
        	screen: ListScreen
        },
        RideViewScreen: {
			screen: RideViewScreen
        },
        UserViewScreen: {
			screen: UserViewScreen
        },
        MessagesScreen: {
        	screen: MessagesScreen
        }
    },
    {
        initialRouteName: 'Main',
		transitionConfig: customAnimationFunc,
        headerMode:{
            headerMode: 'screen'
        },
    });


/*
 * Animates the way screens appear.
 * @returns {{screenInterpolator: (function(*=): {opacity, transform})}}
 */
const customAnimationFunc = () => ({
    screenInterpolator: sceneProps => {
        return CardStackStyleInterpolator.forVertical(sceneProps);
    },
});


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
