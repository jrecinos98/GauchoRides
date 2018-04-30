import React, {Component} from "react";
import {Text, View, StyleSheet, Image, FlatList,TouchableOpacity} from "react-native";
import {List, ListItem} from "react-native-elements";
import styles from "./RideHistoryStyles.js";


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
          			<View style={styles.logoContainer}>
          				<Text style={styles.title}>Drive History</Text>

                   <FlatList
                      data={this.props.data}
                      extraData={this.state}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderItem}
                   />
                 
          			</View>

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




