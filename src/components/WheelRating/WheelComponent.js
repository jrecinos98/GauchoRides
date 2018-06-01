import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

/**
 * Single component used to represent the driving rating object
 */
export default class WheelComponent extends Component{

    render(){
        return(
            <View style={styles.wheelWrapper}>
                <View style={styles.backgroundViewContainer}>
                    <View
                        style={this.props.backgroundLeft}
                    />
                    <View style={this.props.backgroundRight}/>

                </View>
                <Image
                    source={require('../../../public/assets/wheel_52_alpha.png')}
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
        justifyContent: 'flex-start'
    },
    wheelWrapper:{
        marginRight: 10,
        marginLeft: 10
    }
});