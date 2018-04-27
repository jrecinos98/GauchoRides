import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import WheelComponent from './WheelComponent'

export default class WheelRating extends Component{
    render(){
        return (
        <View style={styles.wheelContainer}>
            <WheelComponent/>
            <WheelComponent/>
            <WheelComponent/>
            <WheelComponent/>
            <WheelComponent/>
        </View>
        )
    }
}

const styles= StyleSheet.create({
    wheelContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,

    }
});