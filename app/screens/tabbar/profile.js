import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform
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
    isMe: false
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
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
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
              <View style={{ width: "90%", height: 100, flexDirection: "row" }}>
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
      </SafeAreaView>
    );
  }
}
