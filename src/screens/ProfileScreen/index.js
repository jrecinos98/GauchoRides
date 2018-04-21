import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import NewUserScreen from '../NewUserScreen';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';

class ProfileMain extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-settings" style={{ color: tintColor, fontSize: 20 }} />
            ),
            headerLeft: <Ionicons name="ios-refresh" style={{paddingLeft:10, fontSize: 20, color: COLOR_APP_UNFOCUS}} />,
            title: 'Profile',
            headerStyle: {
             backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR_APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal'
            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 10, fontSize: 20,color: COLOR_APP_UNFOCUS }}
                    onPress={() => {
                        navigation.navigate('Settings', {name: "Settings"});
                    }}/>
        };
    };

    render(){
		return (
            <Text> Profile </Text>
		);
    }
}

export default ProfileScreen = StackNavigator({
    ProfileMain: {screen: ProfileMain},
    Settings: {screen: Settings},
    NewUserScreen: {screen: NewUserScreen}
});

const styles = StyleSheet.create({
    settingsButton: {
        paddingVertical: 15,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#0d47a1',
        borderRadius: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
    }
});