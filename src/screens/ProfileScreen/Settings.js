import React, { Component } from "react";
import{ View, StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';

export default class Settings extends Component{

	static navigationOptions = {
        title: 'Settings',
		headerStyle: {
			backgroundColor: COLOR_APP_BACKGROUND
		},
		headerTitleStyle: {
			color: COLOR_APP_TITLE,
			textAlign: 'center',
			alignSelf: 'center',
			flex: 1,
			fontWeight: 'normal'
        }
	};

	render(){
		return(
			<TouchableOpacity
                style={styles.buttonLogout}
                onPress={async () => {
				    try {
				        await firebase.auth().signOut();
				        this.props.navigation.navigate('../NewUserScreen', {name: "NewUserScreen"});
				    } catch (e) {
				        console.log(e);
				    }
				}}>
                <Text> Facebook Logout </Text>
            </TouchableOpacity>
		);

	}
}

const styles = StyleSheet.create({
	buttonLogout: {
        paddingVertical: 15,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#0d47a1',
        borderRadius: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
	}
});
