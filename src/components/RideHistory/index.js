import React, {Component} from "react";
import {Text, View, StyleSheet, Image, FlatList,SectionList,TouchableOpacity, ActivityIndicator} from "react-native";
import {List, ListItem} from "react-native-elements";
import styles from "./RideHistoryStyles.js";
import * as firebase from 'firebase';
import User from "../../actors/User.js";

export default class RideHistory extends Component {
    constructor(props){
      super(props);

      this.state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
      };

    }
    componentDidMount(){
      this.makeRemoteRequest();
    }

    renderItem = ({ item }) => {
      return(
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3}}>
          <Image style={{ width: 80, height: 80, margin: 5 }}
            source = {{ uri: item.image }} />
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
            <Text style={{fontSize: 18, color: 'green', marginBottom: 15}}>
              {User.currentUser.name}
            </Text>
            <Text style={{fontSize: 16, color: 'red'}}>
              {User.currentUser.name}
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
  


    makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    };

    render() {
        return (
          		<View style={styles.container}>

          				<Text style={styles.title}>Drive History</Text>
                  


                  <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                  />





                <View style={styles.rightContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>{alert("This should go to ride page")}}>
                    <Image source={require("../../../public/assets/plus_button.png")}
                      style={{width: 75, height: 75}}
                    />

                  </TouchableOpacity>
                  <Text>Create Ride</Text>
                
          		  </View>
              </View>

        

        );
    }
}




