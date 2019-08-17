import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../../constants/styles";

export default class Profile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <Text> Profile Page </Text>
      </SafeAreaView>
    );
  }
}
