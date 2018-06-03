import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import User from "../../actors/User";
import Utility from "../../Utility"

export default class ListItem extends Component {
    constructor(props) {
        super(props)
    }



    //riderOrDriver(){
    //    if(this.props.item.)
    //}


    render() {
        let role ="";
        if(this.props.item.driver === User.currentUser.id){
            role= "Driver";
        }
        else if (this.props.item.driver === "N/A"){
            role="Creator/Passenger"
        }
        else{
            role="Passenger"
        }
        const customStyle = {
            container: [styles.container, {
                backgroundColor: this.props.itemBgColor
            }]
        };
        return (
            <TouchableOpacity
                style={customStyle.container}
                onPress={() => this.props.onPress()}>

                <Image source={this.props.filePath}
                       style={this.props.imageStyle}/>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>

                    <Text style={styles.roleStyle}>Role: {role}</Text>
                    <Text style={styles.originTextSyle}>
                        From: {this.props.item.origin.name}
                    </Text>
                    <Text style={styles.destinTextStyle}>
                        To: {this.props.item.destination.name}
                    </Text>

                    <Text style={styles.dateTextStyle}>
                        Date: {Utility.formatDate(new Date(this.props.item.time*1000))}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3
    },
    roleStyle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10
    },
    originTextSyle: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10
    },
    destinTextStyle: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10,
    },
    dateTextStyle: {
        fontSize: 16,
        color: 'black'
    }
};