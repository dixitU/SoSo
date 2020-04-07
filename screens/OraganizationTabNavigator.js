import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { OraganizationHomeScreen } from './OraganizationHomeScreen';
import { OraganizationCRScreen } from './OraganizationCRScreen';
import { OraganizationJAScreen } from './OraganizationJAScreen';
import { OProfileScreen } from './OProfileScreen';
import { ONotificationScreen } from './ONotificationScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OraganizationHomeStack = createStackNavigator(
  {
    OraganizationHome: OraganizationHomeScreen,
    OProfile: OProfileScreen,
    ONotification: ONotificationScreen,
  },
  {
    config,
  }
);

OraganizationHomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
    <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
  ),
};


OraganizationHomeStack.path = '';

const CustomerRequestStack = createStackNavigator(
  {
    CustomerRequest: OraganizationCRScreen,
  },
  config
);

CustomerRequestStack.navigationOptions = {
    tabBarLabel: 'Customer Request',
    tabBarIcon: ({ tintColor }) => (
      <Icon style={[{ color: tintColor }]} size={28} name={'ios-contacts'} />
    ),
  };

CustomerRequestStack.path = '';

const JobApplicationsStack = createStackNavigator(
  {
    JobApplications: OraganizationJAScreen,
  },
  config
);

JobApplicationsStack.navigationOptions = {
  tabBarLabel: 'Job Applications',
  tabBarIcon: ({ tintColor }) => (
    <View>
      <Icon style={[{ color: tintColor }]} size={25} name={'ios-document'} />
    </View>),
};

JobApplicationsStack.path = '';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    OraganizationHomeStack,
    CustomerRequestStack,
    JobApplicationsStack,
  },
  {
    initialRouteName: "OraganizationHomeStack",
    activeColor: '#D3B5AB',
    inactiveColor: '#131313',
    barStyle: {
      backgroundColor: '#FCFCFC',
      height: 60
    },
  }

);

TabNavigator.navigationOptions = {
  headerMode: 'none',
};



TabNavigator.path = '';


export default createAppContainer(TabNavigator);  
