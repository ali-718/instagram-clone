import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import styles from "../../constants/styles";
import { Icon } from "native-base";
import logo from "../../assets/Images/instagram.png";
import Feeds from "../components/Feeds";

export default class Feed extends Component {
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <View style={{ width: "100%", flex: 1 }}>
          {/* Header */}
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "white",
              elevation: 3,
              borderBottomWidth: Platform.OS == "ios" ? 0.2 : 0,
              borderBottomColor: "gainsboro",
              borderStyle: "solid"
            }}
          >
            <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30%"
                  }}
                >
                  <Icon name="camera" type="Feather" />
                </TouchableOpacity>
                <Image source={logo} style={{ width: 100, height: 30 }} />
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30%"
                  }}
                >
                  <Icon name="paper-plane" type="SimpleLineIcons" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Header ends */}
          <View style={{ width: "100%" }}>
            <Feeds />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
