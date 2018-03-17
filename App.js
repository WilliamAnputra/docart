import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router } from './src/config/Router';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Router />
      </View>
    );
  }
}
