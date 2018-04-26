import React, { Component } from "react";
import { StatusBar, View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import { COLOR } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import {GraphRequest} from 'react-native-fbsdk';
import User from "../../../src/actors/User";
import { getTheme } from '../../Utility';



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

    static profile_this = null;

    constructor(props) {
        super(props);
        profile_this = this;

        profile_this.state = {
            color_theme: COLOR.THEME_LIGHT
        }

        getTheme(function(theme) {
            profile_this.setState({
                color_theme: theme
            });
        });
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-contact" style={{ color: tintColor, fontSize: 20 }} />
        )
    };

    render(){

        const customStyle = {

            topBar: [styles.topBar, {
                backgroundColor: profile_this.state.color_theme.APP_BACKGROUND
            }],

            settings: [styles.settings, {
                color: profile_this.state.color_theme.APP_FOCUS
            }],

            title: [styles.title, {
                color: profile_this.state.color_theme.APP_FOCUS
            }]

        };

		return (

            <View>

                <Settings ref={(instance) => {settings = instance;}}/>

                <StatusBar hidden={true}/>

                <View style={customStyle.topBar}/>

                <Ionicons
                    name='ios-settings'
                    style={customStyle.settings}
                    onPress={() => {
                        settings.setModalVisible(true);
                    }}/>

                <Text style={customStyle.title}>Profile</Text>

                <View style={styles.container}>
                    <Image
                        source={{uri: User.currentUser.photo+'?type=large'}}
                        style={styles.profileImage}/>
                    <Text>Profile Picture</Text>

                </View>

            </View>
		);

    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: 60
    },
    profileImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150
    },
    settings: {
        paddingRight: 25,
        paddingTop: 14,
        fontSize: 32,
        color: null,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    title: {
        color: null,
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 20,
        paddingTop: 20
    }
});
