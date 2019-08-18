import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "../../constants/styles";
import { Icon } from "native-base";
import logo from "../../assets/Images/instagram.png";

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
              elevation: 3
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
        </View>
      </SafeAreaView>
    );
  }
}
