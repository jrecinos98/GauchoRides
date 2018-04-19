import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ProfileMain extends React.Component {

    constructor(props){
        super(props);

    }

	render(){
		return(
			<View style = {styles.container}>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'center'
	}

    //backgroundImage: {
    //    flex: 1,
    //    alignSelf: 'stretch',
    //    width: null,
    //    justifyContent: 'center'
    //}




})
