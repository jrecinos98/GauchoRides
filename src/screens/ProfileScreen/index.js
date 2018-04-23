import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from '../MainScreen';
import Settings from './Settings';
import NewUserScreen from '../NewUserScreen';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';

export default class ProfileScreen extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-contact" style={{ color: tintColor, fontSize: 20 }} />
            ),
            title: 'Profile',
            headerStyle: {
             backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR_APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal'
            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 10, fontSize: 20,color: COLOR_APP_UNFOCUS }}
                    onPress={() => {
                        navigation.navigate('Settings', {name: "Settings"});
                    }}
                />
        };
    };

    render(){
		return (
            <View style={styles.container}>
                <Text> Profile </Text>
            </View>
		);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
