import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import CreateButton from './CreateButton';


/**
 * Returns the action button component displayed in the home screen.
 */
export default class ActionButton extends Component{
    constructor(props){
        super(props);
        this.state ={
            showActionButton: true
        }
    }

    /**
     * Handles the toggling of the action button. Showing it or hiding it.
     */
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
