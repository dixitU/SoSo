import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text, ScrollView, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export class SignUpScreen extends Component {

  // state = { gender: '' }
  // updateUser = (gender) => {this.setState({ gender: gender })}

  constructor(props) {

    super(props);

    this.state = {

      UserEmail: '',
      UserPassword: '',
      UserConfimPassword: '',
      //date: "2016-05-15",
      FirstName: '',
      LastName: '',
      PhoneNo: '',
      gender: 'male',
      UserName: '',
      Street: '',
      Area: '',
      Astate: '',
      City: '',
      Country: '',
      date: new Date().getTime(),
      mode: 'date',
      show: false,
    }

  }

  UserRegistrationFunction = () => {


    const { FirstName } = this.state;
    const { LastName } = this.state;
    const { gender } = this.state;
    const { date } = this.state;
    const { PhoneNo } = this.state;
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    const { UserConfimPassword } = this.state;
    const { UserName } = this.state;
    const { Street } = this.state;
    const { Area } = this.state;
    const { City } = this.state;
    const { Astate } = this.state;
    const { Country } = this.state;



    fetch('http://192.168.43.32/db.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        fname: FirstName,
        lname: LastName,
        gender: gender,
        dob: date,
        phoneno: PhoneNo,
        user: UserName,
        email: UserEmail,
        pro_street: Street,
        ad_area: Area,
        ad_city: City,
        ad_state: Astate,
        ad_india: Country,
        password: UserPassword,
        confimpassword: UserConfimPassword,
        
      })

    }).then((responseData) => responseData.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });


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
    //console.log(h.toLocaleDateString());
    //console.log(new Date().getTime());
  }
  showDatepicker = () => {
    this.setState({ show: true });
    //this.showMode('date');
  }

  render() {

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <Text style={{ fontSize: 25, color: "#FCFCFC", textAlign: 'center', marginTop: 15, fontWeight: 'bold', backgroundColor: '#131313' }}>Sign Up</Text>
          <Text style={{ color: '#FCFCFC', textAlign: 'center', marginVertical: 5, fontSize: 20 }}>User Personal Details:-</Text>

          <TextInput
            placeholder="First Name"
            onChangeText={FirstName => this.setState({ FirstName })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Last Name"
            onChangeText={LastName => this.setState({ LastName })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="User Name"
            onChangeText={UserName => this.setState({ UserName })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <View style={{ flex: .5, alignItems: 'center' }}>
              <Text style={{ color: '#FCFCFC', fontSize: 16, fontWeight: '100', marginBottom: 10, marginTop: 6 }}>Select a Gender :-</Text>
            </View>
            <View style={{ flex: .5, borderColor: '#FCFCFC', borderWidth: 1, height: 54 }}>
              <Picker style={{ color: '#FCFCFC' }} selectedValue={this.state.gender} onValueChange={(gender) => { this.setState({ gender: gender }) }}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
            <View style={{ flex: .5, alignItems: 'center', marginTop: 3 }}>
              <Text style={{ color: '#FCFCFC', fontSize: 16, fontWeight: '100' }}>Date Of Birth :-</Text>
            </View>
            <View style={{ flex: .4 }}>
              <TouchableOpacity onPress={this.showDatepicker} style={{ flexDirection: 'row' }}>
                <Icon style={{ marginRight: 10, color: '#FCFCFC' }} size={30} name={'md-calendar'} />
                <Text style={{ color: '#FCFCFC', fontSize: 16, fontWeight: '100', borderColor: '#FCFCFC', borderWidth: 1, textAlign: 'center', height: 30, paddingTop: 4, paddingHorizontal: 4, marginBottom: 5 }}>{moment(new Date(this.state.date)).format('DD-MM-YYYY')}</Text>
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

          <TextInput
            placeholder="Enter User Phone No."
            onChangeText={PhoneNo => this.setState({ PhoneNo })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <Text style={{ color: '#FCFCFC', textAlign: 'center', marginVertical: 5, fontSize: 20 }}>User Address Details:-</Text>
          <TextInput
            placeholder="Flat No. or Street"
            onChangeText={Street => this.setState({ Street })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="Area"
            onChangeText={Area => this.setState({ Area })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="City"
            onChangeText={City => this.setState({ City })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="State"
            onChangeText={Astate => this.setState({ Astate })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="Country"
            onChangeText={Country => this.setState({ Country })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <Text style={{ color: '#FCFCFC', textAlign: 'center', marginVertical: 5, fontSize: 20 }}>User Account Details:-</Text>
          <TextInput
            placeholder="Enter User Email"
            onChangeText={UserEmail => this.setState({ UserEmail })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Enter User Password"
            onChangeText={UserPassword => this.setState({ UserPassword })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            secureTextEntry={true}
          />

          <TextInput
            placeholder="Enter User ConfimPassword"
            onChangeText={UserConfimPassword => this.setState({ UserConfimPassword })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            secureTextEntry={true}
          />

          {/* <Button title="Sign Up" onPress={this.UserRegistrationFunction} color="#2196F3" /> */}
          <TouchableOpacity
            style={styles.title}
            onPress={this.UserRegistrationFunction}
          >
            <Text style={{ color: '#131313', fontSize: 16, fontWeight: '100' }}> Sign Up </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }

}

SignUpScreen.navigationOptions = {
  headerShown: false,
};



const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    // margin: 10,
    backgroundColor: '#131313'
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginVertical: 7,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#FCFCFC',
    color: '#FCFCFC',
    // Set border Radius.
    borderRadius: 40,
  },

  title: {
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    padding: 7.5,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    height: 40,
  }

});

// export {HomeScreen}