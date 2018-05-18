import React, { Component } from "react";
import { View, Text, Dimensions, Animated, PanResponder, Image, StyleSheet } from "react-native";
import {Card, CardItem , Body, } from 'native-base'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

/**
 * A container component to host the bouncy profile image.
 */
export class BounceProfileImage extends Component {
    translateX = new Animated.Value(0);
    translateY= new Animated.Value(0);
    /**
     * Handles the movement and spring effect of the profile image
     * @type {*|{panHandlers, getInteractionHandle}}
     * @private
     */
    _panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onShouldBlockNativeResponder: () =>true,
        onPanResponderMove: Animated.event([null, {dx: this.translateX, dy: this.translateY}]),
        onPanResponderRelease: (e, {vx, dx}) => {


            //dx is the horizontal distance that the user's finger has traveled since start of gesture
            //vx instantaneous velocity of the swipe gesture in the horizontal direction at release.
            //THIS SENDS THE IMAGE FLYING OFF THE SCREEN.

           /* if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
                Animated.timing(this.translateX, {
                    toValue: dx > 0 ? screenWidth : -screenWidth,
                    duration: 200
                }).start(this.props.onDismiss);
            } else {*/
            Animated.spring(this.translateX, {
                toValue: 0,
                bounciness: 15
            }).start();
            Animated.spring(this.translateY, {
                toValue: 0,
                bounciness: 15
            }).start();
        }
    });

    render() {
        return (
            <View>
                <Animated.View
                    style={{transform: [{translateX: this.translateX}, {translateY: this.translateY}]}} {...this._panResponder.panHandlers}>
                    <Image source={this.props.source} borderRadius={this.props.borderRadius}
                           style={styles.profileStyle}
                    />
                </Animated.View>
            </View>

        );
    }
}

const styles= StyleSheet.create({
    profileStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150
    }
});