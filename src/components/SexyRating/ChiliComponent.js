import React, { Component } from "react";
import {  View, StyleSheet, Image } from "react-native";

/**
 * Component that represents an individual looks rating object
 */
export default class ChiliComponent extends Component{
    render(){

        return(
            <View style={ styles.chiliWrapper}>
                <View style={ styles.backgroundViewContainer}>
                    <View
                        style={this.props.backgroundLeft}
                    />
                    <View style={this.props.backgroundRight}/>

                </View>
                <Image
                    source={require('../../../public/assets/pepper_64_alpha.png')}
                    style={this.props.imageStyle}
                />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    backgroundViewContainer:{
        width: 40,
        height: 40,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    chiliWrapper:{
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20
    },

});