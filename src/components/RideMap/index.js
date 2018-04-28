import React, { Component } from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
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

    selectColor(index){
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
                    <MapView.Marker
                        coordinate={{
                            latitude: origin.latitude,
                            longitude: origin.longitude
                        }}
                        pinColor={color}/>
                    <MapView.Marker
                        coordinate={{
                            latitude: destin.latitude,
                            longitude: destin.longitude
                        }}
                        pinColor={color}/>
                </View>);
        });

        //Draw components
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
    }
}
