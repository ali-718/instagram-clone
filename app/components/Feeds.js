import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Icon, Thumbnail } from "native-base";
import logo from "../../assets/Images/instagram.png";
import Face from "../../assets/Images/face.jpg";
import { Avatar } from "react-native-elements";

export default class Feeds extends Component {
  render() {
    return (
      <View>
        <View style={{ width: "100%" }}>
          {/* Header */}
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "white"
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
                  <View style={{ borderRadius: 100, width: 30, height: 30 }}>
                    <Avatar rounded source={Face} />
                  </View>
                </TouchableOpacity>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Ali Haider
                </Text>
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
                  <Icon name="dots-vertical" type="MaterialCommunityIcons" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Header ends */}
        </View>
      </View>
    );
  }
}
