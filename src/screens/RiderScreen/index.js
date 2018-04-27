import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ProgressBarAndroid } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR, STRING } from '../../Constants';
import { getTheme } from '../../Utility';


export default class RiderScreen extends Component {

    static rider_this = null;

    constructor(props) {
        super(props);

        rider_this = this;
        rider_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };

        getTheme(function(theme) {
            rider_this.setState({
                color_theme: theme
            });
        });
    }


    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="md-body" style={{ color: tintColor, fontSize: 20 }} />
        )
    };

    render() {

        const customStyle = {

            topBar: [styles.topBar, {
                backgroundColor: rider_this.state.color_theme.APP_BACKGROUND
            }],

            title: [styles.title, {
                color: rider_this.state.color_theme.APP_FOCUS
            }]

        };

        let statusTheme = (rider_this.state.color_theme == COLOR.THEME_LIGHT) ? "dark-content": "light-content";

        return (

            <View style={styles.container}>

                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}/>

                <Text style={customStyle.title}>Passenger</Text>

                <MapArea color_theme={rider_this.state.color_theme}/>

                <SearchArea color_theme={rider_this.state.color_theme}/>

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
    }
});

