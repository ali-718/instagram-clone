import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Platform,
  TouchableOpacity
} from "react-native";
import styles from "../../constants/styles";
import { f, database, auth, storage } from "../../config/config";
import { Avatar, Button } from "react-native-elements";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Icon } from "native-base";

export default class UserProfile extends Component {
  state = {
    isLogin: false,
    isFollow: false,
    isMe: false,
    isLoading: true,
    imagesData: [],
    refresh: false,
    userName: "",
    userAvatar: "",
    userRealName: "",
    description: "",
    userId: "",
    isImageLoading: true
  };

  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");
        const clickedUser = this.props.navigation.getParam("Id");

        if (clickedUser === f.auth().currentUser.uid) {
          this.setState({
            isMe: true
          });
        }
        this.userFetchData();
        this.loadNew();
        this.setState({
          isLogin: true
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
    const selectedId = this.props.navigation.getParam("Id");
    database
      .ref("users")
      .child(selectedId)
      .once("value", snapshot => {
        this.setState({
          userId: this.props.navigation.getParam("Id"),
          userAvatar: snapshot.val().avatar,
          userName: snapshot.val().username,
          userRealName: snapshot.val().name,
          email: snapshot.val().email,
          isLoading: false,
          description: snapshot.val().description
        });
      });
  };

  loadNew = () => {
    const selectedId = this.props.navigation.getParam("Id");

    this.setState({
      refresh: true,
      isImageLoading: true,
      imagesData: []
    });
    database
      .ref("users")
      .child(selectedId)
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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => this.refreshing()}
              />
            }
            style={{ flex: 1 }}
          >
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
                  style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    elevation: 3,
                    borderBottomWidth: Platform.OS == "ios" ? 0.2 : 0,
                    borderBottomColor: "gainsboro",
                    borderStyle: "solid"
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      height: 50,
                      justifyContent: "center"
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        height: 20
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: "30%",
                          height: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row"
                        }}
                        onPress={() => this.props.navigation.goBack()}
                      >
                        <View
                          style={{
                            width: "30%",
                            height: 20,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Icon
                            name="arrowleft"
                            type="AntDesign"
                            style={{ fontSize: 20 }}
                          />
                        </View>
                        <View
                          style={{
                            width: "70%",
                            height: 20,
                            justifyContent: "center"
                          }}
                        >
                          <Text>Back</Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: "60%",
                          height: 20,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text>{this.state.userRealName}</Text>
                      </View>
                    </View>
                  </View>
                </View>
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
                    <Avatar
                      size="large"
                      rounded
                      source={{
                        uri: this.state.userAvatar
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
                    <Text style={{ fontSize: 25 }}>{this.state.userName}</Text>
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
                          <View style={{ width: "90%" }}>
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
                        <View style={{ width: "50%", alignItems: "center" }}>
                          <View style={{ width: "90%" }}>
                            <Button
                              onPress={() =>
                                this.props.navigation.navigate("Messages", {
                                  user: this.state
                                })
                              }
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
                    <Text style={{ fontWeight: "bold" }}>
                      {this.state.userRealName}
                    </Text>
                    <Text>{this.state.description}</Text>
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
                        data={this.state.imagesData}
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
                <Text> Please log in to see his/her profile </Text>
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
