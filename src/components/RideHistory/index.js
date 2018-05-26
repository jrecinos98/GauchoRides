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
            refreshing: false

        };
    }

    errData(err) {
        console.log('Error!');
        console.log(err);
    }

    /*
    riderOrDriverImage(){
      if(this.gotData()=="driver"){
        
      }
      else{

      }
    }
    */

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({loading: true});
        this.setState({loading: false, refreshing: false});
        fetch(Database.getUserHistory())

            .then(res => {
                this.setState({
                    loading: false,
                    refreshing: false,
                });
            })
            .catch(error => {
                this.setState({loading: false, refreshing: false,});

            });
    };


    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1,
        }), () => {
            this.makeRemoteRequest();
        }
    };

    renderItem = ({item}) => {
        //console.log(item);
        return (
            <ListItem item={item}/>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}>
            </View>
        )
    }


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
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />


            </View>


        );
    }
}



