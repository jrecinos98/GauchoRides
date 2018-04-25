import React, {Component} from "react";
import {Text, View, StyleSheet, Image} from "react-native";

import styles from "./RideHistoryStyles.js";


export default class RideHistory extends Component {
    render() {
        return (
          		<View style={styles.container}>
          			<View style={styles.logoContainer}>
          				<Image source={require('../../../public/assets/GauchoSunset.png')} />
          			</View>
          		</View>
        
        );
    }
}

