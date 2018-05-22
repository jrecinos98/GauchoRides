import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ProgressBarAndroid, ScrollView, Button, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';
import PreviewArea from './PreviewArea';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, STRING, DIMENSION } from '../../Constants';
import { getTheme } from '../../Utility';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import CreateRideScreen from "../CreateRideScreen";
import ActionButton from '../../components/ActionButton';
import Controller from './Controller';


export default class HomeScreen extends Component {

    menu = null;

    constructor(props) {
        super(props);

        this.state = {
            color_theme: COLOR.THEME_LIGHT,
            rides: [],
        };

        getTheme((theme) => {
            this.setState({
                color_theme: theme
            });
        });

        this.displaySearch = false;
        this.firstSearch=true;

        Controller.setRef(this, Controller.home);
        console.log(Controller.refs.home);
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="ios-home" style={{ color: tintColor, fontSize: 20 }} />
        )
    };

    navigateScreen(screen) {
        this.props.screenProps.rootNavigation.navigate(screen, {transition: 'vertical'});
    }

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
            options: [styles.options, {
                fontSize: DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,
                color: this.state.color_theme.APP_FOCUS
            }],
            menu: [styles.menu, { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute',
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,

            }],
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: this.state.color_theme.APP_BACKGROUND,
                shadowColor: this.state.color_theme.APP_UNFOCUS
            }]
        };


        let statusTheme = (this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content": "light-content";
        const { navigateToRoot } = this.props.screenProps.rootNavigation.navigate;
        return (

            <View style={styles.container}>

                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}>
                    <Ionicons
                        name='ios-search'
                        style={customStyle.options}
                        onPress={() => {
                            Controller.toggleDisplay();
                        }}/>
                    <Text style={customStyle.title}>Home</Text>
                    <View style={customStyle.menu}>
                        <Menu
                            ref={(instance) => Controller.setRef(instance, Controller.menu)}
                            button={
                                <Ionicons
                                    name='ios-menu'
                                    style={{
                                      fontSize: DIMENSION.ICON.SIZE,
                                      color: this.state.color_theme.APP_FOCUS
                                    }}
                                    onPress={() => Controller.showMenu(true)}/>
                            }>
                            <MenuItem onPress={() => Controller.showMenu(false)} disabled>
                                View in Map
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem onPress={() => {
                                this.navigateScreen('ListScreen');
                                Controller.showMenu(false);
                            }}>View as List</MenuItem>
                        </Menu>
                    </View>

                </View>


                <View style={{flex:1}}>

                    <View style={styles.contentContainer}>
                        <MapArea
                            ref={(instance) => Controller.setRef(instance, Controller.map)}
                            color_theme={this.state.color_theme}
                            onPreview={(rides) => {
                                this.setState({
                                    rides: rides,
                                });
                            }}/>
                        <SearchArea
                            ref={(instance) => Controller.setRef(instance, Controller.search)}
                            color_theme={this.state.color_theme}/>
                    </View>

                    <View style={styles.previewContainer}>
                        <PreviewArea
                            ref={(instance) => Controller.setRef(instance, Controller.preview)}
                            color_theme={this.state.color_theme}
                            rides={this.state.rides}/>
                    </View>

                    <ActionButton
                        ref={(instance) => Controller.setRef(instance, Controller.actionbutton)}
                        color_theme={this.state.color_theme}
                        onRideRequestPress={() => {
                            this.navigateScreen('RequestRide');
                        }}
                        onRideCreatePress={() => {
                            this.navigateScreen('CreateRide');
                        }}
                    />
                </View>
            </View>
        );
    }
}

export const HomeStack = StackNavigator({
        Home: {
            screen: HomeScreen,
        },
        CreateRide: {
            screen: CreateRideScreen,
        }
    },
    {
        headerMode:{
            headerMode: 'screen'
        },

    }

);



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
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    menu: {
       // flex:1,
        paddingLeft: 20,
        paddingTop: null,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    buttonContainer: {
        marginLeft:5,
        marginRight:5,
        marginBottom:0,
        backgroundColor: null,
        borderRadius: 10,
        padding: 10,
        shadowColor: null,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        width: 300,
        height: 100
    },
    previewContainer: {
        flex:1,
        position: 'absolute',
        bottom: 10,
        left: 5,
        right: 5
    }
});
