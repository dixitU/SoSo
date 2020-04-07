import React, { Component } from 'react';
import { StyleSheet, TextInput, View, ScrollView, Text, AsyncStorage, Image, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
// import PTRView from 'react-native-pull-to-refresh';

export class OraganizationCRScreen extends Component {
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

    // refresh = () => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => { resolve() }, 20)
    //     });
    // }

    _loadData = async () => {
        const or_userName = await AsyncStorage.getItem('or_userName');

        return fetch('http://192.168.43.32/ORequest.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                or_userName: or_userName,

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
                        this.state.rq_id[i] = hh[2];
                        if (hh[8] < 10) {
                            this.state.s_hr[i] = '0' + hh[8];
                        } else {
                            this.state.s_hr[i] = hh[8];
                        }
                        if (hh[9] < 10) {
                            this.state.s_min[i] = '0' + hh[9];
                        } else {
                            this.state.s_min[i] = hh[9];
                        }
                        if (hh[10] < 10) {
                            this.state.e_hr[i] = '0' + hh[10];
                        } else {
                            this.state.e_hr[i] = hh[10];
                        }
                        if (hh[11] < 10) {
                            this.state.e_min[i] = '0' + hh[11];
                        } else {
                            this.state.e_min[i] = hh[11];
                        }
                    }
                    this.setState(this.state.s_hr);
                    this.setState(this.state.s_min);
                    this.setState(this.state.e_hr);
                    this.setState(this.state.e_min);
                    this.setState(this.state.rq_id);
                }
                console.log(this.state.rq_id);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    Accept(key) {

        const  rq_id  = this.state.rq_id[key];

        fetch('http://192.168.43.32/Accept.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                rq_id: rq_id,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    isLoading1: true,
                }, function () {
                    // In this block you can do something with new state.
                });
                this._loadData();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    Denied(key) {
        const  rq_id  = this.state.rq_id[key];

        fetch('http://192.168.43.32/Denied.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                rq_id: rq_id,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    isLoading1: true,
                }, function () {
                    // In this block you can do something with new state.
                });
                this._loadData();
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
        // const { s_hr } = this.state;
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

                <View style={styles.MainContainer}>
                    <ScrollView>
                        {
                            this.state.isLoading && this.state.dataSource.map((item, key) => (
                                <View key={key}>
                                    <View style={{ backgroundColor: '#131313', borderRadius: 5, flexDirection: 'column', marginTop: 5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 40, height: 40, borderRadius: 100, marginTop: 10, marginHorizontal: 10, borderWidth: 2, borderColor: '#FCFCFC' }}
                                                source={require('../assets/images/profile.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: '#FCFCFC', fontSize: 19, marginTop: 7 }}>{item.cus_first_name} {item.cus_last_name}</Text>
                                                <Text style={{ color: '#FCFCFC', fontSize: 13 }}>(Requesting for {item.emp_first_name} {item.emp_last_name})</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '94%', height: 1, backgroundColor: '#FCFCFC', marginLeft: 10, marginTop: 10, marginRight: 10 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Starting time:- {this.state.s_hr[key]}:{this.state.s_min[key]} </Text>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Ending time:- {this.state.e_hr[key]}:{this.state.e_min[key]} </Text>
                                        </View>
                                        <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 5 }}>{item.rq_description}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <TouchableOpacity style={styles.AandDButton} onPress={this.Denied.bind(this , key)}>
                                                <Text style={{ fontSize: 20, textAlign: 'center' }}>Denied</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.AandDButton} onPress={this.Accept.bind(this , key)}>
                                                <Text style={{ fontSize: 20, textAlign: 'center' }}>Accept</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    {
                        this.state.isLoading1 &&
                        <View style={{ marginTop:'50%', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>No Request Found</Text>
                        </View>
                    }
                    
                </View>

            </React.Fragment>
        )
    }
}

OraganizationCRScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        margin: 10,
        flexDirection: 'column'
    },
    container: {
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
        borderColor: '#131313',
        borderRadius: 40,
    },
    AandDButton: {
        color: '#131313',
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 3,
        borderRadius: 10,
        flex: 0.9,
        backgroundColor: '#FCFCFC'
    },
});