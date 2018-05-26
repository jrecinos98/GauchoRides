import React, { Component } from "react";
import { Text,TextInput } from "react-native";
import { View, InputGroup, Input } from "native-base";



export default class CreateRideDescription extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	render() {
		return (
			<View style={styles.secondInputWrapper}>
				<Text style={styles.label}>Price</Text>
				<View style={styles.switchWrapper}>
					<TextInput
        				style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        				onChangeText={(text) => this.setState({text})}
        				value={this.state.text}
      				/>

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
				marginBottom:5,
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
