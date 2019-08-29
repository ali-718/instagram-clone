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
import { Input, Item, Icon, Button } from "native-base";
import { Avatar } from "react-native-elements";

export default class Comments extends Component {
  state = {
    isLogin: false,
    isLoading: true,
    photoId: "",
    commentsData: [],
    refresh: false
  };

  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");
        this.setState({
          isLogin: true
        });
        this.fetchComments();
      } else {
        console.log("logged out");
        this.setState({
          isLogin: false,
          isLoading: false
        });
      }
    });
  }

  fetchComments = () => {
    this.setState({
      isLoading: true
    });
    database
      .ref("comments")
      .child(this.props.navigation.getParam("photoId"))
      .once("value")
      .then(snapshot => {
        snapshot.forEach(item => {
          database
            .ref("users")
            .child(item.val().author)
            .once("value")
            .then(childSnapshot => {
              this.state.commentsData.push({
                userId: childSnapshot.key,
                userAvatar: childSnapshot.val().avatar,
                userName: childSnapshot.val().username,
                posted: item.val().posted,
                comment: item.val().comment,
                id: item.key
              });

              this.setState({
                isLoading: false,
                refresh: false
              });
            });
        });
      });

    if (this.state.commentsData.length === 0) {
      this.setState({
        isLoading: false
      });
    }
  };

  refreshControl = () => {
    this.setState({
      refresh: true,
      commentsData: []
    });
    this.fetchComments();
  };

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        {console.log(this.state)}
        {this.state.isLoading ? (
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1
            }}
          >
            {this.state.isLogin == true ? (
              <View style={{ width: "100%", flex: 1 }}>
                {/* comments header start */}
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
                        <Text>Comments</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* comments header ends */}
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refresh}
                      onRefresh={() => this.refreshControl()}
                    />
                  }
                  style={{ width: "100%", flex: 1 }}
                >
                  {this.state.commentsData.length > 0
                    ? this.state.commentsData.map(item => (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            marginTop: 10,
                            padding: 10
                          }}
                          key={item.id}
                        >
                          <View
                            style={{
                              width: "15%",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Avatar
                              size="medium"
                              rounded
                              source={{
                                uri: item.userAvatar
                              }}
                            />
                          </View>
                          <View
                            style={{
                              width: "85%",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 10
                            }}
                          >
                            <View style={{ width: "100%" }}>
                              <Text style={{ fontWeight: "bold" }}>
                                {item.userName}
                              </Text>
                            </View>
                            <View style={{ width: "100%", marginTop: 10 }}>
                              <Text>{item.comment}</Text>
                            </View>
                          </View>
                        </View>
                      ))
                    : null}
                </ScrollView>
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    elevation: 3,
                    borderTopWidth: Platform.OS == "ios" ? 0.2 : 0,
                    borderTopColor: "gainsboro",
                    borderStyle: "solid"
                  }}
                >
                  <View
                    style={{
                      width: "85%",
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Item>
                      <Input placeholder="write comment...!" r />
                    </Item>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity>
                      <Text style={{ color: "blue" }}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text> You are not logged in </Text>
                <Text> Please log in to see comments </Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
}
