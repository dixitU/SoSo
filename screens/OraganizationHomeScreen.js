import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image, TouchableOpacity, Picker, ScrollView } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import TimePicker from 'react-native-simple-time-picker';


export class OraganizationHomeScreen extends Component {
    constructor(props) {
        super(props);
        this._loadData();
        this.state = {
            isLoading: false,
            isLoading1: true,
            isModalVisible: false,
            selectedSHours: 0,
            selectedEHours: 0,
            selectedSMinutes: 0,
            selectedEMinutes: 0,
            emp_job_type: 'Doctor',
            emp_type: 'Permenent',
            emp_username: '',
            emp_salary: 0,
            dataSource: [],
            s_hr: [],
            e_hr: [],
            s_min: [],
            e_min: [],
        }
    }


    OProfile = () => {
        this.props.navigation.navigate('OProfile');
    }

    ONotification = () => {
        this.props.navigation.navigate('ONotification');
    }

    Cancel = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    _loadData = async () => {
        const or_userName = await AsyncStorage.getItem('or_userName');

        return fetch('http://192.168.43.32/OEmpList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                or_user: or_userName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson === "No Employee is there.. ") {
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

                    }
                    this.setState(this.state.s_hr);
                    this.setState(this.state.s_min);
                    this.setState(this.state.e_hr);
                    this.setState(this.state.e_min);
                    //this.setState(this.state.rq_status);
                    //console.log(this.state.e_hr);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    EAdd = async () => {

        const { selectedEHours } = this.state;
        const { selectedSHours } = this.state;
        const { selectedSMinutes } = this.state;
        const { selectedEMinutes } = this.state;
        const { emp_username } = this.state;
        const { emp_salary } = this.state;
        const { emp_job_type } = this.state;
        const { emp_type } = this.state;
        const or_userName = await AsyncStorage.getItem('or_userName');

        fetch('http://192.168.43.32/addEmployee.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                emp_user: emp_username,
                or_user_name: or_userName,
                job_start_hr: selectedSHours,
                job_start_min: selectedSMinutes,
                job_end_hr: selectedEHours,
                job_end_min: selectedEMinutes,
                emp_salary: emp_salary,
                emp_pos_type: emp_type,
                emp_type: emp_job_type,

            })

        }).then((responseData) => responseData.json())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                this.setState({ isModalVisible: !this.state.isModalVisible });
                Alert.alert(responseJson);


            }).catch((error) => {
                console.error(error);
            });
    }

    DEmployee(e_id) {
        fetch('http://192.168.43.32/deleteEmployee.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emp_id: e_id
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

                                    <View style={{ backgroundColor: '#131313', borderRadius: 5, flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 40, height: 40, borderRadius: 100, marginTop: 10, marginHorizontal: 10, borderWidth: 2, borderColor: '#FCFCFC' }}
                                                source={require('../assets/images/profile.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: '#FCFCFC', fontSize: 19, marginTop: 7 }}>{item.pro_first_name} {item.pro_last_name}</Text>
                                                <Text style={{ color: '#FCFCFC', fontSize: 13 }}>(Salary :- {item.emp_salary}$ per hour)</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '94%', height: 1, backgroundColor: '#FCFCFC', marginLeft: 10, marginTop: 10, marginRight: 10 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Starting time:- {this.state.s_hr[key]}:{this.state.s_min[key]} </Text>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginTop: 10 }}>Ending time:- {this.state.e_hr[key]}:{this.state.e_min[key]} </Text>
                                        </View>
                                        <Text style={{ color: '#FCFCFC', marginHorizontal: 10 }}>Job Type  :-  {item.emp_job_type} </Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text style={{ color: '#FCFCFC', marginHorizontal: 10, marginBottom: 5, flex:0.9 }}>Job Duration  :-  {item.emp_position} </Text>
                                            <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#FCFCFC' }} onPress={this.DEmployee.bind(this, item.emp_id)}>
                                                <Icon name="md-trash" style={{ fontSize: 20, color: '#FCFCFC' }} />
                                                <Text style={{ color: '#FCFCFC', marginLeft: 5 }}>Employee</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                        {
                            this.state.isLoading &&
                            <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#E2E2E2', borderColor: '#E2E2E2', flexDirection: 'row', borderRadius: 5, justifyContent: 'center', margin: 10 }} onPress={this.Cancel}>
                                <Icon style={{ padding: 5 }} size={30} name={'ios-add-circle'} />
                                <Text style={{ fontSize: 20, padding: 5, paddingTop: 6 }}>
                                    Add Employee
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>

                {
                    this.state.isLoading1 &&
                    <View style={styles.MainContainer}>
                        <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#E2E2E2', borderColor: '#E2E2E2', flexDirection: 'row', borderRadius: 5 }} onPress={this.Cancel}>
                            <Icon style={{ padding: 5 }} size={30} name={'ios-add-circle'} />
                            <Text style={{ fontSize: 20, padding: 5, paddingTop: 6 }}>
                                Add Employee
                            </Text>
                        </TouchableOpacity>
                    </View>
                }


                {/* <View style={styles.MainContainer}>
                    <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#E2E2E2', borderColor: '#E2E2E2', flexDirection: 'row', borderRadius: 5 }} onPress={this.Cancel}>
                        <Icon style={{ padding: 5 }} size={30} name={'ios-add-circle'} />
                        <Text style={{ fontSize: 20, padding: 5, paddingTop: 6 }}>
                            Add Employee
                        </Text>
                    </TouchableOpacity>
                </View> */}


                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ backgroundColor: '#FCFCFC' }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1.5, margin: 10, marginHorizontal: 15, borderBottomColor: '#939393', }}>
                                <Icon name="ios-search" style={{ fontSize: 20, marginTop: 5, color: '#939393' }} />
                                <TextInput
                                    style={{ fontSize: 20, marginLeft: 10, paddingBottom: 5 }}
                                    placeholder="employee username"
                                    onChangeText={emp_username => this.setState({ emp_username })}
                                />
                            </View>
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 20, marginTop: 10, marginHorizontal: 5 }}>Starting Time:-</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedSHours}
                                    selectedMinutes={this.state.selectedSMinutes}
                                    onChange={(hours, minutes) => this.setState({
                                        selectedSHours: hours, selectedSMinutes: minutes
                                    })}
                                />
                            </View>
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 20, marginHorizontal: 5 }}>Ending Time:-</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedEHours}
                                    selectedMinutes={this.state.selectedEMinutes}
                                    onChange={(hours, minutes) => this.setState({
                                        selectedEHours: hours, selectedEMinutes: minutes
                                    })}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomColor: '#939393', marginTop: 5 }}>
                                <Text style={{ fontSize: 19, marginHorizontal: 5 }}>Employee Salary:-</Text>
                                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10 }}>
                                    <TextInput
                                        style={{ fontSize: 15, marginLeft: 10, paddingLeft: 10, paddingHorizontal: 5 }}
                                        placeholder="00"
                                        onChangeText={emp_salary => this.setState({ emp_salary })}
                                    />
                                    <Text style={{ marginRight: 5, marginTop: 3, fontSize: 17 }}>$</Text>
                                </View>
                                <Text style={{ marginHorizontal: 5, marginTop: 10 }}>per hour</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 15 }}>
                                <Text style={{ flex: 0.8, fontSize: 17, marginHorizontal: 5 }}>
                                    Employee Job Type:-
                                </Text>
                                <Picker
                                    selectedValue={this.state.emp_job_type}
                                    style={{ height: 25, flex: 0.5 }}
                                    onValueChange={(itemValue) => { this.setState({ emp_job_type: itemValue }) }}
                                >
                                    <Picker.Item label="Doctor" value="Doctor" />
                                    <Picker.Item label="Nurse" value="Nurse" />
                                </Picker>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 15, marginBottom: 10 }}>
                                <Text style={{ flex: 0.6, fontSize: 17, marginHorizontal: 5 }}>
                                    Employee Type:-
                                </Text>
                                <Picker
                                    selectedValue={this.state.emp_type}
                                    style={{ height: 25, flex: 0.6 }}
                                    onValueChange={(itemValue) => { this.setState({ emp_type: itemValue }) }}
                                >
                                    <Picker.Item label="Permenent" value="Permenent" />
                                    <Picker.Item label="Temporary" value="Temporary" />
                                </Picker>
                            </View>

                            <TouchableOpacity onPress={this.EAdd}>
                                <Text style={{ textAlign: 'center', fontSize: 17, color: '#FCFCFC', backgroundColor: '#131313', marginHorizontal: 70, marginVertical: 5, padding: 5, borderRadius: 10 }}>Go For Book Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.Cancel}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: '#131313', marginBottom: 10, marginVertical: 5 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </React.Fragment>
        )
    }
}

OraganizationHomeScreen.navigationOptions = {
    headerShown: false,
};


const styles = StyleSheet.create({

    MainContainer: {
        alignItems: 'center',
        //justifyContent: 'center',
        flex: 1.3,
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