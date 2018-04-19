import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform, Button } from "react-native";

export default class NewUserScreen extends Component{
    static navigationOptions = {
        title: 'Welcome',
    };
    render(){
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Launch Main Screen"
                onPress={() =>
                    navigate('Main', {name: "MainScreen"})
                }
            />
        );

    }
}