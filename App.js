import React, { Component } from "react";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import { Text, View } from "react-native";
import Feed from "./app/screens/feed";
import Upload from "./app/screens/upload";
import Profile from "./app/screens/profile";
import { f, database, auth, storage } from "./config/config";

export default class App extends Component {
  state = {
    activeTab: 0
  };

  loginUser = async () => {
    await auth.signInWithEmailAndPassword("test@test.com", "alihaider");
  };

  constructor() {
    super();
    this.loginUser();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          onChangeTab={val => this.setState({ activeTab: val.i })}
          tabBarUnderlineStyle={{ opacity: 0 }}
          tabBarPosition="bottom"
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <Icon
                  name="home"
                  style={{
                    color: this.state.activeTab === 0 ? "black" : "gray"
                  }}
                />
              </TabHeading>
            }
          >
            <Feed />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <Icon
                  name="plus-square"
                  type="FontAwesome5"
                  style={{
                    color: this.state.activeTab === 1 ? "black" : "gray"
                  }}
                />
              </TabHeading>
            }
          >
            <Upload />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <Icon
                  name="user"
                  type="FontAwesome5"
                  style={{
                    color: this.state.activeTab === 2 ? "black" : "gray"
                  }}
                />
              </TabHeading>
            }
          >
            <Profile />
          </Tab>
        </Tabs>
      </View>
    );
  }
}
