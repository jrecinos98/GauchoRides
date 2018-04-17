import React, { Component } from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";
import styles from "./MapStyles";

export default class RideMap extends Component {


	constructor(props) {

        super(props);

        /*
        this.state = {
            coords: null
        };
        
        console.log("RideMap URL: " + props.url)
        */
    }

    render() {
        console.log("this is the index render")
        return (

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 34.4133,
                    longitude: -119.8610,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}>

                <MapView.Marker
                    coordinate={{
                        latitude: 34.4133,
                        longitude: -119.8610
                    }}
                    pinColor="blue"/>

                <Polyline
                    coordinates={this.props.coords}
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
