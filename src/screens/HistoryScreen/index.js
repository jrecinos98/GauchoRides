import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import RideHistory from '../../components/RideHistory';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR } from '../../Constants';
import { getTheme } from '../../Utility';




export default class HistoryScreen extends Component {

    static history_this = null;

    constructor(props) {
        super(props);
        history_this = this;

        history_this.state = {
            color_theme: COLOR.THEME_LIGHT
        }

        getTheme(function(theme) {
            history_this.setState({
                color_theme: theme
            });
        });
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="md-book" style={{ color: tintColor, fontSize: 20 }} />
        )
    };

    render() {

        const customStyle = {

            topBar: [styles.topBar, {
                backgroundColor: history_this.state.color_theme.APP_BACKGROUND
            }],

            title: [styles.title, {
                color: history_this.state.color_theme.APP_FOCUS
            }]

        };

        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={customStyle.topBar}/>
                <Text style={customStyle.title}>History</Text>

                <View style={styles.historyContainer}>
                    <RideHistory style={{
                        flex: 1,
                        aspectRatio: 0.5,
                        resizeMode: 'contain'
                    }}/>
                </View>

            </View>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: 50
    },
    title: {
        color: null,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        fontSize: 20,
        paddingTop: 15
    },
    historyContainer: {
        marginTop: 50,
        position: 'absolute'
    }
});
