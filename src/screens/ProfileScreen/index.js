import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Ionicons } from '@expo/vector-icons';


export default class ProfileMain extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="ios-contact-outline" style={{ color: tintColor, fontSize: 20 }} />
        )

    };
    render(){
		return (
			<View>
		<Text>Profile</Text>
			</View>
		);
    }
}
