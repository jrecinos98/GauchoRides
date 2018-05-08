import React, { Component } from "react";
import{ AsyncStorage, View, Test, StyleSheet, Platform, StatusBar, Text} from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, STRING } from '../Constants';
import { getTheme } from '../Utility';

import CreateRideScreen from './CreateRideScreen';
import HomeScreen, {HomeStack, PassengerStack} from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import SettingScreen from "./SettingScreen";
import RequestRideScreen from "./RequestScreen";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

export var MainScreenInstance = null;
export var MyAppStack=null;

//Main screen of the app.
export default class Main extends Component{

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


//Tab navigator for main screen.
const AppTabNavigator = (color_theme) => TabNavigator(
	{
		Home: {
			screen: HomeStack
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
		swipeEnabled:false,
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

const AppStack = (Tab_Navigator) => StackNavigator(
    {
        Main: {
            screen: ({navigation})=> <Tab_Navigator screenProps ={{rootNavigation: navigation}}/>
        },
        CreateRide: {
            screen: CreateRideScreen,
        },
        RequestRide: {
            screen: RequestRideScreen
        },
        Settings: {
            screen: SettingScreen
        }
    },
    {
        initialRouteName: 'Main',
		transitionConfig: customAnimationFunc,
        headerMode:{
            headerMode: 'screen'
        },
    });



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
