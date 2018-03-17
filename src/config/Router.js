import React, { Component } from 'react';


import { View, PixelRatio, Text, AsyncStorage, Dimensions } from 'react-native';

import { StackNavigator } from 'react-navigation';

import * as constants from '../constants/constants';

import { Login, MainScreen } from '../components/mainComponent';

// this is the component for the drawer
const pixelRatio = PixelRatio.get();

const SCREEN_HEIGHT = Dimensions.get('window').height;


export class Router extends Component {

  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  // load the font when boot up
  async componentWillMount() {

    const access_token = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
    if (access_token != null) {
      // if we have an accesstoken
      await this.setState({ accessToken: access_token });
    }

    if (access_token == null) {
      // if we have an accesstoken
      await this.setState({ accessToken: null });
    }
  }

  renderRouter() {
    const MainView = StackNavigator(
      {
        LoginScreen: {
          screen: Login,
        },
        MainScreen: {
          screen: MainScreen
        },
      },
      {
        headerMode: 'none',
        initialRouteName: this.state.accessToken == null ? 'LoginScreen' : 'MainScreen'
      }
    );

    return <MainView />;
  }

  render() {
    return (
      <View style={{ height: SCREEN_HEIGHT }}>
        {this.renderRouter()}
      </View>
    );
  }
}
