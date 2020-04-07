import React from 'react';
import { Platform, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { Component } from 'react';
import { OraganizationLoginScreen } from './OraganizationLoginScreen';
import OraganizationTabNavigator from './OraganizationTabNavigator';

const config = Platform.select({
  // initialRouteName: 'Login',
  web: { headerMode: 'screen' },
  default: {},
});

const OraganizationAuthStack = createStackNavigator(
  {
    OraganizationLogin: OraganizationLoginScreen,
  },
  config
);

OraganizationAuthStack.navigationOptions = {
  headerShown: false,
};

const OraganizationRootStack = createStackNavigator(
  {
    OraganizationRoot: OraganizationTabNavigator,
  },
  {
    config,
  }
);

OraganizationTabNavigator.navigationOptions = {
  headerShown: false,
};

class OraganizationAuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadDataOraganization();
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _loadDataOraganization = async () => {
    const isOraganizationLoggedIn = await AsyncStorage.getItem('isOraganizationLoggedIn');
    this.props.navigation.navigate(isOraganizationLoggedIn !== '1' ? 'OraganizationAuth' : 'OraganizationApp');
  }
}



export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    OraganizationAuthLoading: OraganizationAuthLoadingScreen,
    OraganizationApp: OraganizationRootStack,
    OraganizationAuth: OraganizationAuthStack,
  }, { initialRouteName: 'OraganizationAuthLoading' })
);
