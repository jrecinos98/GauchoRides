import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";


export default class WheelComponent extends Component{
    render(){
        return(
            <View>
                <Image
                    source={require('../../../public/assets/wheel_52.png')}
                    style={styles.wheelImage}
                />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    wheelImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginLeft: 10
    }
});