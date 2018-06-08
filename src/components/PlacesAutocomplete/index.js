import React, { Component } from "react";
import { View, InputGroup, Input } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOG_APIKEY} from '../../Constants'


/**
 * Component used to Provide auto complete options for a user when searching for a location.
 */
export default class PlacesAutocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			inputArray: {},
			coords: {},
			staticMap: ""
		};
	}
	render(){
		return (
			<View style={styles.container}>
				<GooglePlacesAutocomplete
				//  predefinedPlaces={[homePlace, workPlace]}
					placeholder={this.props.tag}
					minLength={4}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row => row.description}
					styles={styles.searchBox}
					currentLocation={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					getDefaultValue={() => ''}
					onPress={(data, details) => {
						this.setState(
							{
								input: data.description,
								inputArray: data.terms,
								coords: details.geometry.location,
								staticMap: details.icon
						});
						this.props.onPress(this.state);

					}}
					query={{
						key: GOOG_APIKEY,
						language: 'en',
						types: 'geocode',
						components: 'country:us|country:mx|country:ca|country:sv|country:gt',
						radius: "2000"
					}}
					GooglePlacesSearchQuery={{
						rankby: 'distance',
						keyword: 'address'
					}}
					renderLeftButton={() =>
						<Ionicons name="ios-search" size={15} color="#FF5E3A" style={styles.searchIcon}/>
					}
				/>
			</View>
				)
	}
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    searchBox: {
        textInputContainer: {
            backgroundColor:"#ffffff",
            opacity:0.7,
            borderRadius:7,
            height: 50
        },
        textInput: {
            height: 48,
            marginTop:0,
            color: '#000000'
        },
        description: {
            fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
            color: '#000000'
        },
        container: {
            marginLeft:15,
            marginRight:10,
            marginTop:0,
            marginBottom:5,
            backgroundColor:"#ffffff",
            opacity:0.7,
            borderRadius:7
        }
    },
    searchIcon: {
        alignSelf: 'center',
        left: 5
    }
};
