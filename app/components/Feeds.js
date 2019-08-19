import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import logo from "../../assets/Images/instagram.png";
import Face from "../../assets/Images/face.jpg";
import { Avatar } from "react-native-elements";

export default class Feeds extends Component {
  state = {
    data: [1, 2, 3, 4, 5],
    refresh: false,
    color: false
  };

  loadNew = () => {
    this.setState({
      refresh: true
    });

    this.setState({
      refresh: false,
      data: [6, 7, 8, 9, 10]
    });
  };
  render() {
    return (
      <FlatList
        onRefresh={() => this.loadNew()}
        refreshing={this.state.refresh}
        style={{ flex: 1, backgroundColor: "#eee" }}
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "white"
            }}
          >
            {/* Feed header */}
            <View
              style={{
                width: "100%",
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 15
              }}
            >
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
                  <Icon
                    name="dots-vertical"
                    type="MaterialCommunityIcons"
                    style={{ fontSize: 25 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Feed header ends */}

            {/* feed image */}
            <Image
              source={{
                uri: `https://source.unsplash.com/random/${Math.random() * 800 +
                  500}`
              }}
              style={{ width: "100%", height: 250, resizeMode: "cover" }}
            />
            {/* feed image ends */}

            {/* feed footer */}
            <View style={{ width: "100%" }}>
              <View style={{ width: "100%", height: 40, flexDirection: "row" }}>
                <View
                  style={{
                    width: "10%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ color: !this.state.color })}
                  >
                    <Icon
                      name={this.state.color ? "ios-heart" : "ios-heart-empty"}
                      style={{ color: this.state.color ? "red" : "black" }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "10%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="message1"
                    type="AntDesign"
                    style={{ fontSize: 22 }}
                  />
                </View>
                <View
                  style={{
                    width: "60%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontWeight: "bold" }}>6 likes</Text>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 10, color: "gray" }}>
                  38 minutes ago
                </Text>
              </View>
            </View>
            {/* feed footer ends */}
          </View>
        )}
      />
    );
  }
}
