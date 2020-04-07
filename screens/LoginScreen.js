import React, { Component } from 'react';

import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image } from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from 'react-native-gesture-handler';

export class LoginScreen extends Component {

  constructor(props) {

    super(props);

    this.state = {

      UserEmail: '',
      UserPassword: '',
      icon: 'ios-eye-off',
      password: true,
    }

  }
  // state = {

  //   icon: 'eyeo',

  // }

  UserLoginFunction = () => {

    const { UserEmail } = this.state;
    const { UserPassword } = this.state;


    fetch('http://192.168.43.32/Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: UserEmail,

        password: UserPassword,

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          //Then open Profile activity and send user email to profile activity.
          AsyncStorage.setItem('isLoggedIn', '1');
          AsyncStorage.setItem('userName', UserEmail);
          this.props.navigation.navigate('Home');
        }
        else {

          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });


  }

  UserSignUpFunction = () => {
    this.props.navigation.navigate('Signup');
    // return <SignUpScreen />;
  }

  _changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off',
      password: !prevState.password,
    }))
  }

  render() {
    return (


      <View style={styles.MainContainer}>

        {/* <Text style={styles.TextComponentStyle}>User Login Form</Text> */}

        <Image
          style={{ width: 150, height: 150, marginHorizontal: 95 }}
          source={require('../assets/images/logo.png')}
        />

        <View style={styles.SectionStyle}>

          <Image source={require('../assets/images/username.png')} style={styles.ImageStyle} />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Enter Username or Email Id"

            onChangeText={UserEmail => this.setState({ UserEmail })}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={{ flex: 1, margin: 5, fontSize: 16 }}
          />

        </View>

        <View style={styles.SectionStyle}>

          <Image source={require('../assets/images/password.png')} style={styles.ImageStyle} />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Enter Password"

            onChangeText={UserPassword => this.setState({ UserPassword })}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={{ flex: 1, margin: 5, fontSize: 16 }}

            secureTextEntry={this.state.password}
          />

          <Icon name={this.state.icon} size={25} style={{ margin: 10 }} onPress={() => this._changeIcon()} />

        </View>


        <TouchableOpacity
          style={styles.title}
          onPress={this.UserLoginFunction}
        >
          <Text style={{ color: '#FCFCFC' }}> Log In </Text>
        </TouchableOpacity>
        {/* <Button title="Log In" onPress={this.UserLoginFunction} color="#2196F3" /> */}

        {/* <Button title="Click Here To SignUp" onPress={this.UserSignUpFunction} color="#2196F3" /> */}
        <TouchableOpacity
          style={styles.title}
          onPress={this.UserSignUpFunction}
        >
          <Text style={{ color: '#FCFCFC' }}> Sign Up </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

LoginScreen.navigationOptions = {
  headerShown: false,
};


const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 50,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#131313',

    // Set border Radius.
    borderRadius: 40,

  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    marginBottom: 15
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 7,
    height: 50,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#131313',

    // Set border Radius.
    borderRadius: 40,
  },

  ImageStyle: {
    padding: 15,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },

  title: {
    alignItems: 'center',
    backgroundColor: '#131313',
    padding: 10,
    marginVertical: 5,
    borderRadius: 30,
    height: 40,
  }
});