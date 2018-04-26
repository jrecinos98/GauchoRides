import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class CenterText extends Component{
    render(){
        return(
            <View style={styles.textBox}>
				<Text style={this.props.style}> {this.props.children} </Text>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	textBox: {
		flex: 1,
        // textAlign: 'center',
		justifyContent: 'center'
	}
});
