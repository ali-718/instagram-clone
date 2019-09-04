import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Logo from "../../assets/Images/logo.png";
import { Icon } from "native-base";

export default class Login extends Component {
  state = {
    Email: ""
  };

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={Logo} style={{ width: "80%", height: 100 }} />
        <View style={{ width: "100%", marginTop: 50, alignItems: "center" }}>
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
              marginTop: 10,
              height: 50,
              fontSize: 20,
              paddingLeft: 10
            }}
            placeholder="Username or Email"
            placeholderTextColor="#A9A9A9"
          />
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
              marginTop: 10,
              height: 50,
              fontSize: 20,
              paddingLeft: 10
            }}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
          />
        </View>
        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#3498F1",
              width: "80%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
          <Text>OR</Text>
          <TouchableOpacity
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
      </View>
    );
  }
}
