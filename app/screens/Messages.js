import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { f, database, auth, storage } from "../../config/config";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Text,
  SafeAreaView
} from "react-native";
import { Icon } from "native-base";
import styles from "../../constants/styles";

export default class Messages extends React.Component {
  state = {
    messages: [],
    user: {}
  };

  componentWillMount() {
    database
      .ref("users")
      .child(auth.currentUser.uid)
      .once("value")
      .then(res => {
        this.setState({
          user: {
            _id: auth.currentUser.uid,
            name: res.val().username,
            avatar: res.val().avatar
          }
        });
      });

    database.ref("chats").on("child_added", childSnapshot => {
      if (
        (childSnapshot.val().senderId === auth.currentUser.uid &&
          childSnapshot.val().recieverId ===
            this.props.navigation.getParam("user").userId) ||
        (childSnapshot.val().senderId ===
          this.props.navigation.getParam("user").userId &&
          childSnapshot.val().recieverId === auth.currentUser.uid)
      ) {
        this.setState({
          messages: GiftedChat.append(this.state.messages, {
            _id: childSnapshot.key,
            text: childSnapshot.val().message.text,
            createdAt: new Date(),
            user: childSnapshot.val().user
          })
        });
      }
    });

    // database.ref("chats").once("value", snapshot => {
    //   snapshot.forEach(childSnapshot => {
    //     if (
    //       (childSnapshot.val().senderId === auth.currentUser.uid &&
    //         childSnapshot.val().recieverId ===
    //           this.props.navigation.getParam("user").userId) ||
    //       (childSnapshot.val().senderId ===
    //         this.props.navigation.getParam("user").userId &&
    //         childSnapshot.val().recieverId === auth.currentUser.uid)
    //     ) {
    //       this.setState({
    //         messages: GiftedChat.append(this.state.messages, {
    //           _id: childSnapshot.key,
    //           text: childSnapshot.val().message.text,
    //           createdAt: new Date(),
    //           user: childSnapshot.val().user
    //         })
    //       });
    //     }
    //   });
    // });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: "Hello developer",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "React Native",
    //         avatar: "https://placeimg.com/140/140/any"
    //       }
    //     }
    //   ]
    // });
  }

  onSend(messages) {
    const OriginalMessage = Object.assign({}, messages[0]);
    const message = {
      id: OriginalMessage._id,
      text: OriginalMessage.text
    };
    database.ref("chats").push({
      message,
      senderId: auth.currentUser.uid,
      recieverId: this.props.navigation.getParam("user").userId,
      user: OriginalMessage.user
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled={true}
          style={{ width: "100%", flex: 1 }}
        >
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
              </View>
            </View>
          </View>
          <GiftedChat
            messages={this.state.messages}
            showUserAvatar={true}
            onSend={messages => this.onSend(messages)}
            user={this.state.user}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
