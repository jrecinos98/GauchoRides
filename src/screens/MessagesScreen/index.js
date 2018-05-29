import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import ListView from '../../components/ListView';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, DIMENSION } from '../../Constants';
import { getTheme } from '../../Utility';
import Database from "../../Database";
import ListItem from "../../components/ListItem"


export default class MessagesScreen extends Component {

    constructor(props) {
        super(props);
        
    }


    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="md-book" style={{ color: tintColor, fontSize: 20 }}
            />
        )
    };
    renderItem = ({item}) => {
        return (
            <ListItem item={item}/>
        )
    };

    render() {

        const customStyle = {

            topBar: [styles.topBar, {
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                
            }],

            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                
            }],

            historyContainer: [styles.historyContainer, {
                marginTop: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT
            }]

        };


        return (
            <View style={styles.container}>
                //<StatusBar barStyle={statusTheme}/>
                <View style={customStyle.topBar}/>
                <Text style={customStyle.title}>Messages</Text>
              

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
