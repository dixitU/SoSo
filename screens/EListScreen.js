import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
// import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from 'react-native-simple-time-picker';

export class EListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            isModalVisible1: false,
            dataSource: [],
            f_name: '',
            l_name: '',
            e_salary: 0,
            e_id: 0,
            selectedSHours: 0,
            selectedEHours: 0,
            selectedSMinutes: 0,
            selectedEMinutes: 0,
            hour: 0,
            minute: 0,
            t_cost: 0,
            //dates: new Date().getTime(),
            date: new Date().getTime(),
            mode: 'date',
            show: false,
            Discription: '',
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const or_name = navigation.getParam('o_name', 'NO-Oraganization');
        const em_type = navigation.getParam('e_type', 'NO-Employee');

        return fetch('http://192.168.43.32/Elist.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                or_name: or_name,
                emp_job_type: em_type,

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

    Notification = () => {
        this.props.navigation.navigate('Notification');
    }

    Ebook(first_name, last_name, employee_salary, employee_id) {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ f_name: first_name });
        this.setState({ l_name: last_name });
        this.setState({ e_id: employee_id });
        this.setState({ e_salary: employee_salary });
    }

    toggleModal = () => {
        //console.log(this.state.e_id);
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleModal1 = () => {
        this._loadData();
        this.setState({ isModalVisible: !this.state.isModalVisible });
        //this.setState({ isModalVisible1: !this.state.isModalVisible1 });
        if (this.state.minute != 0) {
            Alert.alert('Difference between starting and ending time is in multipal of 1 hour');

        } else {
            this.setState({ isModalVisible1: !this.state.isModalVisible1 });
        }
    };

    _loadData = () => {
        if (this.state.selectedEMinutes >= this.state.selectedSMinutes) {
            this.state.hour = this.state.selectedEHours - this.state.selectedSHours;
            this.state.minute = this.state.selectedEMinutes - this.state.selectedSMinutes;
        } else {
            this.state.minute = this.state.selectedSMinutes - this.state.selectedEMinutes;
            this.state.hour = this.state.selectedEHours - this.state.selectedSHours - 1;
        }
        this.state.t_cost = this.state.hour * this.state.e_salary;
        
    }

    onChange(selectedDate) {
        const currentDate = selectedDate || this.state.date;
        const hh = Object.values(currentDate);
        const h = Object.values(hh);
        if (h[0] == 'dismissed') {
            this.state.date = new Date().getTime();
        } else {
            this.state.date = new Date(Number(Object.values(hh[1]).toString()));
        }
        this.setState({ show: false });
        this.setState({ isModalVisible: !this.state.isModalVisible });
        //console.log(h.toLocaleDateString());
        //console.log(new Date().getTime());
    }
    showDatepicker = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ show: true });
        //this.showMode('date');
    }

    bookRequest = async () => {

        const { navigation } = this.props;
        const or_name = navigation.getParam('o_name', 'NO-Oraganization');
        const {e_id} = this.state;
        const {selectedEHours} = this.state;
        const {selectedSHours} = this.state;
        const {selectedSMinutes} = this.state;
        const {selectedEMinutes} = this.state;
        const {Discription} = this.state;
        const {date} = this.state;
        const userName = await AsyncStorage.getItem('userName');
        //console.log(userName);

        fetch('http://192.168.43.32/CRequest.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                or_name: or_name,
                userOrEmail: userName,
                rq_emp_id: e_id,
                rq_date: date,
                rq_start_time_hr: selectedSHours,
                rq_start_time_min: selectedSMinutes,
                rq_end_time_hr: selectedEHours,
                rq_end_time_min: selectedEMinutes,
                rq_des: Discription,

            })

        }).then((responseData) => responseData.json())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                this.setState({ isModalVisible1: !this.state.isModalVisible1 });
                Alert.alert(responseJson);
                

            }).catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={styles.SectionStyle}>
                        <Icon name="ios-search" style={{ fontSize: 25, paddingLeft: 15 }} />
                        <TextInput placeholder="Search" style={{ flex: 1, fontSize: 20, paddingLeft: 15, width: 250 }} />
                    </View>
                    <TouchableOpacity onPress={this.Notification}>
                        <Icon style={{ marginRight: 10 }} size={40} name={'ios-notifications'} />
                    </TouchableOpacity>
                </View>
                <View >
                    {
                        this.state.dataSource.map((item, key) => (
                            <View key={key} style={styles.MainContainer}>
                                <View style={{ flex: 0.9 }}>
                                    <TouchableOpacity >
                                        <Text style={styles.FlatListItemStyle}  > {item.pro_first_name} {item.pro_last_name} </Text>
                                        <Text style={{ marginLeft: 17 }}>Cost: {item.emp_salary} per hour </Text>
                                    </TouchableOpacity>
                                </View>
                                <View >
                                    <TouchableOpacity onPress={this.Ebook.bind(this, item.pro_first_name, item.pro_last_name, item.emp_salary, item.emp_id)}>
                                        <Text style={styles.HireButton}>Book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ backgroundColor: '#FCFCFC', }}>
                            <Text style={{ textAlign: 'center', color: '#FCFCFC', backgroundColor: '#131313' }}>You are creating book request for </Text>
                            <Text style={{ fontSize: 30, height: 48, textAlign: 'center', color: '#FCFCFC', backgroundColor: '#131313' }}>{this.state.f_name} {this.state.l_name}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 15 }}>
                                <View style={{ flex: .6, alignItems: 'flex-start' }}>
                                    <Text style={{ color: '#131313', fontSize: 20, fontWeight: '100' }}>Booking Date :-</Text>
                                </View>
                                <View style={{ flex: .5, alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={this.showDatepicker} style={{ flexDirection: 'row' }}>
                                        <Icon style={{ marginRight: 10 }} size={30} name={'md-calendar'} />
                                        <Text style={{ color: '#131313', fontSize: 16, fontWeight: '100', borderColor: '#131313', borderWidth: 1, textAlign: 'center', height: 30, paddingTop: 4, paddingHorizontal: 4 }}>{moment(new Date(this.state.date)).format('DD-MM-YYYY')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    // minimumDate={this.state.dates}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(date) => this.onChange(date)}
                                />
                            )}

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 20, marginTop: 10, marginHorizontal: 10 }}>Starting Time:-</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedSHours}
                                    selectedMinutes={this.state.selectedSMinutes}
                                    onChange={(hours, minutes) => this.setState({
                                        selectedSHours: hours, selectedSMinutes: minutes
                                    })}
                                />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 20, marginTop: 10, marginHorizontal: 10 }}>Ending Time:-</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedEHours}
                                    selectedMinutes={this.state.selectedEMinutes}
                                    onChange={(hours, minutes) => this.setState({
                                        selectedEHours: hours, selectedEMinutes: minutes
                                    })}
                                />
                            </View>

                            <TouchableOpacity onPress={this.toggleModal1}>
                                <Text style={{ textAlign: 'center', fontSize: 17, color: '#FCFCFC', backgroundColor: '#131313', marginHorizontal: 70, marginVertical: 5, padding: 5, borderRadius: 10 }}>Go For Book Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleModal}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: '#131313', marginBottom: 10, marginVertical: 5 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>

                <View>
                    <Modal isVisible={this.state.isModalVisible1}>
                        <View style={{ backgroundColor: '#FCFCFC' }}>
                            <Text style={{ textAlign: 'center', color: '#FCFCFC', backgroundColor: '#131313' }}>You are creating book request for </Text>
                            <Text style={{ fontSize: 30, height: 48, textAlign: 'center', color: '#FCFCFC', backgroundColor: '#131313' }}>{this.state.f_name} {this.state.l_name}</Text>
                            <Text style={{ fontSize: 15, margin: 10 }}>Job Discription:-</Text>
                            <Textarea
                                containerStyle={{ height: 100 }}
                                style={styles.textarea}
                                onChangeText={Discription => this.setState({ Discription })}
                                maxLength={250}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                                placeholder={'Discription of Job for which you are booking employee..'}
                            />
                            <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 10, textAlign: 'center' }}>You are booking {this.state.f_name} {this.state.l_name} for {this.state.hour} hours.</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, marginTop: 13, marginHorizontal: 20, textAlign: 'center', flex: 0.8 }}>Amount To Pay :- </Text>
                                <Text style={{ fontSize: 20, color: '#939393', backgroundColor: '#ffffff', padding: 5, marginTop: 10, borderRadius: 5, borderWidth: 1 }}> {this.state.t_cost} </Text>
                            </View>
                            <TouchableOpacity onPress={this.bookRequest}>
                                <Text style={{ textAlign: 'center', fontSize: 17, color: '#FCFCFC', backgroundColor: '#131313', marginHorizontal: 85, marginVertical: 5, padding: 5, borderRadius: 10 }}>Book Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleModal1}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: '#131313', marginBottom: 10, marginVertical: 5 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <View>

                </View>
            </React.Fragment>
        )
    }
}

EListScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({
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
    FlatListItemStyle: {
        fontSize: 25,
        marginHorizontal: 10,
        paddingTop: 5,
        height: 40,
    },
    MainContainer: {
        justifyContent: 'center',
        margin: 10,
        flexDirection: 'row',
    },
    HireButton: {
        height: 30,
        fontSize: 20,
        marginTop: 17,
        backgroundColor: '#131313',
        paddingHorizontal: 10,
        color: '#FCFCFC',
        borderRadius: 10
    },
    TextInputStyleClass: {
        textAlign: 'center',
        marginVertical: 7,
        marginHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#131313',
        flex: 1,
        borderRadius: 40,
    },
    textareaContainer: {
        height: 80,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        padding: 5,
        borderWidth: 1,
        marginHorizontal: 10,
        textAlignVertical: 'top',  // hack android
        height: 70,
        fontSize: 14,
        color: '#333',
        borderRadius: 5
    },
});