import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../../constants/styles";

export default class UserProfile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <Text> {this.props.navigation.getParam("Id")} </Text>
      </SafeAreaView>
    );
  }
}
