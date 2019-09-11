import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Logo from "../../assets/Images/logo.png";
import { Icon } from "native-base";
import * as Facebook from "expo-facebook";
import { f, database, auth, storage } from "../../config/config";

export default class Testing extends Component {
  state = {
    Email: "",
    Password: ""
  };

  render() {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Image style={{ width: "100%", height: 110 }} source={Logo} />
        <TextInput
          onChangeText={val => {
            this.setState({ Email: val });
          }}
          value={this.state.Email}
          style={{
            borderWidth: 1,
            width: "80%",
            borderRadius: 5,
            backgroundColor: "rgba(220,220,220,0.3)",
            marginTop: 20,
            height: 50,
            fontSize: 20,
            paddingLeft: 10
          }}
          placeholder="Username or Email"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          onChangeText={val => {
            this.setState({ Password: val });
          }}
          value={this.state.Email}
          style={{
            borderWidth: 1,
            width: "80%",
            borderRadius: 5,
            backgroundColor: "rgba(220,220,220,0.3)",
            marginTop: 10,
            height: 50,
            fontSize: 20,
            paddingLeft: 10
          }}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#3498F1",
            width: "80%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 20,
            marginBottom: 10
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity
          onPress={() => this.FacebookLogin()}
          style={{
            backgroundColor: "#3498F1",
            width: "80%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 10,
            flexDirection: "row"
          }}
        >
          <Icon
            name="facebook-square"
            type="FontAwesome"
            style={{ color: "white" }}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20
            }}
          >
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
