
//import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './Components/MainScreen'


// Map Tutorial: https://www.youtube.com/watch?v=RjW1hMOA9M0&t=178s
// Route Tutorial: https://github.com/react-community/react-native-maps/issues/929 (Look for the super upvoted answer)
export default class App extends React.Component {

  //state = { fontsAreLoaded: false };

  //async componentWillMount() {
   // await Expo.Font.loadAsync({
    //  'Roboto': require('native-base/Fonts/Roboto.ttf'),
    //  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  // });
  //this.setState({fontsAreLoaded: true});
 // }

  render() {
  //  if (this.state.fontsAreLoaded) {
   //   return <Exponent.Components.AppLoading/>;
 //   }
    return (
      <AppStackNavigator/>
    );
  }
}


const AppStackNavigator = StackNavigator({
  Main:{
    screen: MainScreen
  }

})


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

//Expo.registerRootComponent(App);
