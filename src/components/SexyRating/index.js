import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import ChiliComponent from './ChiliComponent'
import User from '../../actors/User'
import {COLOR} from "../../Constants";
import {getTheme} from "../../Utility";
import {RATING_COLOR} from "../../Constants";

export default class SexyRating extends Component{

    constructor(props) {
        super(props);
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
        let rating = User.currentUser.sexy_rating;
        let chili = [0, 0, 0, 0, 0];
        for (let i = 0; rating > 0 && i < 5; i++) {

            if (rating <= 1) {
                chili[i] = 40 * rating;
                rating = 0;
            }
            else {
                chili[i] = 40;
                rating = rating - 1;
            }
        }
        const dynamicStyle = {
            chiliImage: [styles.chiliImage, {
                tintColor: chili_this.state.color_theme.APP_BACKGROUND_PROFILE
            }],
            backgroundRight: [styles.backgroundRight,{
                backgroundColor: RATING_COLOR.UNSELECTED
            }],
            backgroundLeft: [styles.backgroundLeft,{
                backgroundColor: RATING_COLOR.CHILI_COLOR
            }]


        };
        return(
            <View style={styles.chiliContainer}>
                <ChiliComponent backgroundLeft={[dynamicStyle.backgroundLeft, {width: chili[0]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - chili[0]}]}   imageStyle={[dynamicStyle.chiliImage,{marginLeft: 0}]}/>
                <ChiliComponent backgroundLeft={[dynamicStyle.backgroundLeft, {width: chili[1]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - chili[1]}]}   imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={[dynamicStyle.backgroundLeft, {width: chili[2]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - chili[2]}]}   imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={[dynamicStyle.backgroundLeft, {width: chili[3]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - chili[3]}]}   imageStyle={dynamicStyle.chiliImage}/>
                <ChiliComponent backgroundLeft={[dynamicStyle.backgroundLeft, {width: chili[4]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - chili[4]}]}   imageStyle={[dynamicStyle.chiliImage,{marginRight: 0}]}/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    chiliContainer: {
        flex: 1,
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