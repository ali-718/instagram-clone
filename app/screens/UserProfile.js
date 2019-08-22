import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import styles from "../../constants/styles";
import { f, database, auth, storage } from "../../config/config";
import { Avatar, Button } from "react-native-elements";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Icon, Header } from "native-base";

export default class UserProfile extends Component {
  state = {
    isLogin: false,
    isFollow: false,
    isLoading: true,
    user: {}
  };

  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");
        this.setState({
          isLogin: true
        });
      } else {
        console.log("logged out");
        this.setState({
          isLogin: false
        });
      }
    });

    this.checkParams();
  }

  checkParams = () => {
    const params = this.props.navigation.getParam("Id");

    if (params) {
      this.fetchUserInfo(params);
    } else {
      this.props.navigation.goBack();
    }
  };

  fetchUserInfo = userID => {
    database
      .ref("users")
      .child(userID)
      .once("value")
      .then(snapshot => {
        const exist = snapshot.val() !== null;

        if (exist) {
          this.setState({
            user: { ...snapshot.val(), id: snapshot.key },
            isLoading: false
          });
        } else {
          this.props.navigation.goBack();
        }
      })
      .catch(e => {
        this.props.navigation.goBack();
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
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
                          justifyContent: "center"
                        }}
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
                        <Text>{this.state.user.id}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "90%",
                    height: 100,
                    flexDirection: "row",
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      width: "30%",
                      height: 100,
                      justifyContent: "center",
                      alignItems: "flex-start"
                    }}
                  >
                    <Avatar
                      size="large"
                      rounded
                      source={{
                        uri: this.state.user.avatar
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "70%",
                      height: 100,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontSize: 25 }}>
                      {this.state.user.username}
                    </Text>
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
                      {this.state.user.name}
                    </Text>
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
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", flex: 1 }}>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                    <Col style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1135&q=80"
                        }}
                        style={{ width: "100%", height: 100 }}
                      />
                    </Col>
                  </Row>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <Text> You are not logged in </Text>
                <Text> Please login to view your profile </Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
