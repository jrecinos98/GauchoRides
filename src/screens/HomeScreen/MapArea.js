import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import RideMap from '../../components/RideMap';
import { getMapTheme } from '../../Utility';
import { STRING } from '../../Constants';
import Location from '../../actors/Location';
import Controller from './Controller';


export default class MapArea extends Component {

    static mapArea_this;

	constructor(props) {
        super(props);

        this.state = {
            userLoc: null,
            error: null,
            ride_list: [],
            map_theme: STRING.THEME.DARK
        }

        //Get map theme
        mapArea_this = this;
        getMapTheme(function(map_theme) {
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

                    //Create test routes
                    // this.createRoute(this.state.userLoc.toString(), 'San Diego, California');
                    // this.createRoute(this.state.userLoc.toString(), 'San Jose, California');
                    // this.createRoute(this.state.userLoc.toString(), 'Las Vegas, California');
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

    //Transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
    decode(t, e) {
        for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
            a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])
        }
        return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
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
                onMarkerPress={(index)=> Controller.focusRide(index)}/>
        );
    }
}
