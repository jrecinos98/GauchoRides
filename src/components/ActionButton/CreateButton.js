import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from 'react-native-action-button';
import { COLOR, STRING, DIMENSION } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
//import ActionButton from 'react-native-circular-action-menu';

/**
 * Renders a floating button component. Upon pressing, it allows the user to choose to create a ride or request a ride.
 */
export default class CreateButton extends Component{
    render(){
        return(
            <ActionButton
                size={DIMENSION.ICON.ACTION_BUTTON}
                position={"right"}
                verticalOrientation={"up"}
                style={styles.actionButtonStyle}
                bgColor={"rgba(255, 255, 255, 0.5)"}
                blurRadius={10}
                buttonColor={this.props.color_theme.APP_FOCUS}>
                <ActionButton.Item
                    buttonColor= {this.props.color_theme.APP_FOCUS}
                    title={"Can't Find Ride? Request One"}
                    onPress={() => {
                        this.props.onRideRequestPress();
                    }}>
                    <Ionicons name="ios-add" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor= {this.props.color_theme.APP_FOCUS}
                    title={"Create Ride"}
                    onPress={() => {
                        this.props.onRideCreatePress();
                    }}>
                    <Ionicons name="ios-car" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = StyleSheet.create({

    actionButtonStyle: {
        paddingRight: 25,
        paddingTop: null,
        alignSelf: 'flex-end',
        position: 'absolute',
        borderRadius: 26
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

});
