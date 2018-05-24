import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";


export default class CenterText extends Component {

	render(){
		const customStyle = {
			tagStyle: [styles.tagStyle, {
				backgroundColor: this.props.color_theme.BGCOLOR,
				borderColor: this.props.color_theme.BGCOLOR,
			}]
		};

		let tags = Object.keys(this.props.tags);
		let tagsDisplay = tags.map((tag, index) => {

			return (
				<View
					style={customStyle.tagStyle}
					key={index}>
					
					<Text> {tag} ({this.props.tags[tag]}) </Text>
				</View>
			);
		});

		return(
			<ScrollView style={{flex: 1}} pagingEnabled={true}>
				<View style={styles.tagContainer}>
					{tagsDisplay}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	tagContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 30,
		marginRight: 30,
		flexWrap: 'wrap',
		justifyContent: "center"
	},
	tagStyle: {
		margin: 3,
		padding: 3,
		borderRadius: 3
	}
});
