import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Logo from "../../assets/Images/logo.png";
import { f, database, auth, storage } from "../../config/config";
import { Spinner } from "native-base";

export default class SplashScreen extends Component {
  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        database
          .ref("users")
          .child(user.uid)
          .once("value")
          .then(res => {
            if (res.val()) {
              this.props.navigation.navigate("Home");
            } else {
              database
                .ref("users")
                .child(user.uid)
                .set({
                  name: user.providerData[0].displayName,
                  email: user.providerData[0].email,
                  avatar: user.providerData[0].photoURL
                })
                .then(() => {
                  console.log("res.val() not working");
                  this.props.navigation.navigate("Edit", { fromLogin: true });
                });
            }
          });
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={Logo} style={{ width: "80%", height: 100 }} />
        <Spinner size="large" color="blue" style={{ marginTop: 20 }} />
      </View>
    );
  }
}
