import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ScrollView, RefreshControl, Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import ListView from '../../components/ListView';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
import Utility from '../../Utility';
import Database from "../../Database";
import IncompleteRide from "../../components/IncompleteRide";

export default class RequestScreen extends Component{
	  constructor(props) {
        super(props);
        this.state = {
            data: [],
            color_theme: COLOR.THEME_LIGHT,
            refreshing: false
        };
        Utility.getTheme(function(theme) {
            this.setState({
                color_theme: theme
            });
        });
        this.refreshing= false;
        Database.getUserHistory((list, list2) => {
            this.setState({data: list, data2: list2});
        });

    }

    _onRefresh(){
        this.setState({refreshing: true});
        Database.getUserHistory((list, list2) => {
            this.setState({refreshing: false, data: list, data2: list2});
        })

    }
    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Image
                source={require("../../../public/assets/car_plus.png")}
                style={{
                    tintColor: tintColor,
                    width: 24,
                    height: 24, }}/>
        )
    };

    renderItem = ({item}) => {
        return (
            <IncompleteRide
                item={item}
                onPress={() => {
                    this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: item});
                }}/>
        )
    };

    render(){
        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: this.state.color_theme.APP_BACKGROUND
            }],
            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: this.state.color_theme.APP_FOCUS
            }],
        };
        let statusTheme = (this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content" : "light-content";

        return (
            <View style={styles.container}>
                <StatusBar barStyle={statusTheme}/>
                <View style={customStyle.topBar}/>
                <Text style={customStyle.title}>History</Text>

                <ScrollView

                    style={styles.historyContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}/>
                    }>

                    <ListView
                        title={"Upcoming Rides"}
                        style={styles.rideHistStyle}
                        renderItem={this.renderItem}
                        data={this.state.data}
                        refreshing={this.refreshing}
                        onRefresh={() => {
                            Database.getUserHistory((list) => {
                                if (this.state.data.length === list.length) {
                                }
                                else {
                                    this.setState({data: list})
                                }
                            })
                        }}
                    />

                    <ListView
                        title={"Completed Rides"}
                        style={styles.rideHistStyle}
                        renderItem={this.renderItem}
                        data={this.state.data2}
                        refreshing={this.refreshing}
                        onRefresh={() => {
                            Database.getUserHistory((list) => {
                                if (this.state.data2.length === list.length) {
                                }
                                else {
                                    this.setState({data2: list})
                                }
                            })
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}
//var width=Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null
    },
    rideHistStyle: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain'
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