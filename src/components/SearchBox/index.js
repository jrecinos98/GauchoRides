import React from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';

import { Ionicons } from '@expo/vector-icons';

import styles from "./SearchBoxStyles.js";

export const SearchBox = ({getInputData, toggleSearchResultModal, getAddressPredictions})=> {
	function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}



		return(
			<View style={styles.searchBox}>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>PICK UP</Text>
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input onFocus={()=>toggleSearchResultModal("pickUp")} style={styles.inputSearch} placeholder="Choose pick-up location" onChangeText={handleInput.bind(this, "pickUp")}/>
					</InputGroup>
				</View>
				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>DROP-OFF</Text>
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input onFocus={()=>toggleSearchResultModal("dropOff")}  style={styles.inputSearch} placeholder="Choose drop-off location" onChangeText={handleInput.bind(this, "dropOff")}/>
					</InputGroup>
				</View>



				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>Direct Rides Only</Text>
					<Switch
						value={true}
						onValueChange={(val) => console.log(val)}
						disabled={false}
						backgroundActive={'green'}
   	 					backgroundInactive={'gray'}
					 />

				</View>
			</View>



		);
};

export default SearchBox;
