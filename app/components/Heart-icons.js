import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon } from "native-base";

export default class Hearticons extends Component {
  render() {
    return (
      <Icon
        name={"ios-heart"}
        style={{
          color: "black"
        }}
      />
    );
  }
}
