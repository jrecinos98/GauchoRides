import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ScrollView, RefreshControl, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import ListView from '../../components/ListView';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
import Utility from '../../Utility';
import Database from "../../Database";
import ListItem from "../../components/ListItem"


export default class HistoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            requests: [],
            color_theme: COLOR.THEME_CLASSIC,
            refreshing: false
        };
        Utility.getTheme((theme) => {
            this.setState({
                color_theme: theme
            });
        });
        this.refreshing= false;


    }

    componentDidMount(){
        this._onRefresh();
    }

    _onRefresh(){
        this.setState({refreshing: true});
        Database.getUserHistory((list, list2, requestList) => {
            this.setState({refreshing: false, data: list, data2: list2, requests: requestList});
        })

    }


    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Image
                source={require("../../../public/assets/info_book.png")}
                style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                    resizeMode: "contain"

                }}
            />)
    };


    renderOnGoing = ({item}) => {
        return (
            <ListItem
                item={item}
                itemBgColor={"#e9e9e9"}
                filePath={require("../../../public/assets/car_unchecked.png")}
                filePath2={require("../../../public/assets/home_icon.png")}
                filePath3={require("../../../public/assets/hitchHiker.png")}
                imageStyle={styles.upcomingStyle}
                onPress={() => {
                    this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: item});
                }}/>
        )
    };
    renderCompleted = ({item}) => {
        return (
            <ListItem
                item={item}
                itemBgColor={"#e9e9e9"}
                imageStyle={styles.pastStyle}
                filePath={require("../../../public/assets/completed_ride.png")}
                onPress={() => {
                    this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: item});
                }}/>
        )
    };
    renderRequests = ({item}) => {
        return(
            <ListItem
                item={item}
                itemBgColor={"#e9e9e9"}
                imageStyle={styles.requestStyle}
                filePath={require("../../../public/assets/request_hand.png")}
                onPress={() => {
                    //this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: item});
                }}/>
        )
    };

    render() {

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

            historyContainer: [styles.historyContainer, {
                marginTop: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT
            }]

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
                        style={styles.upcomingListStyle}
                        renderItem={this.renderOnGoing}
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
                        renderItem={this.renderCompleted}
                        data={this.state.data2}
                        refreshing={this.refreshing}
                        onRefresh={() => {
                            Database.getUserHistory((list) => {
                                if (this.state.data2.length !== list.length)
                                    this.setState({data2: list});
                            })
                        }}
                    />
                    <ListView
                        title={"Requested Rides"}
                        style={styles.requestedListStyle}
                        renderItem={this.renderRequests}
                        data={this.state.requests}
                        refreshing={this.refreshing}
                        onRefresh={() => {
                            Database.retrieveUserRequests((list) => {
                                if (this.state.data.length !== list.length)
                                    this.setState({requests: list});
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
        flexDirection: 'column',
    },
    upcomingStyle: {
        width: 55,
        height: 55,
        resizeMode: "contain",
        tintColor: "red",

    },
    pastStyle: {
        width: 65,
        height: 65,
        resizeMode: "contain",
        tintColor: "green"
    },
    requestStyle: {
        width: 65,
        height: 65,
        resizeMode: "contain",
        //tintColor: "green"
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null
    },
    rideHistStyle: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain',
        marginTop: "10",
    },
    upcomingListStyle: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain',
        marginTop: "10"
    },
    requestedListStyle: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain',
        marginTop: "10"
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
