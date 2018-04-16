import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import SearchBox from 'Gaucho-Rides/src/components/SearchBox';
import SearchResults from 'Gaucho-Rides/src/components/SearchResults';
//import styles from "./SearchBoxStyles.js";

//Should create another class for this
const mode = 'driving'; // 'walking';
const origin = 'Isla Vista, CA';
const destination = 'San Jose, CA';
const APIKEY = 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw';
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;


class RiderMain extends Component{
	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="md-body" style={{ color: tintColor }} />
		)

	}

	constructor(props) {
        super(props);
        this.state = {
            coords: null
        };

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

            <View style={styles.container}>

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
                        pinColor="blue"
                    />


                    <Polyline
                        coordinates={this.state.coords}
                        strokeColor="#000"
                        strokeColors={[
                            '#7F0000',
                            '#00000000',
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />

                </MapView>
                <SearchBox/>
            </View>

        );
    }
}

export default RiderMain;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})