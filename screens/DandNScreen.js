import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export class DandNScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    Notification = () => {
        this.props.navigation.navigate('Notification');
    }

    EListD = () => {
        const { navigation } = this.props;
        const or_name = navigation.getParam('o_name', 'NO-Oraganization');
        this.props.navigation.navigate('EList',{o_name: or_name, e_type: 'doctor'});
    }
    EListN = () => {
        const { navigation } = this.props;
        const or_name = navigation.getParam('o_name', 'NO-Oraganization');
        this.props.navigation.navigate('EList',{o_name: or_name, e_type: 'nurse'});
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
                <View style={styles.MainContainer}>
                    <TouchableOpacity onPress={() => this.EListD()}>
                        <Text style={styles.FlatListItemStyle} >Doctor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.EListN()}>
                        <Text style={styles.FlatListItemStyle} >Nurse</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }
}

DandNScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        //flexDirection: 'column',
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
    FlatListItemStyle: {
        fontSize: 25,
        marginTop: 10,
        paddingTop: 5,
        height: 48,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});