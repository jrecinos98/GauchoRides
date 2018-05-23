import React, { Component } from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';


export default class DirectRideSwitch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			directRide: true
		};
	}

	render() {
		return (
			<View style={styles.secondInputWrapper}>
				<Text style={styles.label}>Direct Rides Only</Text>
				<View style={styles.switchWrapper}>
					<Switch
						value={this.state.directRide}
						onValueChange={(val) => {this.setState({directRide: val})}}
						disabled={false}
						activeText={"ON"}
						inActiveText={"OFF"}
						backgroundActive={'green'}
						backgroundInactive={'gray'}
						changeValueImmediately={true}/>
				 </View>
			</View>
		);
	}
}

const styles = {
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    },
    switchWrapper: {
        margin: 10
    }
}