import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import CreateButton from './CreateButton';
import CreateButton_IOS from './index-ios';

export default class ActionButton extends Component{
    constructor(props){
        super(props);
        this.state ={
            showActionButton: true
        }
    }
    ShowHideButtonComponent() {
        if(this.state.showActionButton === true)
            this.setState({showActionButton: false})
        else
            this.setState({showActionButton: true})
    };
    render(){
    	return (
            this.state.showActionButton ?
            <CreateButton
                color_theme={this.props.color_theme}
                onRideRequestPress={() => {
                    this.props.onRideRequestPress();
                }}
                onRideCreatePress={() => {
                    this.props.onRideCreatePress();
                }}
            />: null
        );
    }
}
