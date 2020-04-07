import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, FlatList, Image } from 'react-native';


export class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this._loadData();
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }

    _loadData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        //console.log(userName);

        fetch('http://192.168.43.32/profile.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: userName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    OraganizationLogoutFunction = () => {
        AsyncStorage.clear();
        //AsyncStorage.setItem('isOraganizationLoggedIn', '2');
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                {
                    this.state.dataSource.map((item, key) => (
                        <View key={key} style={styles.MainContainer}>
                            <ScrollView>
                                <Image
                                    style={{ width: 130, height: 130, marginHorizontal: 95, borderRadius:100, marginTop:20 }}
                                    source={require('../assets/images/profile.png')} />
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>First Name</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_first_name} </Text>
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Last Name</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_last_name} </Text>
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Email ID</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_email} </Text>
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Phone Number</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_phonenumber} </Text>
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Date of Birth</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_dob} </Text>
                                <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Gender</Text>
                                <Text style={styles.FlatListItemStyle}> {item.pro_gender} </Text>
                                <TouchableOpacity onPress={this.OraganizationLogoutFunction}>
                                    <Text style={{ textAlign: 'center', fontSize: 17, color: '#FCFCFC', backgroundColor: '#131313', marginHorizontal: 120, marginTop: 15, padding: 10, borderRadius: 10 }}>Log Out</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    ))
                }
            </View>
        )
    }
}

ProfileScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        //flex: 1,
        margin: 10,
    },
    FlatListItemStyle: {
        fontSize: 20,
        // marginTop: 10,
        backgroundColor: '#ffffff',
        color: '#939393',
        padding: 8,
        borderRadius: 5,
    },

});