import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ProgressBarAndroid } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, STRING, DIMENSION } from '../../Constants';
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
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: rider_this.state.color_theme.APP_BACKGROUND
            }],
            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: rider_this.state.color_theme.APP_FOCUS
            }],
            options: [styles.options, {
                fontSize: DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,
                color: rider_this.state.color_theme.APP_FOCUS
            }]
        };


        let statusTheme = (rider_this.state.color_theme == COLOR.THEME_LIGHT) ? "dark-content": "light-content";

        return (

            <View style={styles.container}>

                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}>
                    <Ionicons
                        name='ios-options'
                        style={customStyle.options}
                        onPress={() => this.searchArea.ShowHideTextComponentView()}/>
                    <Text style={customStyle.title}>Passenger</Text>
                </View>

                <View style={styles.contentContainer}>

                    <MapArea
                        ref={(instance) => {
                            this.mapArea = instance;
                        }}
                        color_theme={rider_this.state.color_theme}/>
                    <SearchArea
                        ref={(instance) => {
                            this.searchArea = instance;
                        }}
                        onSubmit={(origin, destin)=>{
                            this.mapArea.createRoute(origin.toString(), destin.toString());
                        }}
                        color_theme={rider_this.state.color_theme}/>

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
    contentContainer: {
        flex: 1
    },
    options: {
        paddingRight: 25,
        paddingTop: null,
        fontSize: null,
        color: null,
        alignSelf: 'flex-end',
        position: 'absolute',
    }
});

