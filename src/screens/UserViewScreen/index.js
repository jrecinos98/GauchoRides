import React, { Component } from "react";
import { StatusBar, LayoutAnimation, UIManager, View, Image, Linking, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import User from "../../../src/actors/User";
import Utility from '../../Utility';
import WheelRating from '../../components/WheelRating'
import SexyRating from '../../components/SexyRating'
import {BounceProfileImage} from "../../components/BounceProfileImage";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import TagView from '../../components/TagView';

export default class UserViewScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color_theme: COLOR.THEME_LIGHT,
        };

        const userview_this = this;
        this.user = this.props.navigation.state.params.user;

        Utility.getTheme(function (theme) {
            userview_this.setState({
                color_theme: theme
            });
        });
    }

    openMessenger(){
        Linking.canOpenURL('http://m.me/jose.recinos.1998').then(supported =>{
            if(!supported){
                console.log("Can't open url")
            }else{
                return Linking.openURL('http://m.me/jose.recinos.1998')
            }
        })
    }

    render() {

        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: this.state.color_theme.APP_BACKGROUND,
                borderBottomColor: this.state.color_theme.APP_FOCUS
            }],
            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: this.state.color_theme.APP_FOCUS
            }],
            userName: [styles.userName, {
                color: this.state.color_theme.FB_NAME_COLOR
            }],
            textStyle: [styles.textStyle,{
                color: this.state.color_theme.FB_NAME_COLOR
            }],
            container: [styles.container, {
                backgroundColor: this.state.color_theme.APP_BACKGROUND_PROFILE
            }],
            imageWrapper: [styles.imageWrapper, {
                marginTop: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT
            }],
            buttonClose: [styles.buttonClose, {
                fontSize: DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,
                color: this.state.color_theme.APP_FOCUS
            }]
        };

        let statusTheme = (this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content" : "light-content";

        return (

            <View style={styles.container}>

                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}>
                    {
                        (Platform.OS === 'ios') ?
                            <Ionicons
                                name='ios-close'
                                style={customStyle.buttonClose}
                                onPress={() => {
                                    this.props.navigation.goBack(null);
                                }}/>
                            : null
                    }
                    <Text style={customStyle.title}>Create Ride</Text>
                </View>

                <View style={customStyle.container}>

                    <View style={styles.imageWrapper}>
                        <Text style={customStyle.userName}>{this.user.name}</Text>
                        <BounceProfileImage
                            source={{uri: 'https://graph.facebook.com/' + this.user.fbID + '/picture?type=large'}}
                            borderRadius={75}/>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={customStyle.textStyle}>RATINGS</Text>
                        <WheelRating/>
                        <SexyRating/>
                        <TagView
                            tags={this.user.tags}
                            color_theme={this.state.color_theme}/>
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
        flexDirection: 'column',
        alignItems: 'center',

    },
    imageWrapper: {
        //flex: 1,
        marginTop: null,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6,
    },
    userName: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        fontSize: 25,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6,
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null

    },
    title: {
        color: null,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: null,
        paddingTop: null
    },
    buttonClose: {
        paddingLeft: 25,
        paddingTop: null,
        fontSize: null,
        color: null,
        alignSelf: 'flex-start',
        position: 'absolute',
    }
});
