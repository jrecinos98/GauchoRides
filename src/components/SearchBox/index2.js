import React from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';

import { Ionicons } from '@expo/vector-icons';

import styles from "./SearchBoxStyles.js";


export const SearchBoxDriver = ({getInputData, toggleSearchResultModal, getAddressPredictions})=> {
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
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input onFocus={()=>toggleSearchResultModal("pickUp")} style={styles.inputSearch} placeholder="Choose starting location" onChangeText={handleInput.bind(this, "pickUp")}/>
					</InputGroup>
				</View>
				<View style={styles.secondInputWrapper}>
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input onFocus={()=>toggleSearchResultModal("dropOff")}  style={styles.inputSearch} placeholder="Choose ending location" onChangeText={handleInput.bind(this, "dropOff")}/>
					</InputGroup>
				</View>




				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>Direct Rides Only</Text>

					<View style={styles.switchWrapper}>
						<Switch
							value={true}
							onValueChange={(val) => console.log(val)}
							disabled={false}
							activeText={"ON"}
							inActiveText={"OFF"}
							backgroundActive={'green'}
	   	 					backgroundInactive={'gray'}
							changeValueImmediately={true}/>
					 </View>

				</View>

				

			</View>



		);
};

export default SearchBoxDriver;
