import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import {GraphRequest} from 'react-native-fbsdk';
import User from "../../../src/actors/User";


/*
const Graph= new GraphRequest(
    '/me',
    {
        parameters: {
            fields: {
                string: 'picture'
            }
        }
    },
    _responseInfoCallback
)*/

export default class ProfileScreen extends Component{


    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-contact" style={{ color: tintColor, fontSize: 20 }} />
            ),
            title: 'Profile',
            headerStyle: {
             backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR_APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal',
             paddingLeft: 55
            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 25, paddingLeft: 0, fontSize: 32 ,color: COLOR_APP_UNFOCUS }}
                    onPress={() => {
                        navigation.navigate('Settings', {name: "Settings"});
                    }}
                />
        };
    };

    render(){
        console.log(User.currentUser.photo+'?type=large');
		return (
            <View style={styles.container}>
                <Image
                    source={{uri: User.currentUser.photo+'?type=large'}}
                style={{alignItems: 'center', justifyContent: 'center', width: 150, height: 150}}/>
                <Text>Profile Picture</Text>


            </View>
		);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
