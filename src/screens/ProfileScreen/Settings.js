import React, { Component } from "react";
import{ View, StyleSheet, Platform, Text, TouchableOpacity, ScrollView, Dimensions, Modal, AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import { COLOR, STRING } from '../../Constants';
import { StackNavigator, NavigationActions } from 'react-navigation';
import User from "../../../src/actors/User";
import LoginButton from "../../components/LoginButton";
import CenterText from "../../components/CenterText";
import { Ionicons } from '@expo/vector-icons';


export default class Settings extends Component{

	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0,
			visible: false,
			background: null
		};
		this.updateTheme();
	}

	setModalVisible(visible) {
		this.setState({
			visible: visible
		});
	}

	updateTheme() {
		AsyncStorage.getItem(STRING.THEME.KEY).then((value) => {

			if (value === STRING.THEME.DARK) {
				this.setState({
					background: COLOR.THEME_DARK.APP_BACKGROUND
				});
			}
			else if (value === STRING.THEME.LIGHT) {
				this.setState({
					background: COLOR.THEME_DARK.APP_UNFOCUS
				});
			}
			else {
				this.setState({
					background: COLOR.THEME_DARK.APP_TITLE
				});
			}
		});
	}

	render(){
		return(
			<Modal
				visible={this.state.visible}
				transparent={false}
				animationInTiming={300}
				animationIn={'slideInUp'}
				animationOut={'slideOutDown'}
				onRequestClose={() => {
					alert('exit setting');
				}}>

				<ScrollView
					style={{
						padding: 20,
						backgroundColor: this.state.background
					}}>


					<View style={styles.titleBar}>
						<Ionicons
							name="ios-close"
							style={styles.buttonClose}
							onPress={() => {
								this.setModalVisible(false);
							}}/>

						<CenterText style={styles.titleText}> Settings </CenterText>
					</View>


					<CenterText style={styles.titleText}> App Themes: </CenterText>
					<View style={styles.themeBox}>

						<TouchableOpacity
							style={styles.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.DARK);
								this.updateTheme();
							}}>
							<Text style={styles.buttonText}> Dark </Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.LIGHT);
								this.updateTheme();
							}}>
							<Text style={styles.buttonText}> Light </Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.CLASSIC);
								this.updateTheme();
							}}>
							<Text style={styles.buttonText}> Classic </Text>
						</TouchableOpacity>

					</View>


					<View style={styles.divider}/>
					<CenterText style={styles.titleText}> Map Themes: </CenterText>
					<View style={styles.themeBox}>

						<TouchableOpacity style={styles.themeTab}>
							<Text style={styles.buttonText}> Dark </Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.themeTab}>
							<Text style={styles.buttonText}> Light </Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.themeTab}>
							<Text style={styles.buttonText}> Classic </Text>
						</TouchableOpacity>

					</View>


					<View style={styles.divider}/>
					<CenterText style={styles.titleText}> App Exit: </CenterText>
					<LoginButton
						title="Logout"
						callback={async () => {
							await firebase.auth().signOut();
							this.props.navigation.dispatch(wipeLogout);
						}}/>


				</ScrollView>
			</Modal>
		);
	}

}


const wipeLogout ={
	type: 'Navigation/NAVIGATE',
	routeName: 'LoggedInStack',
	actions: {
		type: 'Navigation/NAVIGATE',
	}
};



const styles = StyleSheet.create({
	buttonText: {
		textAlign: 'center',
		color: "#FFFFFF",
		fontWeight: "700",
		textShadowColor:'rgba(0, 0, 0, 0.7)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 10,
	},
	themeBox: {
		flexDirection: 'row',
		marginLeft: Dimensions.get('window').width / 16,
		marginRight: Dimensions.get('window').width / 16,
		marginTop: 10,
		marginBottom: 10,
		//outline: 1,
		zIndex: 5
	},
	themeTab: {
		width: Dimensions.get('window').width / 4,
		height: 50,
		backgroundColor: COLOR.THEME_DARK.BUTTON,
		borderRadius: 5,
		shadowColor: COLOR.THEME_DARK.APP_FOCUS,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 0.25,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 5,
		marginRight: 5
	},
	buttonClose: {
		color: COLOR.THEME_DARK.APP_FOCUS,
		fontSize: 50,
		width: 100
	},
	titleBar: {
		flexDirection: 'row'
	},
	titleText: {
		fontSize: 20,
		color: COLOR.THEME_DARK.APP_FOCUS
	},
	divider: {
	    borderBottomColor: COLOR.THEME_DARK.BUTTON,
	    borderBottomWidth: 1,
	    marginLeft: Dimensions.get('window').width / 16,
	    marginRight: Dimensions.get('window').width / 16,
	    marginTop: 20,
	    marginBottom: 20
	}
});
