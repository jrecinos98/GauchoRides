import React, {Component} from "react";
import {Text, View, StyleSheet, Image, FlatList,SectionList,TouchableOpacity, ActivityIndicator, RefreshControl} from "react-native";
import {List, ListItem} from "react-native-elements";
import styles from "./RideHistoryStyles.js";
import User from "../../actors/User.js";
import Ride from "../../actors/Ride.js";
import { Ionicons } from '@expo/vector-icons';
import Database from '../../Database';

/**
 * Container component that displays a ride from the user history.
 */
export default class RideHistory extends Component {
    /**
     * Initializes the RideHistory object
     * @param props
     */
    constructor(props){
      super(props);
      this.state = {
        data: [],
        page: 1,
        seed: 1,
        error: null,
        loading: false,
        refreshing: false

      };
      


      Database.getUserHistory((list) => {
         console.log(list.length);
         this.setState({data: list});
      });
    }

    errData(err){
      console.log('Error!');
      console.log(err);
    }
    epochToDate(epoch){
     
      var d = new Date(epoch*1000);
      return d;
    }

    /*
    riderOrDriverImage(){
      if(this.gotData()=="driver"){
        
      }
      else{

      }
    }
    */
    componentDidMount(){
      this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
      const { page, seed} = this.state;
      const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
      this.setState({ loading:true });
      this.setState({loading:false, refreshing:false});
      fetch(url)

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
        page:1,
        refreshing: true,
        seed: this.state.seed + 1,
      }), () => {
        this.makeRemoteRequest();
      }

    };

    renderItem = ({ item }) => {

      console.log(item);
      return(
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3}}>
            {/*<Image style={{ width: 80, height: 80, margin: 5 }}
            source = {{ uri: item.image }} />*/}
          <Ionicons name="ios-car" size={65}/>
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
            <Text style={{fontSize: 16, color: 'grey', marginBottom: 10}}>
              From:  {item.origin.name}
            </Text>
            <Text style={{fontSize: 16, color: 'red', marginBottom: 10}}>
              To:  {item.destination.name}
            </Text>

            <Text style={{fontSize: 16, color: 'grey'}}>
              Date:  {this.epochToDate(item.time).toString()}

            </Text>
          </View>
        </View>
      )
    }

    renderSeparator = () => {
      return(
        <View
          style={{ height: 1, width: '100%', backgroundColor: 'black'}}>
        </View>
      )
    }



    render() {
        return (
          		<View style={styles.container}>

          				<Text style={styles.title}>Drive History</Text>



                  <FlatList
                    data={this.state.data}
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



