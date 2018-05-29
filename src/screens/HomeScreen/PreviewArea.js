import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { DIMENSION } from '../../Constants';
import Controller from './Controller';
import { formatDate } from '../../Utility';


export default class PreviewArea extends Component {

	constructor(props) {
        super(props);
        this.state = {
            toDisplay: false
        }
    }

    show(toDisplay) {
        this.setState({
            toDisplay: toDisplay
        });
    }

    getSnapPosition(index) {
        let startPos = index * (DIMENSION.PREVIEW.WIDTH + 2 * DIMENSION.PREVIEW.MARGIN);
        let sidePos = (Dimensions.get("window").width - DIMENSION.PREVIEW.WIDTH - 4 * DIMENSION.PREVIEW.MARGIN) / 2;
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
            dataKey: [styles.dataKey, {
                color: this.props.color_theme.APP_FOCUS
            }],
            dataValue: [styles.dataValue, {
                color: this.props.color_theme.APP_FOCUS
            }],
            expandButton: [styles.expandButton, {
                backgroundColor: this.props.color_theme.APP_BACKGROUND
            }],
            expandIcon: [styles.expandIcon, {
                color: this.props.color_theme.APP_FOCUS
            }]
        };

        //Generate polylines
        let preview_items = this.props.rides.map((ride, index) => {

            return (
                <View
                    key={index}
                    style={styles.previewContainer}>

                    <TouchableOpacity
                        style={customStyle.expandButton}
                        onPress={() => {
                            this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: ride});
                        }}>
                        <Ionicons name="ios-arrow-up" style={customStyle.expandIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={index}
                        style={customStyle.buttonContainer}
                        onPress={() => {
                            this.previewBar.scrollTo({x: this.getSnapPosition(index), y: 0, animated: true});
                            Controller.focusRide(index);
                        }}>

                        <View style={styles.dataRow}>
                            <Text style={customStyle.dataKey}> Driver: </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={customStyle.dataValue}>
                                {ride.driver}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={customStyle.dataKey}> Time: </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={customStyle.dataValue}>
                                {formatDate(new Date(ride.time))}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={customStyle.dataKey}> Price: </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={customStyle.dataValue}>
                                ${(ride.price) ? ride.price : 0}
                            </Text>
                        </View>

                        <View style={styles.dataRow}>
                            <Text style={customStyle.dataKey}> Seats: </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={customStyle.dataValue}>
                                {ride.seats - ((ride.passengers) ? ride.passengers.length : 0)} / {ride.seats}
                            </Text>
                        </View>

                    </TouchableOpacity>

                </View>
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
                snapToInterval={DIMENSION.PREVIEW.WIDTH + 2 * DIMENSION.PREVIEW.MARGIN}
                snapToAlignment={"center"}>

                {preview_items}

            </ScrollView>
        );
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    buttonContainer: {
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
        width: DIMENSION.PREVIEW.WIDTH,
        height: DIMENSION.PREVIEW.HEIGHT
    },
    dataRow: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    dataKey:{
        color: null,
        fontWeight: "700",
        width: 70
    },
    dataValue: {
        color: null,
        fontWeight: "700",
        flex: 1,
        alignSelf: 'stretch'
    },
    previewContainer: {
        marginLeft:5,
        marginRight:5,
        marginBottom:0,
        width: DIMENSION.PREVIEW.WIDTH,
        height: DIMENSION.PREVIEW.HEIGHT + 22
    },
    expandButton: {
        height: 20,
        marginBottom: 2,
        backgroundColor: null,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    expandIcon: {
        color: null,
        fontSize: 20
    }
});
