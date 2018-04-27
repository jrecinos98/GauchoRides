import React, { Component } from "react";
import { StatusBar, View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

import Settings from './Settings';
import { COLOR } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';

import User from "../../../src/actors/User";
import { getTheme } from '../../Utility';

import WheelRating from '../../components/WheelRating'
import SexyRating from '../../components/SexyRating'
import {GestureHandler} from 'expo'



export default class ProfileScreen extends Component {

    static profile_this = null;

    constructor(props) {
        super(props);
        profile_this = this;

        profile_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };

        getTheme(function (theme) {
            profile_this.setState({
                color_theme: theme
            });
        });
    }


    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Ionicons name="ios-contact" style={{color: tintColor, fontSize: 20}}/>
        )
    };

    render() {

        const customStyle = {

            topBar: [styles.topBar, {
                backgroundColor: profile_this.state.color_theme.APP_BACKGROUND,
                borderBottomColor: profile_this.state.color_theme.APP_FOCUS
            }],

            settings: [styles.settings, {
                color: profile_this.state.color_theme.APP_FOCUS
            }],

            title: [styles.title, {
                color: profile_this.state.color_theme.APP_FOCUS
            }],
            userName: [styles.userName, {
                color: profile_this.state.color_theme.FB_NAME_COLOR
            }],
            container: [styles.container, {
                backgroundColor: profile_this.state.color_theme.APP_BACKGROUND_OPQUE
            }]


        };

        return (

            <View style={styles.container}>
                <Settings ref={(instance) => {
                    settings = instance;
                }}/>

                <StatusBar hidden={true}/>
                <View style={customStyle.topBar}>
                    <Ionicons
                        name='ios-settings'
                        style={customStyle.settings}
                        onPress={() => {
                            settings.setModalVisible(true);
                        }}/>
                    <Text style={customStyle.title}>Profile</Text>
                </View>

                <View style={customStyle.container}>
                    <View style={styles.imageWrapper}>
                        <Text style={customStyle.userName}>{User.currentUser.name}</Text>
                        <Image
                            borderRadius={72}
                            source={{uri: 'https://graph.facebook.com/' + User.currentUser.fbID + '/picture?type=large'}}
                            style={styles.profileImage}/>
                    </View>
                    <View style={styles.ratingContainer}>
                        <WheelRating/>
                        <SexyRating/>
                    </View>


                </View>
            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: null,
        flex: 1,

    },
    ratingContainer: {
        flex: 1,
        //flexDirection: 'column',
        alignItems: 'center',
       // justifyContent: 'center'
    },
    imageWrapper: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userName: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        fontSize: 25,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: 50,
        // borderBottomWidth: 0.5
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
