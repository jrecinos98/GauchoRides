import { combineReducers } from "redux"

import const makeRootReducer = () => {
	return combineReducers({}); //will combine all functions from different routes and combine to single reducing function

}

export default makeRootReducer;




//app has routes so for each route need modules