import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

// Map Tutorial: https://www.youtube.com/watch?v=RjW1hMOA9M0&t=178s
export default class App extends React.Component {
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
                    }}
                >
                </MapView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});