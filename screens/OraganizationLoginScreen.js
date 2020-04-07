import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from 'react-native-gesture-handler';

export class OraganizationLoginScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {

            O_Username: '',
            O_Password: '',
            icon: 'ios-eye-off',
            password: true,
        }

    }

    UserLoginFunction = () => {

        const { O_Username } = this.state;
        const { O_Password } = this.state;
    
    
        fetch('http://192.168.43.32/OraganizationLogin.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
            or_user_name: O_Username,
    
            or_password: O_Password,
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
    
            // If server response message same as Data Matched
            if (responseJson === 'Data Matched') {
              AsyncStorage.setItem('isOraganizationLoggedIn', '1');
              AsyncStorage.setItem('or_userName', O_Username);
              this.props.navigation.navigate('OraganizationRoot');
            }
            else {
    
              Alert.alert(responseJson);
            }
    
          }).catch((error) => {
            console.error(error);
          });
    
    
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
                <Image
                    style={{ width: 150, height: 150, marginHorizontal: 95 }}
                    source={require('../assets/images/hh.png')}
                />

                <View style={styles.SectionStyle}>

                    <Image source={require('../assets/images/username.png')} style={styles.ImageStyle} />

                    <TextInput

                        // Adding hint in Text Input using Place holder.
                        placeholder="Enter Oraganization Username"

                        onChangeText={O_Username => this.setState({ O_Username })}

                        // Making the Under line Transparent.
                        underlineColorAndroid='transparent'

                        style={{ flex: 1, margin: 5, fontSize: 16 }}
                    />

                </View>

                <View style={styles.SectionStyle}>

                    <Image source={require('../assets/images/password.png')} style={styles.ImageStyle} />

                    <TextInput

                        // Adding hint in Text Input using Place holder.
                        placeholder="Enter Oraganization Password"

                        onChangeText={O_Password => this.setState({ O_Password })}

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
            </View>
        )
    }
}

OraganizationLoginScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        //margin: 10,
        padding: 10,
        backgroundColor: '#ffffff',
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