import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  PixelRatio,
  AsyncStorage,
  Keyboard,
  ToastAndroid,
  NetInfo
} from 'react-native';

import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Helper from '../../helper';

import * as constants from '../../constants/constants';
import * as globalColors from '../../constants/styles/global';
import * as icons from '../../constants/icons';


// List of Images
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const pixelRatio = PixelRatio.get();

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secureTextEntry: true,
      userName: '',
      password: '',
      textStart: 0,
      textEnd: 0,
      montserratRegular: '',
      montserratBold: '',
      emailOnFocus: false,
      passwordOnFocus: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
    return true;
  }

  // this is a function to dispatch login action
  async attemptLogin() {
    Keyboard.dismiss();

    // check if the network is stable
    NetInfo.getConnectionInfo().then((connectionInfo) => {

      // check if connection is un stable or offline
      if (connectionInfo.effectiveType == '2g' || connectionInfo.effectiveType == '3g' || connectionInfo.type == ' none') {
        return ToastAndroid.show('please check your connection', ToastAndroid.SHORT);
      }
    });

    // if there is a stable connection
    if (this.state.userName === '' || this.state.password === '') {
      return alert('Please fill in your email & password');
    }

    await AsyncStorage.setItem(constants.ACCESS_TOKEN, 'user has loggedIn');
    // this block of code clears any previous route
    // so our app doesn't go back to Login screen when user pressed back button
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainScreen' })]
    });

    return this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {
      container,
      emailLabel,
      emailInput,
      separator,
      logo,
      loginButton
    } = styles;

    return (
      <View>
        <View style={container}>

          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>

            <Image source={icons.LOGO} style={logo} />

            <Text
              style={[emailLabel, { fontFamily: this.state.montserratRegular }]}
            >
              EMAIL
            </Text>

            <TextInput
              placeholder="Youraccount@email.com"
              placeholderTextColor={globalColors.WHITE}
              style={[emailInput, { fontFamily: this.state.montserratRegular }]}
              underlineColorAndroid="transparent"
              onChangeText={userName => this.setState({ userName })}
              value={this.state.userName}
              onFocus={() => {
                this.setState({
                  emailOnFocus: true,
                  passwordOnFocus: false
                });
              }}
            />

            <View
              style={[
                separator,
                {
                  backgroundColor: this.state.emailOnFocus
                    ? globalColors.MEDIUM_GRAY
                    : globalColors.LIGHT_GRAY
                }
              ]}
            />

            <Text
              style={[emailLabel, { fontFamily: this.state.montserratRegular }]}
            >
              PASSWORD
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeholder="********"
                placeholderTextColor={globalColors.WHITE}
                style={[
                  emailInput,
                  { fontFamily: this.state.montserratRegular }
                ]}
                onFocus={() => {
                  this.setState({
                    emailOnFocus: false,
                    passwordOnFocus: true
                  });
                }}
                secureTextEntry={this.state.secureTextEntry}
                underlineColorAndroid="transparent"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                onSelectionChange={event => {
                  this.setState({
                    textEnd: event.nativeEvent.selection.end,
                    textStart: event.nativeEvent.selection.start
                  });
                }}
                selection={{
                  start: this.state.textStart,
                  end: this.state.textEnd
                }}
              />

            </View>

            <View
              style={[
                separator,
                {
                  backgroundColor: this.state.passwordOnFocus
                    ? globalColors.MEDIUM_GRAY
                    : globalColors.LIGHT_GRAY
                }
              ]}
            />

            <Button
              title="LOG IN"
              buttonStyle={loginButton}
              onPress={() => this.attemptLogin()}
            />

          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: globalColors.DARK_BLUE
  },
  emailLabel: {
    fontSize: 12,
    marginTop: Helper.scaleUnit(pixelRatio, 'height', 35),
    marginLeft: Helper.scaleUnit(pixelRatio, 'width', 35),
    backgroundColor: 'transparent',
    color: globalColors.WHITE
  },
  emailInput: {
    height: Helper.scaleUnit(pixelRatio, 'height', 35),
    width: Helper.scaleUnit(pixelRatio, 'width', 250),
    marginLeft: Helper.scaleUnit(pixelRatio, 'width', 35),
    opacity: 0.7,
    color: globalColors.WHITE
  },
  logo: {
    height: Helper.scaleUnit(pixelRatio, 'height', 80),
    width: Helper.scaleUnit(pixelRatio, 'width', 250),
    marginTop: Helper.scaleUnit(pixelRatio, 'height', 80),
    alignSelf: 'center',
  },
  loginButton: {
    width: Helper.scaleUnit(pixelRatio, 'width', 280),
    backgroundColor: globalColors.LIGHT_BLUE,
    height: SCREEN_HEIGHT * (50 / SCREEN_HEIGHT),
    alignItems: 'center',
    borderRadius: 4,
    marginTop: SCREEN_HEIGHT * (35 / SCREEN_HEIGHT),
    alignSelf: 'center'
  },
  separator: {
    width: Helper.scaleUnit(pixelRatio, 'width', 280),
    height: 2,
    marginLeft: Helper.scaleUnit(pixelRatio, 'width', 35),
    marginRight: Helper.scaleUnit(pixelRatio, 'width', 35)
  }
};

