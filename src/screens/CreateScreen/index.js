import React, { Component } from "react";
import {StatusBar, View, Text, StyleSheet, Button, Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RideMap } from '../../components/RideMap'; //adding map
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Constants from '../../Constants';
import CreateArea from './CreateArea';
import Utility from '../../Utility';
import Spinner from '../../components/Spinner';


/**
 * A user can specify the details of a ride in this screen and then create a ride in firestore.
 */
export default class CreateScreen extends Component {
	static driver_this = null;

	constructor(props) {
		super(props);
		driver_this = this;

		driver_this.state = {
			color_theme: Constants.COLOR.THEME_LIGHT
		};

		Utility.getTheme(function(theme) {
			driver_this.setState({
				color_theme: theme
			});
		});
	}
	//Render the component
	render() {
		const customStyle = {
			topBar: [styles.topBar, {
				height: getStatusBarHeight() + Constants.DIMENSION.TOPBAR.HEIGHT,
				backgroundColor: driver_this.state.color_theme.APP_BACKGROUND
			}],
			title: [styles.title, {
				fontSize: Constants.DIMENSION.TITLE.SIZE,
				paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.TITLE.SIZE) / 2 - 3,
				color: driver_this.state.color_theme.APP_FOCUS
			}],
			backArrow: [styles.backArrow, {
				fontSize: Constants.DIMENSION.ICON.SIZE,
				paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.ICON.SIZE) / 2,
				color: driver_this.state.color_theme.APP_FOCUS
			}],
		};

		let statusTheme = (driver_this.state.color_theme === Constants.COLOR.THEME_LIGHT) ? "dark-content" : "light-content";
		return (
			<View style={styles.container}>
				<StatusBar barStyle={statusTheme}/>
				<View style={customStyle.topBar}>
					{
						(Platform.OS === 'ios') ?
							<Ionicons
								name='ios-arrow-back'
								style={customStyle.backArrow}
								onPress={() => {
									this.props.navigation.goBack(null);
								}}/>
							: null
					}
					<Text style={customStyle.title}>Create Ride</Text>
				</View>
				<CreateArea
					color_theme={driver_this.state.color_theme}
                    originTag={'Set Pick-Up Location'}
                    destinationTag={'Set Drop-Off Location'}
					onSubmit={(searchInputs, chosenDate, chosenSeats, description, price) => {
                        this.spinner.show(true);
						Utility.createRide(Constants.FIREBASE.RIDES_PATH, searchInputs, chosenDate, chosenSeats, description, price, (successful) => {
                            if (successful) {
                                this.props.navigation.goBack(null);
                                this.spinner.show(false);
                            }
                            else {
                                this.spinner.show(false)
                            }
                        });
					}}/>

				<Spinner ref={(instance) => this.spinner = instance}/>
			</View>
		);
	}
}




//Style sheet for driver main screen.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		// justifyContent: 'center',
		flexDirection: 'column'
	},
	backArrow: {
		paddingLeft: 25,
		paddingTop: null,
		fontSize: null,
		color: null,
		alignSelf: 'flex-start',
		position: 'absolute',
	},
	topBar: {
		backgroundColor: null,
		alignSelf: 'stretch',
		height: null
	},
	title: {
		color: null,
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		fontSize: null,
		paddingTop: null
	}
});
