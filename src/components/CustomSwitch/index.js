import React, { Component } from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';


export default class CustomSwitch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			switchState: true
		};
	}

	render() {
		return (

			<View style={styles.secondInputWrapper}>
                <Text style={styles.label}>{this.props.label}</Text>
				<View style={styles.switchWrapper}>
					<Switch
						value={this.state.switchState}
						onValueChange={(val) => {this.setState({switchState: val})}}
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
		marginBottom:5,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7,

        //textAlign: "center"
    },
    label:{
        fontSize:12,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0,
		margin: 10
    },
    switchWrapper: {
        margin: 10,
    }
}
