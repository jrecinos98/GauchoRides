
//import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import NewUserScreen from './src/screens/NewUserScreen'
import { YellowBox } from 'react-native';

//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

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
    Login: {screen: NewUserScreen},
    Main: {
        screen: MainScreen
    },
}, {
    initialRouteName: "Login",
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//Expo.registerRootComponent(App);
