
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import Constants from "../../Constants";

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import {getStatusBarHeight} from "react-native-status-bar-height";
import Utility from "../../Utility";


export default class ListScreen extends Component {
    menu = null;

    setMenuRef = ref => {
        this.menu = ref;
    };



    showMenu = () => {
        this.menu.show();
    };

    hideMenu = () => {
        this.menu.hide();
    };

    static rider_this = null;

    constructor(props) {
        super(props);

        rider_this = this;
        rider_this.state = {
            color_theme: Constants.COLOR.THEME_LIGHT,
            rides: [],
            names: [
                {
                    id: 0,
                    name: 'Ben',
                },
                {
                    id: 1,
                    name: 'Susan',
                },
                {
                    id: 2,
                    name: 'Robert',
                },
                {
                    id: 3,
                    name: 'Mary',
                }
            ]
        };

        Utility.getTheme(function(theme) {
            rider_this.setState({
                color_theme: theme
            });
        });
    }
    alertItemName = (item) => {
        window.alert(item.name)
    }
    render() {

        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + Constants.DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: rider_this.state.color_theme.APP_BACKGROUND
            }],
            title: [styles.title, {
                fontSize: Constants.DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.TITLE.SIZE) / 2 - 3,
                color: rider_this.state.color_theme.APP_FOCUS
            }],
            options: [styles.options, {
                fontSize: Constants.DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.ICON.SIZE) / 2,
                color: rider_this.state.color_theme.APP_FOCUS
            }],
            menu: [styles.menu, { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute',
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.ICON.SIZE) / 2,

            }],
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: rider_this.state.color_theme.APP_BACKGROUND,
                shadowColor: rider_this.state.color_theme.APP_UNFOCUS
            }]
        };

        let statusTheme = (rider_this.state.color_theme === Constants.COLOR.THEME_LIGHT) ? "dark-content": "light-content";
        return (
            <View>
                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}>
                    <Ionicons
                        name='ios-search'
                        style={customStyle.options}
                        onPress={() => {
                            this.toggleSearchAndPreview();
                            !this.firstSearch ? this.actionButton.ShowHideButtonComponent() : null;

                        }}/>
                    <Text style={customStyle.title}>List View</Text>
                    <View style={customStyle.menu}>
                        <Menu
                            ref={this.setMenuRef}
                            button={<Ionicons name='ios-menu'
                                              style={{
                                                  fontSize: Constants.DIMENSION.ICON.SIZE,
                                                  color: rider_this.state.color_theme.APP_FOCUS
                                              }}
                                              onPress={this.showMenu}/>}
                        >
                            <MenuItem onPress={rider_this.hideMenu} disabled>View as List</MenuItem>
                            <MenuDivider/>
                            <MenuItem onPress={() => {
                                rider_this.hideMenu();
                                this.props.navigation.goBack(null);

                            }}>
                                View in Map
                            </MenuItem>
                        </Menu>
                    </View>


                </View>
                <View>
                    {
                        this.state.names.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => this.alertItemName(item)}>

                                <Text style={styles.text}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    },
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
