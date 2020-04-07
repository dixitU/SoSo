import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../screens/HomeScreen';
// import { QuickbookScreen } from '../screens/QuickbookScreen';
// import { JobsScreen } from '../screens/JobsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { DandNScreen } from '../screens/DandNScreen';
import { EListScreen } from '../screens/EListScreen';
import Oraganization from '../screens/Oraganization';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Notification: NotificationScreen,
    DandN: DandNScreen,
    EList: EListScreen,
  },
  {
    config,
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
    <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
  ),
};


HomeStack.path = '';

const OraganizationStack = createStackNavigator(
  {
    Oraganization: Oraganization,
  },
  config
);

Oraganization.navigationOptions = {
  headerShown: false,
};

OraganizationStack.path = '';

OraganizationStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'Oraganization') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Organization',
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon style={[{ color: tintColor }]} size={25} name={'md-apps'} />
      </View>),
  }
}

// const QuickbookStack = createStackNavigator(
//   {
//     Quickbook: QuickbookScreen,
//   },
//   config
// );

// QuickbookStack.navigationOptions = {
//   tabBarLabel: 'Quickbook',
//   tabBarIcon: ({ tintColor }) => (
//     <View>
//       <Icon style={[{ color: tintColor }]} size={25} name={'md-add-circle'} />
//     </View>),
// };

// QuickbookStack.path = '';

// const JobsStack = createStackNavigator(
//   {
//     Jobs: JobsScreen,
//   },
//   config
// );

// JobsStack.navigationOptions = {
//   tabBarLabel: 'Jobs',
//   tabBarIcon: ({ tintColor }) => (
//     <View>
//       <Icon style={[{ color: tintColor }]} size={25} name={'ios-paper'} />
//     </View>),
// };

// JobsStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <View>
      <Icon style={[{ color: tintColor }]} size={30} name={'ios-person'} />
    </View>),
}

ProfileStack.path = '';

// QuickbookStack,
// JobsStack,

const TabNavigator = createMaterialBottomTabNavigator(
  {
    HomeStack,
    OraganizationStack,
    
    ProfileStack,
  },
  {
    initialRouteName: "HomeStack",
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
