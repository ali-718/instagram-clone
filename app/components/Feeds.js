import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import logo from "../../assets/Images/instagram.png";
import Face from "../../assets/Images/face.jpg";
import { Avatar } from "react-native-elements";
import { f, database, auth, storage } from "../../config/config";

export default class Feeds extends Component {
  state = {
    data: [],
    refresh: false,
    color: false,
    isLoading: true
  };

  componentDidMount() {
    this.loadFeed();
  }

  searchForCurrentUserLike = (photoId, userId) => {
    database
      .ref("likes")
      .child(photoId)
      .once("value")
      .then(item => {
        item.forEach(snapshot => {
          if (userId === snapshot.author) {
            console.log(snapshot);
          }
          return false;
        });
      });
  };

  addLike = photoId => {
    let likesExist;
    let UserLikeExist;
    database
      .ref("photos")
      .child(photoId)
      .once("value")
      .then(data => {
        data.val().likes ? (likesExist = true) : (likesExist = false);
      });

    setTimeout(() => {
      if (likesExist !== undefined) {
        if (likesExist) {
          database
            .ref("photos")
            .child(photoId)
            .child("likes")
            .once("value")
            .then(snapshot => {
              snapshot.forEach(item => {
                if (item.val().author === f.auth().currentUser.uid) {
                  database
                    .ref("photos")
                    .child(photoId)
                    .child("likes")
                    .child(item.key)
                    .set(null);
                } else {
                  database
                    .ref("photos")
                    .child(photoId)
                    .child("likes")
                    .push({
                      author: f.auth().currentUser.uid
                    });
                }
              });
            });
        } else {
          database
            .ref("photos")
            .child(photoId)
            .child("likes")
            .push({
              author: f.auth().currentUser.uid
            });
          console.log("still adding data");
        }
      } else {
        console.log("problem is here");
      }
    }, 800);
  };

  loadFeed = () => {
    this.setState({
      refresh: true,
      data: []
    });

    var that = this;

    database
      .ref("photos")
      .once("value")
      .then(snapshot => {
        const exist = snapshot.val() !== null;
        if (exist) {
          snapshot.forEach(data => {
            database
              .ref("users")
              .child(data.val().author)
              .once("value")
              .then(childSnapshot => {
                that.state.data.push({
                  id: data.key,
                  url: data.val().url,
                  caption: data.val().caption,
                  posted: that.timeConverter(data.val().posted),
                  avatar: childSnapshot.val().avatar,
                  username: childSnapshot.val().username,
                  userId: data.val().author,
                  likes: data.val().likes
                    ? Object.values(data.val().likes).map(item => item.author)
                    : []
                });
                this.setState({
                  refresh: false,
                  isLoading: false
                });
              });
          });
        }
      });
  };

  loadNew = () => {
    this.loadFeed();
  };

  pluralCheck = s => {
    if (s === 1) {
      return " ago";
    } else {
      return "s ago";
    }
  };

  timeConverter = timestamp => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var intervals = Math.floor(seconds / 31536000);

    if (intervals > 1) {
      return intervals + " year" + this.pluralCheck(intervals);
    }

    intervals = Math.floor(seconds / 2592000);

    if (intervals > 1) {
      return intervals + " month" + this.pluralCheck(intervals);
    }

    intervals = Math.floor(seconds / 86400);

    if (intervals > 1) {
      return intervals + " day" + this.pluralCheck(intervals);
    }

    intervals = Math.floor(seconds / 3600);

    if (intervals > 1) {
      return intervals + " hour" + this.pluralCheck(intervals);
    }

    intervals = Math.floor(seconds / 60);

    if (intervals > 1) {
      return intervals + " minute" + this.pluralCheck(intervals);
    }

    return Math.floor(seconds) + " second" + this.pluralCheck(seconds);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading === true ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            onRefresh={() => this.loadNew()}
            refreshing={this.state.refresh}
            style={{ flex: 1, backgroundColor: "#eee" }}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                key={item.id}
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
                  <TouchableOpacity
                    style={{
                      width: "50%",
                      flex: 1,
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("Profile", {
                        Id: item.userId
                      })
                    }
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "30%"
                      }}
                    >
                      <View
                        style={{ borderRadius: 100, width: 30, height: 30 }}
                      >
                        <Avatar rounded source={{ uri: item.avatar }} />
                      </View>
                    </View>
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      {item.username}
                    </Text>
                  </TouchableOpacity>
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
                    uri: item.url
                  }}
                  style={{ width: "100%", height: 300, resizeMode: "cover" }}
                />
                {/* feed image ends */}

                {/* feed footer */}
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}
                  >
                    <View
                      style={{
                        width: "10%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.addLike(item.id);
                          this.setState({ color: !this.state.color });
                        }}
                      >
                        <Icon
                          name={
                            item.likes.indexOf(f.auth().currentUser.uid) > -1
                              ? "ios-heart"
                              : "ios-heart-empty"
                          }
                          style={{
                            color:
                              item.likes.indexOf(f.auth().currentUser.uid) > -1
                                ? "red"
                                : "black"
                          }}
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
                        onPress={() =>
                          this.props.navigation.navigate("Comments", {
                            photoId: item.id
                          })
                        }
                        name="message1"
                        type="AntDesign"
                        style={{ fontSize: 22 }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>6 likes</Text>
                  </View>
                  <View style={{ paddingLeft: 10, width: "100%" }}>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.username}
                      </Text>{" "}
                      {item.caption}
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      {item.posted}
                    </Text>
                  </View>
                </View>
                {/* feed footer ends */}
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
