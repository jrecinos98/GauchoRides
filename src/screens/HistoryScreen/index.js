import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import RideHistory from '../../components/RideHistory';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
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
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: history_this.state.color_theme.APP_BACKGROUND
            }],

            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: history_this.state.color_theme.APP_FOCUS
            }],

            historyContainer: [styles.historyContainer, {
                marginTop: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT
            }]

        };

        let statusTheme = (history_this.state.color_theme == COLOR.THEME_LIGHT) ? "dark-content": "light-content";

        return (
            <View style={styles.container}>
                <StatusBar barStyle={statusTheme}/>
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
        height: null
    },
    title: {
        color: null,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        fontSize: null,
        paddingTop: null
    },
    historyContainer: {
        marginTop: null,
        flex: 1
    }
});
