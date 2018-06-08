import React, {Component} from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import styles from "./ListViewStyles.js";

/**
 * Container component that displays items pass to it as a data prop.
 */
export default class ListView extends Component {
    /**
     * Initializes the ListView object
     * @param props
     */
    constructor(props) {
        super(props);
    }

    renderSeparator = () => {
        return (
            <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}>
            </View>
        )
    };


    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>{this.props.title}</Text>

                 <FlatList
                    data={this.props.data}
                    renderItem={this.props.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    extraData={this.refreshing}
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                />

            </View>

        );
    }
}



