import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image } from 'react-native';


export class OProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        };
        this._loadData();
    }

    _loadData = async () => {
        const or_userName = await AsyncStorage.getItem('or_userName');
        //console.log(or_userName);

        fetch('http://192.168.43.32/OProfile.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                or_username: or_userName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
                console.log(this.state.dataSource)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    OraganizationLogoutFunction = () => {
        //AsyncStorage.clear();
        AsyncStorage.setItem('isOraganizationLoggedIn', '2');
        this.props.navigation.navigate('OraganizationLogin');
    }

    render() {
        return (

            <View style={styles.MainContainer}>
                <ScrollView>
                    <Image
                        style={{ width: 130, height: 130, marginHorizontal: 95, borderRadius: 100, marginTop: 20 }}
                        source={require('../assets/images/profile.png')} />
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Oraganization Name</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.or_name} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Oraganization User Name</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.or_user_name} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Oraganization Email ID</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.or_email} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Oraganization Phone Number</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.or_phonenumber} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Flat No. or Street</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.or_street} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Area</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.ad_area} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>City</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.ad_city} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>State</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.ad_state} </Text>
                    <Text style={{ fontSize: 20, marginVertical: 5, textAlign: 'center', color: '#939393' }}>Country</Text>
                    <Text style={styles.FlatListItemStyle}> {this.state.dataSource.ad_country} </Text>
                    <TouchableOpacity onPress={this.OraganizationLogoutFunction}>
                        <Text style={{ textAlign: 'center', fontSize: 17, color: '#FCFCFC', backgroundColor: '#131313', marginHorizontal: 120, marginTop: 15, padding: 10, borderRadius: 10 }}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        )
    }
}

OProfileScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
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