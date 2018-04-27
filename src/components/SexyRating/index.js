import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import ChiliComponent from './ChiliComponent'

export default class SexyRating extends Component{
    render(){
        return(
            <View style={styles.chiliContainer}>
                <ChiliComponent/>
                <ChiliComponent/>
                <ChiliComponent/>
                <ChiliComponent/>
                <ChiliComponent/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    chiliContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,

    }
});