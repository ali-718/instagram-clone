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
    refresh: false
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
          </View>
        )}
      />
    );
  }
}
