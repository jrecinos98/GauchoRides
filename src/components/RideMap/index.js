import React, { Component } from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import DarkTheme from './DarkTheme.json';
import styles from "./MapStyles";

export default class RideMap extends Component {


    render() {

        // Temporary check for null value.
        if (this.props.origin_latitude == null || this.props.origin_longitude == null)
            return null;

        if (this.props.coords == null) {
            return (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: this.props.origin_latitude,
                        longitude: this.props.origin_longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                    customMapStyle={DarkTheme}>
                </MapView>
            );
        }

        let coords = this.props.coords;
        let origin = coords[0];
        let destin = coords[coords.length - 1]
        return (

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                customMapStyle={DarkTheme}>

                <MapView.Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude
                    }}
                    pinColor="black"/>

                <MapView.Marker
                    coordinate={{
                        latitude: destin.latitude,
                        longitude: destin.longitude
                    }}
                    pinColor="blue"/>

                <Polyline
                    coordinates={coords}
                    strokeColor="#000"
                    strokeColors={[
                        '#7F0000',
                        '#00000000',
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={6}/>

            </MapView>

        );
    }
}
