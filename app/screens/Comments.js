import React, { Component } from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import styles from "../../constants/styles";
import { f, database, auth, storage } from "../../config/config";

export default class Comments extends Component {
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
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.isLogin == true ? (
            <Text> Comments </Text>
          ) : (
            <View>
              <Text> You are not logged in </Text>
              <Text> Please log in to see comments </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
