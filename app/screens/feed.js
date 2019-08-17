import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import styles from "../../constants/styles";

export default class Feed extends Component {
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <Text> Feed page </Text>
      </SafeAreaView>
    );
  }
}
