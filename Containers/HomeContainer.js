import { connect } from "react-redux";
import Home from "../components/Home";
import{
	getCurrentLocation
	getInputData
	toggleSearchResultmodal
} from "../modules/home";

const mapStateToProps = (state) => ({
	region: state.home.region,
	inputData:state.home.inputDate || {}

});

const mapActionCreators = {
	getCurrentLocation
	getInputData
};

export default connect(mapStateToProps, mapActionCreators)(Home); 