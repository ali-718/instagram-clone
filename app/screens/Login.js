import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Logo from "../../assets/Images/logo.png";
import { Icon } from "native-base";
import * as Facebook from "expo-facebook";
import { f, database, auth, storage } from "../../config/config";

export default class Login extends Component {
  state = {
    Email: "",
    Password: ""
  };

  FacebookLogin = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "1684076001722836",
      { permissions: ["public_profile", "email"] }
    );

    if (type === "success") {
      const credentials = f.auth.FacebookAuthProvider.credential(token);

      f.auth()
        .signInWithCredential(credentials)
        .then(res => {
          database
            .ref("users")
            .child(res.user.uid)
            .once("value")
            .then(res => {
              if (res.val()) {
                console.log("res.val() is availaible");
                this.props.navigation.navigate("Edit", { fromLogin: true });
              } else {
                database
                  .ref("users")
                  .child(res.user.uid)
                  .set({
                    name: res.user.providerData[0].displayName,
                    email: res.user.providerData[0].email,
                    avatar: res.user.providerData[0].photoURL
                  })
                  .then(() => {
                    console.log("res.val() not working");
                    this.props.navigation.navigate("Edit", { fromLogin: true });
                  });
              }
            });
        })
        .catch(e => console.log(e));
    }
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
      </View>
    );
  }
}
