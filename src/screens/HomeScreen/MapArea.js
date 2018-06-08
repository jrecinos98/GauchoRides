import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import RideMap from '../../components/RideMap';
import Utility from '../../Utility';
import Constants  from '../../Constants';
import Location from '../../actors/Location';
import Controller from './Controller';


/**
 * Area in the HomeScreen where the map is shown.
 */
export default class MapArea extends Component {

    static mapArea_this;

	constructor(props) {
        super(props);

        this.state = {
            userLoc: null,
            error: null,
            ride_list: [],
            map_theme: Constants.STRING.THEME.DARK
        }

        //Get map theme
        mapArea_this = this;
        Utility.getMapTheme(function(map_theme) {
            mapArea_this.setState({
                map_theme: map_theme
            });
        });
    }

    componentDidMount() {
        this.locateUser();
    }

    locateUser() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (this.rideMap != null) {
                    this.setState({
                        userLoc: new Location(position.coords.latitude, position.coords.longitude)
                    });
                }
            },
            (error) => {
                if(this.rideMap !== null) {
                    this.setState({
                        error: error.message
                    });
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    //Get route from google direction api
    dropPins(rideList){
        this.setState({ride_list: rideList});
        this.props.onPreview(rideList);
    }

    //Draw components
    render() {

        return (
            <RideMap
                ref={(instance) => {
                    this.rideMap = instance;
                }}
                map_theme={this.state.map_theme}
                userLoc={this.state.userLoc}
                ride_list={this.state.ride_list}
                onMarkerPress={(index)=> Controller.focusPreview(index)}/>
        );
    }
}
