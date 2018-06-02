import React, {Component} from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import styles from "./ListViewStyles.js";
import ListItem from "../ListItem"

/**
 * Container component that displays a ride from the user history.
 */
export default class ListView extends Component {
    /**
     * Initializes the ListView object
     * @param props
     */
    constructor(props) {
        super(props);
    }
    /*
    riderOrDriverImage(){
      if(this.gotData()=="driver"){
        
      }
      else{

      }
    }
    */

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



