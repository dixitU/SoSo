import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, Image, ImageBackground, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export class HomeScreen extends Component {

    // UserLogoutFunction = () => {
    //     AsyncStorage.clear();
    //     this.props.navigation.navigate('Login');
    // }

    constructor(props) {
        super(props);
        this._loadData();
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }

    GetFlatListItem(or_name) {
        this.props.navigation.navigate('DandN', { o_name: or_name });
    }


    _loadData = async () => {
        const userName = await AsyncStorage.getItem('userName');

        return fetch('http://192.168.43.32/SearchService.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: userName,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
                //console.log(this.state.dataSource)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    Notification = () => {
        this.props.navigation.navigate('Notification');
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

                    <FlatList

                        data={this.state.dataSource}

                        renderItem={({ item }) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.or_name)} > {item.or_name} </Text>}

                        keyExtractor={(item, index) => index.toString()}

                    />

                </View>

            </React.Fragment>
        )
    }
}

HomeScreen.navigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        flexDirection: 'column',
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