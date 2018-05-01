import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import WheelComponent from './WheelComponent'
import {COLOR} from "../../Constants";
import {getTheme} from "../../Utility";
import User from '../../actors/User'

export default class WheelRating extends Component{
    constructor(props) {
        super(props);
        let rating= User.currentUser.drive_rating;
        wheel_this=this;
        wheel_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };
        //this.getRating= this.getRating.bind(this);
        getTheme(function (theme) {
            wheel_this.setState({
                color_theme: theme
            });
        });


    }
    render(){
        const dynamicStyle = {
            wheelImage: [styles.wheelImage, {
                tintColor: wheel_this.state.color_theme.APP_BACKGROUND_PROFILE
            }],
            backgroundRight: [styles.backgroundRight,{
                backgroundColor: wheel_this.state.color_theme.WHEEL_UNSELECTED
            }],
            backgroundLeft: [styles.backgroundLeft,{
                backgroundColor: wheel_this.state.color_theme.WHEEL_COLOR

            }]


        };
        return (
        <View style={styles.wheelContainer}>
            <WheelComponent  backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight} imageStyle={[dynamicStyle.wheelImage,{marginLeft: 0}]}/>
            <WheelComponent  backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft,{width:15}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 25}]} imageStyle={[dynamicStyle.wheelImage,{marginRight: 0}]}/>
        </View>
        )
    }
}

const styles= StyleSheet.create({
    wheelContainer: {
        //flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10


    },
    wheelImage: {
        width: 40,
        height: 40,

    },
    backgroundLeft: {
        width: 40,
        height: 40,
       // backgroundColor: "black"
        // borderRadius: 20
    },
    backgroundRight: {
        width: 0,
        height: 40,
       // backgroundColor: 'gray',

        //Border radius only works correctly when only one (right or left) cover the entire background (one is width 40 the other is 0)
        // borderRadius: 20

    }

});