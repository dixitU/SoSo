import React from 'react';
import { Platform, View, StyleSheet, Text, TextInput } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainTabNavigator from './MainTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { NotificationScreen } from '../screens/NotificationScreen';

const config = Platform.select({
  // initialRouteName: 'Login',
  web: { headerMode: 'screen' },
  default: {},
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignUpScreen,
  },
  config
);

AuthStack.navigationOptions = {
  headerShown: false,
};

const RootStack = createStackNavigator(
  {
    Main: MainTabNavigator,
  },
  {
    config,
  }
);

MainTabNavigator.navigationOptions = {
  headerShown: false,
};

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
  }
}



export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  }, { initialRouteName: 'AuthLoading' })
);
