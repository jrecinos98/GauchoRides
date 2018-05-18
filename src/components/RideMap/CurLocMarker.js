import React, { Component } from "react";
import { Text, Platform } from "react-native";
import { View } from "native-base";
import { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { STRING } from '../../Constants';

/**
 * A component used to indicate the location of the User in the map. The color is animated by using a timer.
 */
export default class CurLocMarker extends Component {

    static marker_this;

    constructor(props) {
        super(props);
        this.state = {
            color: 0
        };
        marker_this = this;
        this.increment = 10;
    }

    componentDidMount() {
        this.curLocTimer = setInterval(() => {
            marker_this.setState((prevState) => {
            	
            	if (prevState.color + 20 >= 255)
            		increment = -20;
            	if (prevState.color - 20 <= 0)
            		increment = 20;

                return {color: (prevState.color + increment)};
            });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.curLocTimer);
    }

    /**
     * Returns a customized marker image.
     * @returns A component.
     */

    render() {
    	let color = 'rgb(' + (200 - this.state.color) + ',' + (150 - this.state.color) + ',' + this.state.color + ')';

        return (
            <Marker
                style={{flex:1}}
                coordinate={{
                    latitude: this.props.userLoc.latitude,
                    longitude: this.props.userLoc.longitude
                }}>

                <Ionicons
                    style={[styles.markerIcon, {color: color}]}
                    name='ios-disc'/>

            </Marker>

        );
    }
}

const styles = {
    markerIcon: {
        fontSize: 25,
        alignSelf: 'center'
    }
}
