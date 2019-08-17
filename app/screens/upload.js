import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../../constants/styles";

export default class Upload extends Component {
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <Text> Upload page </Text>
      </SafeAreaView>
    );
  }
}
