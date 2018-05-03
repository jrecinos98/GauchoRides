import React, { Component } from "react";
import { Text, Platform } from "react-native";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import LightTheme from './LightTheme.json';
import DarkTheme from './DarkTheme.json';
import OldTheme from './OldTheme.json';
import { STRING } from '../../Constants';

export default class RideMap extends Component {

    //Get map style based on specific map theme
    getMapStyle(map_theme) {
        switch(map_theme) {
            case STRING.THEME.DARK: return DarkTheme;
            case STRING.THEME.LIGHT: return LightTheme;
            default: return OldTheme;
        }
    }

    selectColor(index) {
        switch(index) {
            case 0: return "red";
            case 1: return "blue";
            case 2: return "yellow";
            case 3: return "black";
            case 4: return "green";
            case 5: return "orange";
            case 6: return "grey";
            case 7: return "pink";
            case 8: return "brown";
            case 9: return "magenta";
            default: return "white";
        }
    }

    getRegion(index) {
        let origin = this.props.coords_list[index][0];
        let destin = this.props.coords_list[index][this.props.coords_list[index].length - 1];

        if (Platform.OS === "ios") {
            return {
                latitude: (origin.latitude + destin.latitude) / 2,
                longitude: (origin.longitude + destin.longitude) / 2,
                latitudeDelta: (origin.latitude - destin.latitude) * 2,
                longitudeDelta: (origin.longitude - destin.longitude) * 2
            }
        }
        else if (Platform.OS === "android") {
            return {
                latitude: (origin.latitude + destin.latitude) / 2,
                longitude: (origin.longitude + destin.longitude) / 2,
                latitudeDelta: Math.abs(origin.latitude - destin.latitude) * 2,
                longitudeDelta: Math.abs(origin.longitude - destin.longitude) * 2
            };
        }
    }

    moveMapCamera(index) {
        this.mapView.animateToRegion(this.getRegion(index));
    }

    render() {

        //Get map theme style
        let mapStyle = this.getMapStyle(this.props.map_theme);

        //Check for null value.
        if (this.props.userLoc == null)
            return null;

        //Return empty map if coords is null
        if (this.props.coords_list == null) {
            return (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: this.props.userLoc.latitude,
                        longitude: this.props.userLoc.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                    customMapStyle={mapStyle}>
                </MapView>
            );
        }

        //Generate polylines
        let polyLines = this.props.coords_list.map((coords, index) => {
            let color = this.selectColor(index);
            let origin = coords[0];
            let destin = coords[coords.length - 1];

            return (
                <View key={index}>

                    <Polyline
                        coordinates={coords}
                        strokeColor={color}
                        strokeWidth={6}/>

                    <Marker
                        coordinate={{
                            latitude: origin.latitude,
                            longitude: origin.longitude
                        }}
                        pinColor={color}
                        onPress={()=>{
                            this.props.onMarkerPress(index);
                            this.moveMapCamera(index);
                        }}/>

                    <Marker
                        style={{flex:1}}
                        coordinate={{
                            latitude: destin.latitude,
                            longitude: destin.longitude
                        }}
                        pinColor={color}
                        onPress={()=>{
                            this.props.onMarkerPress(index);
                            this.moveMapCamera(index);
                        }}>

                        <View style={styles.markerView}>
                            <Ionicons
                                style={[styles.markerIcon, {color: color}]}
                                name='ios-car'/>
                        </View>

                    </Marker>

                </View>);
        });

        //Draw components
        return (

            <MapView
                ref={(instance) => {
                    this.mapView = instance;
                }}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: this.props.userLoc.latitude,
                    longitude: this.props.userLoc.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                customMapStyle={mapStyle}>

                {polyLines}

            </MapView>

        );
    }
}

const styles = {
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    markerText: {
        backgroundColor: '#ffffff',
        padding: 5
    },
    markerIcon: {
        fontSize: 25,
        alignSelf: 'center'
        //position: 'absolute',
        ///left: 3.5
    },
    markerView: {
       // position: 'absolute',
       // alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: 30,
        height: 30,
        borderRadius: 15,
       // left: 15
    }
}
