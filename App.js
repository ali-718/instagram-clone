import React, { Component } from "react";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import { Text, View } from "react-native";
import Feed from "./app/screens/tabbar/feed";
import Upload from "./app/screens/tabbar/upload";
import Profile from "./app/screens/tabbar/profile";
import { f, database, auth, storage } from "./config/config";
import { createAppContainer, createStackNavigator } from "react-navigation";
import UserProfile from "./app/screens/UserProfile";
import Comments from "./app/screens/Comments";
import Edit from "./app/screens/Edit";
import CameraComponent from "./app/screens/Camera";
import Login from "./app/screens/Login";
import SplashScreen from "./app/screens/SplashScreen";
import Testing from "./app/screens/Testing";
import Messages from "./app/screens/Messages";

class Tabbar extends Component {
  state = {
    activeTab: 0
  };

  // loginUser = async () => {
  //   await auth.signIn
  // };

  constructor() {
    super();
    // this.loginUser();
  }

  componentDidMount() {
    console.disableYellowBox = true;
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
            <Feed navigation={this.props.navigation} />
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
            <Upload navigation={this.props.navigation} />
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
            <Profile navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const Stack = createStackNavigator(
  {
    Home: {
      screen: Tabbar
    },
    Profile: {
      screen: UserProfile
    },
    Comments: {
      screen: Comments
    },
    Edit: {
      screen: Edit
    },
    Camera: {
      screen: CameraComponent
    },
    Upload: {
      screen: Upload
    },
    Login: {
      screen: Login
    },
    SplashScreen: {
      screen: SplashScreen
    },
    Testing: {
      screen: Testing
    },
    Messages: {
      screen: Messages
    }
  },
  {
    headerMode: "none",
    mode: "modal",
    initialRouteName: "SplashScreen"
  }
);

const MainStack = createAppContainer(Stack);

export default class App extends Component {
  render() {
    return <MainStack />;
  }
}
