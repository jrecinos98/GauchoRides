import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';


import SearchBox from 'Gaucho-Rides/src/components/SearchBox';
import SearchResults from 'Gaucho-Rides/src/components/SearchResults';
import RideMap from 'Gaucho-Rides/src/components/RideMap';
//import styles from "./SearchBoxStyles.js";


export default class RiderMain extends Component {

	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="md-body" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
        super(props);

        let mode = 'driving'; // 'walking';
        let origin = 'Isla Vista, CA';
        let destination = 'Las Vegas, Nevada';
        let APIKEY = 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw';
        this.url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    }

    render() {
        return (

            <View style={styles.container}>
                <RideMap url={this.url}/>
                <SearchBox/>
            </View>

        );
    }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})