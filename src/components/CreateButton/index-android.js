import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from 'react-native-action-button';
import { COLOR, STRING, DIMENSION } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';

export default class CreateButton_Android extends Component{
    render(){
        return(
            <ActionButton
                size={DIMENSION.ICON.SIZE}
                position={"right"}
                verticalOrientation={"up"}
                style={styles.actionButtonStyle}
                // bgColor={"rgba(255, 255, 255, 0.5)"}
                blurRadius={1}
                buttonColor={this.props.color_theme.APP_FOCUS}>
                <ActionButton.Item
                    buttonColor= {this.props.color_theme.APP_FOCUS}
                    title={"Request ride"}
                    onPress={() => {
                        this.props.onRideRequestPress();
                    }}>
                    <Ionicons name="ios-add" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor= {this.props.color_theme.APP_FOCUS}
                    title={"Add ride"}
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
    // actionButtonStyle: {
    //     paddingTop: null,
    //     alignSelf: 'flex-start',
    //     position: 'absolute'
    // },

    actionButtonStyle: {
        paddingRight: 25,
        paddingTop: null,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

});
