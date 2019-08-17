import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Feed from "./app/screens/feed";
import Profile from "./app/screens/profile";
import Upload from "./app/screens/upload";

const Navigator = createBottomTabNavigator({
  Feed: {
    screen: Feed
  },
  Profile: {
    screen: Profile
  },
  Upload: {
    screen: Upload
  }
});

const MainStack = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return <MainStack />;
  }
}
