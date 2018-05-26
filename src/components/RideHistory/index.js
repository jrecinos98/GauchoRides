import React, {Component} from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import styles from "./RideHistoryStyles.js";
import Database from '../../Database';
import ListItem from "../ListItem"

/**
 * Container component that displays a ride from the user history.
 */
export default class RideHistory extends Component {
    /**
     * Initializes the RideHistory object
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            seed: 1,
            error: null,
            loading: false,

        };
    }
    /*
    riderOrDriverImage(){
      if(this.gotData()=="driver"){
        
      }
      else{

      }
    }
    */



    renderItem = ({item}) => {
        return (
            <ListItem item={item}/>
        )
    };

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

                <Text style={styles.title}>Drive History</Text>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                    extraData={this.refreshing}
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                />


            </View>


        );
    }
}



