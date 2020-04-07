import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export class OraganizationJAScreen extends Component {

    constructor(props) {
        super(props);
        this._loadData();
        this.state = {
            isLoading: false,
            isLoading1: true,
            dataSource: [],
            s_hr: [],
            e_hr: [],
            s_min: [],
            e_min: [],
            rq_id: [],
        }
    }

    _loadData = async () => {
        const or_userName = await AsyncStorage.getItem('or_userName');

        return fetch('http://192.168.43.32/selectedEmp.php', {
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

                if (responseJson === "There is no work for your employee") {
                    this.setState({ isLoading: false, dataSource: responseJson, isLoading1: true });
                } else {
                    this.setState({
                        isLoading: true,
                        dataSource: responseJson,
                        isLoading1: false,
                    }, function () {
                        // In this block you can do something with new state.
                    });
                    const length = this.state.dataSource.length;
                    for (let i = 0; i < length; i++) {
                        const hh = Object.values(this.state.dataSource[i]);
                        this.state.rq_id[i] = hh[4];
                        if (hh[1] < 10) {
                            this.state.s_hr[i] = '0' + hh[1];
                        } else {
                            this.state.s_hr[i] = hh[1];
                        }
                        if (hh[3] < 10) {
                            this.state.s_min[i] = '0' + hh[3];
                        } else {
                            this.state.s_min[i] = hh[3];
                        }
                        if (hh[2] < 10) {
                            this.state.e_hr[i] = '0' + hh[2];
                        } else {
                            this.state.e_hr[i] = hh[2];
                        }
                        if (hh[4] < 10) {
                            this.state.e_min[i] = '0' + hh[4];
                        } else {
                            this.state.e_min[i] = hh[4];
                        }
                    }
                    this.setState(this.state.s_hr);
                    this.setState(this.state.s_min);
                    this.setState(this.state.e_hr);
                    this.setState(this.state.e_min);
                    //this.setState(this.state.rq_id);
                }
                console.log(this.state.s_hr);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    OProfile = () => {
        this.props.navigation.navigate('OProfile');
    }

    ONotification = () => {
        this.props.navigation.navigate('ONotification');
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.OProfile}>
                        <Image
                            style={{ width: 40, height: 40, marginLeft: 10 }}
                            source={require('../assets/images/OProfile.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.SectionStyle}>
                        <Icon name="ios-search" style={{ fontSize: 25, paddingLeft: 15 }} />
                        <TextInput placeholder="Search" style={{ flex: 1, fontSize: 20, paddingLeft: 15, width: 250 }} />
                    </View>
                    <TouchableOpacity onPress={this.ONotification}>
                        <Icon style={{ marginRight: 10 }} size={40} name={'ios-notifications'} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View>
                        {
                            this.state.isLoading && this.state.dataSource.map((item, key) => (
                                <View key={key} style={{ marginHorizontal: 10, marginTop: 10 }}>
                                    <View style={{ backgroundColor: '#131313', borderRadius: 5, flexDirection: 'column', marginTop: 5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 40, height: 40, borderRadius: 100, marginTop: 10, marginHorizontal: 10, borderWidth: 2, borderColor: '#FCFCFC' }}
                                                source={require('../assets/images/profile.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: '#FCFCFC', fontSize: 19, marginTop: 15 }}>Request ID is {item.rq_id}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '94%', height: 1, backgroundColor: '#FCFCFC', marginLeft: 10, marginTop: 10, marginRight: 10 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Starting time:- {this.state.s_hr[key]}:{this.state.s_min[key]} </Text>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Ending time:- {this.state.e_hr[key]}:{this.state.e_min[key]} </Text>
                                        </View>
                                        <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 5 }}>{item.rq_description}</Text>

                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                {
                    this.state.isLoading1 &&
                    <View style={styles.MainContainer}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>No Work For Your Employee</Text>
                    </View>
                }


            </React.Fragment>
        )
    }
}

OraganizationJAScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {
        alignItems: 'center',
        //justifyContent: 'center',
        flex: 1.2,
        //margin: 10,
    },
    container: {
        // flex: 1,
        height: 60,
        marginTop: 20,
        backgroundColor: '#FCFCFC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: '#D7D0CE',
        borderTopColor: '#FCFCFC',
        borderWidth: 1,
    },

    SectionStyle: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 2,
        height: 40,
        borderWidth: 1,
        // marginTop: 10,
        // Set border Hex Color Code Here.
        borderColor: '#131313',
        // marginRight: 50,
        // marginLeft: 10,
        // Set border Radius.
        borderRadius: 40,
    },
});