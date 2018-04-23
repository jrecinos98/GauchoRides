import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { COLOR_APP_BACKGROUND_OPAQUE, COLOR_APP_FOCUS, COLOR_BACKGROUND_LOGIN_BUTTON } from "../../Constants";

export default class LoginButton extends Component{

    render(){
        return(
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.callback()}>
                <Text style={styles.buttonText}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonText:{
        textAlign: 'center',
        color: "#FFFFFF",
        fontWeight: "700",
        textShadowColor:'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    buttonContainer: {
        paddingVertical: 12,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: COLOR_BACKGROUND_LOGIN_BUTTON,
        borderRadius: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    }
});
