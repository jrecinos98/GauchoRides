import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';

export default class HistoryScreen extends Component {

	static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor}) => (
				<Ionicons name="md-book" style={{ color: tintColor, fontSize: 20 }} />
			),
            title: 'History',
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
    };

    render() {
        return (
            <View style={styles.container}>
               
            </View>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'center'
	}
});
