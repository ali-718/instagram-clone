import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../../../constants/styles";
import { f, database, auth, storage } from "../../../config/config";

export default class Upload extends Component {
  state = {
    isLogin: false
  };

  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");
        this.setState({
          isLogin: true
        });
      } else {
        console.log("logged out");
        this.setState({
          isLogin: false
        });
      }
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          {this.state.isLogin == true ? (
            <Text> Upload Page </Text>
          ) : (
            <View>
              <Text> You are not logged in </Text>
              <Text> Please log in to upload photos </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
