import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';
import PreviewArea from './PreviewArea';
import { StackNavigator } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Constants from '../../Constants';
import Utility from '../../Utility';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import CreateScreen from "../CreateScreen";
import ActionButton from '../../components/ActionButton';
import Controller from './Controller';
import Spinner from '../../components/Spinner';

/**
 * This screen is where a user can search for a ride and also enter the create ride or create request screen.
 */
export default class HomeScreen extends Component {

    menu = null;

    constructor(props) {
        super(props);

        this.state = {
            color_theme: Constants.COLOR.THEME_CLASSIC,
            rides: [],
        };

        Utility.getTheme((theme) => {
            if (this.refs.classRef) {
                this.setState({
                    color_theme: theme
                });
            }
        });

        Controller.initialize();
        Controller.setRef(this, Controller.home);
    }


    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Image
                source={require("../../../public/assets/car_search.png")}
                style={{
                    tintColor: tintColor,
                    width: 24,
                    height: 24,
                    resizeMode: "contain"

                }}
            />)
    };

    navigateScreen(screen) {
        this.props.screenProps.rootNavigation.navigate(screen, {transition: 'vertical'});
    }

    render() {

        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + Constants.DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: this.state.color_theme.APP_BACKGROUND
            }],
            title: [styles.title, {
                fontSize: Constants.DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.TITLE.SIZE) / 2 - 3,
                color: this.state.color_theme.APP_FOCUS
            }],
            options: [styles.options, {
                fontSize: Constants.DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.ICON.SIZE) / 2,
                color: this.state.color_theme.APP_FOCUS
            }],
            menu: [styles.menu, { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute',
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.ICON.SIZE) / 2,

            }],
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: this.state.color_theme.APP_BACKGROUND,
                shadowColor: this.state.color_theme.APP_UNFOCUS
            }]
        };


        let statusTheme = (this.state.color_theme === Constants.COLOR.THEME_LIGHT) ? "dark-content": "light-content";
        const { navigateToRoot } = this.props.screenProps.rootNavigation.navigate;
        return (

            <View
                ref="classRef"
                style={styles.container}>

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
                                      fontSize: Constants.DIMENSION.ICON.SIZE,
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
                            color_theme={this.state.color_theme}
                            originTag={'Choose Pick-Up Location'}
                            destinationTag={'Choose Drop-Off Location'}
                            switchLabel= {"Direct Rides Only"}

                        />
                    </View>

                    <View style={styles.previewContainer}>
                        <PreviewArea
                            ref={(instance) => Controller.setRef(instance, Controller.preview)}
                            color_theme={this.state.color_theme}
                            rides={this.state.rides}
                            screenProps={this.props.screenProps}/>
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

                    <Spinner ref={(instance) => Controller.setRef(instance, Controller.spinner)}/>

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
            screen: CreateScreen,
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
