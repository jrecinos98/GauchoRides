import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";


const previewWidth = 300;
const previewHeight = 100;
const previewMargin = 5;

export default class PreviewArea extends Component {

	constructor(props) {
        super(props);
        this.state = {
            toDisplay: false
        }
        console.log("???");
    }

    displayComponent(toDisplay) {
        this.setState({
            toDisplay: toDisplay
        });
    }

    getSnapPosition(index) {
        let startPos = index * (previewWidth + 2 * previewMargin);
        let sidePos = (Dimensions.get("window").width - previewWidth - 4 * previewMargin) / 2;
        return startPos - sidePos;
    }

    render() {

        if (!this.state.toDisplay)
            return null;

        const customStyle = {
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: this.props.color_theme.APP_BACKGROUND,
                shadowColor: this.props.color_theme.APP_UNFOCUS
            }],
            buttonText: [styles.buttonText, {
                color: this.props.color_theme.APP_FOCUS
            }]
        };

        //Generate polylines
        let preview_items = this.props.rides.map((preview, index) => {

            return (
                <TouchableOpacity
                    key={index}
                    style={customStyle.buttonContainer}
                    onPress={() => {
                        this.previewBar.scrollTo({x: this.getSnapPosition(index), y: 0, animated: true});
                    }}>

                    <Text style={customStyle.buttonText}>
                        Origin: {preview[0].latitude}, {preview[0].longitude}
                    </Text>

                    <Text style={customStyle.buttonText}>
                        Destination: {preview[preview.length - 1].latitude}, {preview[preview.length - 1].longitude}
                    </Text>

                </TouchableOpacity>
            );
        });

        return (
            <ScrollView
                ref={(instance) => {
                    this.previewBar = instance;
                }}
                style={{flex: 1}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={previewWidth + 2 * previewMargin}
                snapToAlignment={"center"}>
                {preview_items}

            </ScrollView>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft:5,
        marginRight:5,
        marginBottom:0,
        backgroundColor: null,
        borderRadius: 10,
        padding: 10,
        shadowColor: null,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        width: previewWidth,
        height: previewHeight
    },
    buttonText:{
        marginLeft: 10,
        color: null,
        fontWeight: "700",
        textShadowColor:'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    }
});
