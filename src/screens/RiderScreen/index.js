import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';

export default class RiderMain extends Component {

	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Ionicons name="md-body" style={{ color: tintColor }} />
		)
	}

    render() {
        return (
            <View style={styles.container}>
                <MapArea/>
                <SearchArea/>
            </View>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'center'

        
	}
})