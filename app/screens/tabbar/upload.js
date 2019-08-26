import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TextInput
} from "react-native";
import styles from "../../../constants/styles";
import { f, database, auth, storage } from "../../../config/config";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-elements";

export default class Upload extends Component {
  state = {
    isLogin: false,
    isLoading: true,
    Camera: null,
    CameraRoll: null,
    ImageId: null,
    ImageSelected: false,
    ImageUri: "",
    Caption: ""
  };

  checkPermissions() {
    const { status } = Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      Camera: status
    });
    const { statusRoll } = Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      CameraRoll: statusRoll
    });
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  };

  fetchImage = async () => {
    this.checkPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3]
    });

    this.setState({
      isLoading: true
    });

    if (!result.cancelled) {
      this.setState({
        ImageSelected: true,
        ImageUri: result.uri,
        isLoading: false
      });
    } else {
      console.log("cancelled");
      this.setState({
        isLoading: false,
        ImageSelected: false
      });
    }
  };

  uploadImage = async uri => {
    const userId = f.auth().currentUser.uid;
    const imageId = this.state.ImageId;
    const type = uri.split(".").pop();

    const response = await fetch(uri);
    const Blob = await response.blob();

    console.log(Blob);
    let FilePath = imageId + "." + type;

    let ref = storage.ref(`/users/${userId}/images`).child(FilePath);

    ref.put(Blob).on(
      "state_changed",
      snapshot => {
        this.setState({
          isLoading: false
        });
        console.log("done");
      },
      e => console.log(e)
    );
  };

  componentDidMount() {
    // auth.signOut();

    f.auth().onAuthStateChanged(user => {
      if (user) {
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

    this.setState({
      ImageId: this.uniqueId()
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.SafeArea}>
        {this.state.isLoading === false ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%"
            }}
          >
            {this.state.isLogin == true ? (
              this.state.ImageSelected ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={{ uri: this.state.ImageUri }}
                      style={{ width: "100%", height: 300 }}
                    />
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      editable={true}
                      placeholder={"Enter caption...!"}
                      style={{
                        width: "100%",
                        borderColor: "grey",
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderRadius: 3,
                        paddingLeft: 10,
                        marginTop: 20
                      }}
                      maxLength={150}
                    />
                    <View
                      style={{
                        width: "80%",
                        flexDirection: "row",
                        marginTop: 20
                      }}
                    >
                      <View
                        style={{
                          width: "50%",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Button
                          buttonStyle={{
                            backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          title="Cancel"
                        />
                      </View>
                      <View
                        style={{
                          width: "50%",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Button
                          buttonStyle={{
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          title="Upload"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    width: "100%"
                  }}
                >
                  <Text style={{ fontSize: 25, marginBottom: 10 }}>Upload</Text>
                  <Button
                    title="Select Photo"
                    onPress={() => this.fetchImage()}
                  />
                </View>
              )
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
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
                <Text> Please log in to upload photos </Text>
              </View>
            )}
          </View>
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
