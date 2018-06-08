import React, { Component } from "react";
import{ View, StyleSheet, StatusBar, Platform, Text, TouchableOpacity, ScrollView, Dimensions, Modal, AsyncStorage } from "react-native";
import Constants from '../../Constants';
import OpacityButton from "../../components/OpacityButton";
import CenterText from "../../components/CenterText";
import { Ionicons } from '@expo/vector-icons';
import { MainScreenInstance } from "../Main";
import Utility from '../../Utility';
import Database from '../../Database';


//import Messenger from "../../components/Messenger";

export default class MessagesScreen extends Component {

    static settings_this = null;

    constructor(props) {
        super(props);
        settings_this = this;

        settings_this.state = {
            tabIndex: 0,
            color_theme: Constants.COLOR.THEME_LIGHT
        };

        Utility.getTheme(function(app_theme) {
            settings_this.setState({
                color_theme: app_theme
            });
        });
    }
    changeAppTheme(appTheme) {
        AsyncStorage.setItem(Constants.STRING.KEY.APP_THEME, appTheme);
        MainScreenInstance.updateTheme();
    }

    changeMapTheme(mapTheme) {
        AsyncStorage.setItem(Constants.STRING.KEY.MAP_THEME, mapTheme);
        MainScreenInstance.updateTheme();
    }

    render(){

        const customStyle = {

            themeTab: [styles.themeTab, {
                backgroundColor: settings_this.state.color_theme.BUTTON,
                shadowColor: settings_this.state.color_theme.APP_FOCUS
            }],

            buttonClose: [styles.buttonClose, {
                color: settings_this.state.color_theme.APP_FOCUS
            }],

            titleText: [styles.titleText, {
                color: settings_this.state.color_theme.APP_FOCUS
            }],

            divider: [styles.divider, {
                borderBottomColor: settings_this.state.color_theme.BUTTON
            }]

        };

        return(

          <View style={ styles.container}>
                <ScrollView
                    style={{
                        padding: 20,
                        backgroundColor: (settings_this.state.color_theme)? settings_this.state.color_theme.APP_BACKGROUND: null
                    }}>


                    <View style={styles.titleBar}>
                        <Ionicons
                            name="ios-close"
                            style={customStyle.buttonClose}
                            onPress={() => {
                                this.props.navigation.goBack(null)
                            }}/>

                        <CenterText style={customStyle.titleText}> Messages </CenterText>
                    </View>

                    
                    <CenterText style={customStyle.titleText}> Coming Up In The Future!</CenterText>

                    <View style={styles.themeBox}>


                    </View>


                   
                </ScrollView>
          </View>
        );
    }

}


const wipeLogout ={
    type: 'Navigation/NAVIGATE',
    routeName: 'RootStack',
    actions: {
        type: 'Navigation/NAVIGATE',
    }
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: null,
        flex: 1,

    },
    buttonText: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontWeight: "700",
        textShadowColor:'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    themeBox: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width / 16,
        marginRight: Dimensions.get('window').width / 16,
        marginTop: 10,
        marginBottom: 10,
        //outline: 1,
        zIndex: 5
    },
    themeTab: {
        width: Dimensions.get('window').width / 4,
        height: 50,
        backgroundColor: null,
        borderRadius: 5,
        shadowColor: null,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    buttonClose: {
        color: null,
        fontSize: 50,
        width: 100
    },
    titleBar: {
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 20,
        color: null
    },
    divider: {
        borderBottomColor: null,
        borderBottomWidth: 1,
        marginLeft: Dimensions.get('window').width / 16,
        marginRight: Dimensions.get('window').width / 16,
        marginTop: 20,
        marginBottom: 20
    }
});
