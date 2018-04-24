import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import {
    COLOR_APP_BACKGROUND,
    COLOR_APP_FOCUS,
    COLOR_APP_UNFOCUS,
    COLOR_APP_TITLE,
    PROFILE_BACKGROUND_DARK
} from '../../Constants';
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
             backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR_APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal',

            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 30, paddingLeft: 0, fontSize: 25 ,color: COLOR_APP_UNFOCUS }}
                    onPress={() => {
                        settings.setModalVisible(true);
                    }}
                />,
            headerLeft:
                <Ionicons
                    name='ios-settings'
                    style={{  paddingRight: 30, paddingLeft: 0, fontSize: 25 ,color: COLOR_APP_BACKGROUND }}
                />

        };
    };

    render(){
        console.log(User.currentUser.photo+'?type=large');
		return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{User.currentUser.name}</Text>
                <Image
                    borderRadius={72}
                    source={{uri: User.currentUser.photo+'?type=large'}}
                style={{alignItems: 'center', justifyContent: 'center', width: 150, height: 150}}/>
                <Text style={{color:'white'}}>Profile Picture</Text>

                <Settings ref={(instance) => {settings = instance;}}/>
            </View>
		);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:  PROFILE_BACKGROUND_DARK
    },
    textStyle: {
        color:'white',
        textShadowColor:'rgba(0, 0, 0, 0.6)',
        fontSize:25,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6
    }
});
