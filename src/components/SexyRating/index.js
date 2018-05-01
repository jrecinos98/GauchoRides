import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import ChiliComponent from './ChiliComponent'
import User from '../../actors/User'
import {COLOR} from "../../Constants";
import {getTheme} from "../../Utility";

export default class SexyRating extends Component{

    constructor(props) {
        super(props);
        let rating= User.currentUser.drive_rating;
        chili_this=this;
        chili_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };
        //this.getRating= this.getRating.bind(this);
        getTheme(function (theme) {
            chili_this.setState({
                color_theme: theme
            });
        });

    }
    render(){
        const dynamicStyle = {
            chiliImage: [styles.chiliImage, {
                tintColor: chili_this.state.color_theme.APP_BACKGROUND_PROFILE
            }],
            backgroundRight: [styles.backgroundRight,{
                backgroundColor: chili_this.state.color_theme.CHILI_COLOR
            }],
            backgroundLeft: [styles.backgroundLeft,{

            }]


        };
        return(
            <View style={styles.chiliContainer}>
                <ChiliComponent backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight}  imageStyle={[dynamicStyle.chiliImage,{marginLeft: 0}]}/>
                <ChiliComponent backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight}  imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight}  imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight}  imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={dynamicStyle.backgroundLeft} backgroundRight={dynamicStyle.backgroundRight}  imageStyle={[dynamicStyle.chiliImage,{marginRight: 0}]}/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    chiliContainer: {
        //flex: 1,
        flexDirection: 'row',

        paddingTop: 10,
        paddingBottom: 10

    },
    chiliImage: {
        width: 40,
        height: 40,
    },
    backgroundRight: {
        width: 40,
        height: 40,
        backgroundColor: 'white'

    },
    backgroundLeft: {
        width: 0,
        height: 40,
        backgroundColor: "black"
    },
});