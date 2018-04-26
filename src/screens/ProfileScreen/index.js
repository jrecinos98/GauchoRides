import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import { COLOR } from '../../Constants';
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

var settings;

export default class ProfileScreen extends Component{

    constructor(props) {
        super(props);
        profileInstance = this;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-contact" style={{ color: tintColor, fontSize: 20 }} />
            ),
            title: 'Profile',
            headerStyle: {
             backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR.THEME_DARK.APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal',
             paddingLeft: 55
            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 25, paddingLeft: 0, fontSize: 32 ,color: COLOR.THEME_DARK.APP_UNFOCUS }}
                    onPress={() => {
                        settings.setModalVisible(true);
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

                <Settings ref={(instance) => {settings = instance;}}/>
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
