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
import ActionButton from 'react-native-action-button';
import CreateRideScreen from "../CreateRideScreen";


export default class HomeScreen extends Component {

    static rider_this = null;

    constructor(props) {
        super(props);

        rider_this = this;
        rider_this.state = {
            color_theme: COLOR.THEME_LIGHT,
            rides: []
        };

        getTheme(function(theme) {
            rider_this.setState({
                color_theme: theme
            });
        });

        this.displaySearch = true;
    }


    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Ionicons name="ios-home" style={{ color: tintColor, fontSize: 20 }} />
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
            }],
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: rider_this.state.color_theme.APP_BACKGROUND,
                shadowColor: rider_this.state.color_theme.APP_UNFOCUS
            }]
        };


        let statusTheme = (rider_this.state.color_theme === COLOR.THEME_LIGHT) ? "dark-content": "light-content";
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>

                <StatusBar barStyle={statusTheme}/>

                <View style={customStyle.topBar}>

                    <Ionicons
                        name='ios-search'
                        style={customStyle.options}
                        onPress={() => {
                            this.searchArea.ShowHideTextComponentView();
                            this.displaySearch = !this.displaySearch;
                            this.previewArea.displayComponent(!this.displaySearch);
                        }}/>
                    <Text style={customStyle.title}>Passenger</Text>
                </View>


                <View style={styles.contentContainer}>

                    <MapArea
                        ref={(instance) => {
                            this.mapArea = instance;
                        }}
                        onPreview={(rides) => {
                            this.setState({
                                rides: rides
                            });
                        }}
                        onMarkerPress={(index) => {
                            this.previewArea.previewBar.scrollTo({x: this.previewArea.getSnapPosition(index), y: 0, animated: true});
                        }}
                        color_theme={rider_this.state.color_theme}>

                    </MapArea>
                    <SearchArea
                        ref={(instance) => {
                            this.searchArea = instance;
                        }}
                        onSubmit={(origin, destin)=>{
                            this.mapArea.createRoute(origin.toString(), destin.toString());
                            this.displaySearch = !this.displaySearch;
                            this.previewArea.displayComponent(!this.displaySearch);
                        }}
                        color_theme={rider_this.state.color_theme}/>
                    <ActionButton style={styles.actionButtonStyle} buttonColor={rider_this.state.color_theme.APP_FOCUS}>
                        <ActionButton.Item
                            buttonColor= {rider_this.state.color_theme.APP_FOCUS}
                            title={"Request ride"}
                            onPress={() => {}}
                        >
                            <Ionicons name="ios-add" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor= {rider_this.state.color_theme.APP_FOCUS}
                            title={"Add ride"}
                            onPress={() => {
                                this.props.screenProps.rootNavigation.navigate("CreateRide") }}>
                            <Ionicons name="ios-car" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>

                </View>

                <View style={styles.previewContainer}>
                    <PreviewArea
                        ref={(instance) => {
                            this.previewArea = instance;
                        }}
                        onPreviewPress={(index) => {
                            this.mapArea.rideMap.moveMapCamera(index);
                        }}
                        color_theme={this.state.color_theme}
                        rides={this.state.rides} />
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
        navigationOptions:  {
            //headerLeft: null
           // header: { visible:false }
        }
    }
    /*
   RequestRide: {
       screen: RequestScreen
   }*/
);
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
        paddingLeft: 25,
        paddingTop: null,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    actionButtonStyle: {
        paddingRight: 25,
        paddingTop: null,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
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
