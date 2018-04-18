import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import RideMap from 'Gaucho-Rides/src/components/RideMap';

export default class MapArea extends Component {

	constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            coords: null
        }
    }

    componentDidMount() {
        this.locateUser();
    }

    locateUser() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                this.createRoute();
            },
            (error) => {
                this.setState({ 
                    error: error.message
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    createRoute() {
        let mode = 'driving'; // 'walking';
        let origin = this.state.latitude + ',' + this.state.longitude;
        let destination = 'Las Vegas, Nevada';
        let APIKEY = 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw';
        let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.routes.length) {
                this.setState({
                    coords: this.decode(responseJson.routes[0].overview_polyline.points)
                });
            }
        }).catch(e => {console.warn(e)});
    }

    // Transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
    decode(t, e) {
        for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
            a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])
        }
        return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
    }

    render() {
        return (
            <RideMap coords={this.state.coords}/>
        );
    }
}
