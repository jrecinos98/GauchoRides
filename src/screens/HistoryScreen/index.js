import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import RideHistory from '../../components/RideHistory';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR } from '../../Constants';




export default class HistoryScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor}) => (
                <Ionicons name="md-book" style={{ color: tintColor, fontSize: 20 }} />
            ),
            title: 'History',
            headerStyle: {
            backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR.THEME_DARK.APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal'
            }
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <RideHistory/>
            </View>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center'
    }
});
