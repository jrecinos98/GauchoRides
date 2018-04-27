import React, { Component } from "react";
import {  View, StyleSheet, Image } from "react-native";

export default class ChiliComponent extends Component{
    render(){
        return(
            <View>
                <Image
                    source={require('../../../public/assets/pepper_64.png')}
                    style={styles.chiliImage}
                />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    chiliImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginLeft: 10
    }
});