import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import styles from "../../../constants/styles";
import { f, database, auth, storage } from "../../../config/config";
import { Avatar, Button } from "react-native-elements";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Icon } from "native-base";

export default class Profile extends Component {
  state = {
    isLogin: false,
    isFollow: false,
    isMe: true,
    isLoading: true,
    imagesData: [],
    refresh: false,
    userName: "",
    userAvatar: "",
    userRealName: "",
    isImageLoading: true
  };

  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        this.userFetchData();
        this.loadNew();
        console.log("logged in");
        this.setState({
          isLogin: true,
          isLoading: false
        });
      } else {
        console.log("logged out");
        this.setState({
          isLogin: false,
          isLoading: false
        });
      }
    });
  }

  userFetchData = () => {
    database
      .ref("users")
      .child(f.auth().currentUser.uid)
      .once("value", snapshot => {
        console.log(snapshot.val());
      });
  };

  loadNew = () => {
    this.setState({
      refresh: true,
      isImageLoading: true,
      imagesData: []
    });
    database
      .ref("users")
      .child(f.auth().currentUser.uid)
      .child("photos")
      .once("value", res => {
        res.forEach(snapshot => {
          this.state.imagesData.push({ id: snapshot.key, ...snapshot.val() });
          this.setState({
            refresh: false,
            isImageLoading: false
          });
        });
      });
  };

  refreshing = () => {
    this.loadNew();
  };

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        {this.state.isLoading === false ? (
          <ScrollView style={{ flex: 1 }}>
            {this.state.isLogin == true ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {/* Profile header */}
                <View
                  style={{ width: "90%", height: 100, flexDirection: "row" }}
                >
                  <View
                    style={{
                      width: "30%",
                      height: 150,
                      justifyContent: "center",
                      alignItems: "flex-start"
                    }}
                  >
                    {console.log(this.state)}
                    <Avatar
                      size="large"
                      rounded
                      source={{
                        uri:
                          "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-1/c1.0.240.240a/p240x240/67153135_2450461055175994_1461370675527680000_n.jpg?_nc_cat=102&_nc_oc=AQmMILF38wL80ID6os5nifDsPKLVomU2hY96NM6Nnp6dJ0l3yPw-t39_85b2jfKWhp8&_nc_ht=scontent.fkhi10-1.fna&oh=61eaa2974f1ed742670d392dff34e1db&oe=5DDDF953"
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "70%",
                      height: 150,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontSize: 25 }}>Ali Haider</Text>
                    {this.state.isFollow ? (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View style={{ width: "50%" }}>
                          <View style={{ width: "80%" }}>
                            <Button
                              onPress={() => this.setState({ isFollow: false })}
                              title="unfollow"
                              type="outline"
                              style={{
                                width: "90%"
                              }}
                            />
                          </View>
                        </View>
                        <View style={{ width: "50%" }}>
                          <View style={{ width: "80%" }}>
                            <Button
                              title="message"
                              type="solid"
                              style={{
                                width: "90%"
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    ) : this.state.isMe ? (
                      <View
                        style={{
                          width: "80%",
                          marginTop: 10,
                          flexDirection: "row"
                        }}
                      >
                        <View
                          style={{
                            width: "50%"
                          }}
                        >
                          <Button
                            title="Edit"
                            type="solid"
                            buttonStyle={{ width: "80%" }}
                          />
                        </View>
                        <View
                          style={{
                            width: "50%"
                          }}
                        >
                          <Button
                            title="logout"
                            type="solid"
                            buttonStyle={{
                              backgroundColor: "red",
                              width: "80%"
                            }}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: "80%",
                          marginTop: 10
                        }}
                      >
                        <Button
                          onPress={() => this.setState({ isFollow: true })}
                          title="follow"
                          type="solid"
                          buttonStyle={{ width: "100%" }}
                        />
                      </View>
                    )}
                  </View>
                </View>
                {/* Profile header ends */}
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    marginTop: 40,
                    alignItems: "center"
                  }}
                >
                  <View style={{ width: "90%" }}>
                    <Text style={{ fontWeight: "bold" }}>Ali Haider</Text>
                    <Text>I am a Mobile app and website developer</Text>
                    <Text>The developer you need</Text>
                    <Text>Trainer at Sir Syed University</Text>
                    <Text>Former Trainer at NED</Text>
                    <Text>React Enthusiast</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    padding: 5,
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {this.state.isImageLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <FlatList
                        style={{ flex: 1, width: "100%" }}
                        onRefresh={() => this.refreshing()}
                        data={this.state.imagesData}
                        refreshing={this.state.refresh}
                        numColumns={3}
                        renderItem={({ item }) => (
                          <View key={item.id} style={{ margin: 5 }}>
                            <Image
                              source={{ uri: item.url }}
                              style={{ width: 100, height: 100 }}
                            />
                          </View>
                        )}
                      />
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: Dimensions.get("window").height,
                  width: "100%"
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://cdn.dribbble.com/users/2046015/screenshots/6015680/08_404.gif"
                  }}
                  style={{ width: "100%", height: 250 }}
                />
                <Text> You are not logged in </Text>
                <Text> Please log in to see your profile </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%"
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
