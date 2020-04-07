import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, AsyncStorage, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';


export class NotificationScreen extends Component {

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
            rq_status: [],
        }
    }

    _loadData = async () => {
        const userName = await AsyncStorage.getItem('userName');

        return fetch('http://192.168.43.32/notification.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                userName: userName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson === "No requests") {
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
                        if (hh[5] < 10) {
                            this.state.s_hr[i] = '0' + hh[5];
                        } else {
                            this.state.s_hr[i] = hh[5];
                        }
                        if (hh[7] < 10) {
                            this.state.s_min[i] = '0' + hh[7];
                        } else {
                            this.state.s_min[i] = hh[7];
                        }
                        if (hh[6] < 10) {
                            this.state.e_hr[i] = '0' + hh[6];
                        } else {
                            this.state.e_hr[i] = hh[6];
                        }
                        if (hh[8] < 10) {
                            this.state.e_min[i] = '0' + hh[8];
                        } else {
                            this.state.e_min[i] = hh[8];
                        }
                        if (hh[3] == 0) {
                            this.state.rq_status[i] = 'Pending';
                        }
                        if (hh[3] == 1) {
                            this.state.rq_status[i] = 'Accepted';
                        }
                        if (hh[3] == 2) {
                            this.state.rq_status[i] = 'Denied';
                        }

                    }
                    this.setState(this.state.s_hr);
                    this.setState(this.state.s_min);
                    this.setState(this.state.e_hr);
                    this.setState(this.state.e_min);
                    this.setState(this.state.rq_status);
                    //console.log(Object.values(this.state.dataSource[4])[3]);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    DRequest(req_id) {
        fetch('http://192.168.43.32/deleteRequest.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request_id: req_id
            })

        }).then((responseData) => responseData.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.MainContainer}>
                    <ScrollView >
                        {
                            this.state.isLoading && this.state.dataSource.map((item, key) => (
                                <View key={key} style={{ marginTop: 10 }}>

                                    <View style={{ backgroundColor: '#131313', borderRadius: 5, flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 40, height: 40, borderRadius: 100, marginTop: 10, marginHorizontal: 10, borderWidth: 2, borderColor: '#FCFCFC' }}
                                                source={require('../assets/images/profile.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: '#FCFCFC', fontSize: 19, marginTop: 7 }}>Your request ID is {item.rq_id}</Text>
                                                <Text style={{ color: '#FCFCFC', fontSize: 13 }}>(Requesting for {item.pro_first_name} {item.pro_last_name})</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '94%', height: 1, backgroundColor: '#FCFCFC', marginLeft: 10, marginTop: 10, marginRight: 10 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Starting time:- {this.state.s_hr[key]}:{this.state.s_min[key]} </Text>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Ending time:- {this.state.e_hr[key]}:{this.state.e_min[key]} </Text>
                                        </View>
                                        <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 5 }}>{item.rq_description}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom:5 }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 5, marginBottom: 5, flex: 0.9 }}>Request Status :- {this.state.rq_status[key]}</Text>
                                            <TouchableOpacity style={{  flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#FCFCFC' }} onPress={this.DRequest.bind(this, item.rq_id)}>
                                                <Icon name="md-trash" style={{ fontSize: 20, marginTop: 5, color: '#FCFCFC' }} />
                                                <Text style={{ color: '#FCFCFC', marginLeft:5 , marginTop:5 }}>Request</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    {
                        this.state.isLoading1 &&
                        <View style={{ marginTop: '70%', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>No Request Found</Text>
                        </View>
                    }
                </View>
            </React.Fragment>
        )
    }
}

NotificationScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        //flex: 1,
        margin: 10,
        marginTop: 15,
    },
    AandDButton: {
        color: '#131313',
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 3,
        borderRadius: 10,
        flex: 0.5,
        backgroundColor: '#FCFCFC'
    },
});