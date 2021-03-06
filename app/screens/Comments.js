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
  TouchableOpacity,
  KeyboardAvoidingView
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
    refresh: false,
    userComment: ""
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

  commentsQuery = () => {
    return new Promise((resolve, reject) => {
      database
        .ref("comments")
        .child(this.props.navigation.getParam("photoId"))
        .orderByChild("posted")
        .once("value")
        .then(snapshot => {
          const exist = snapshot.val() !== null;

          if (!exist) {
            reject(false);
          }
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
                resolve(true);
              })
              .catch(() => console.log("no comments"));
          });
        });
    });
  };

  fetchComments = () => {
    this.commentsQuery().catch(() => {
      if (this.state.commentsData.length === 0) {
        this.setState({
          isLoading: false,
          refresh: false
        });
      }
    });
  };

  postComments = (comment, username, avatar) => {
    this.setState({
      commentsData: [],
      userComment: ""
    });

    const posted = Math.floor(Date.now() / 1000);

    database
      .ref("comments")
      .child(this.props.navigation.getParam("photoId"))
      .push({
        author: f.auth().currentUser.uid,
        comment: comment,
        posted: posted
      })
      .then(() => {
        this.commentsQuery();
      });
  };

  refreshControl = () => {
    this.setState({
      refresh: true,
      commentsData: [],
      isLoading: true
    });
    this.commentsQuery();
  };

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        {console.log(this.state)}
        {this.state.isLoading === true ? (
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
          <KeyboardAvoidingView
            behavior="padding"
            enabled={true}
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
                  <ScrollView
                    showsVerticalScrollIndicator={false}
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
                )}

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
                      <Input
                        onChangeText={val => {
                          this.setState({ userComment: val });
                        }}
                        placeholder="write comment...!"
                        value={this.state.userComment}
                      />
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
                    <TouchableOpacity
                      onPress={() => this.postComments(this.state.userComment)}
                      disabled={!(this.state.userComment.length > 0)}
                    >
                      <Text
                        style={{
                          color: "blue",
                          opacity: this.state.userComment.length > 0 ? 1 : 0.2
                        }}
                      >
                        Post
                      </Text>
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
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    );
  }
}
