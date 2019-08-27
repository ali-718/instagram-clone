import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView
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
    Caption: "",
    uploading: false,
    progress: 0
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

    if (!result.cancelled) {
      this.setState({
        ImageSelected: true,
        ImageUri: result.uri
      });
    } else {
      console.log("cancelled");
      this.setState({
        ImageSelected: false
      });
    }
  };

  uploadImage = async uri => {
    const userId = f.auth().currentUser.uid;
    const imageId = this.state.ImageId;
    const type = uri.split(".").pop();

    this.setState({
      uploading: true
    });

    const response = await fetch(uri);
    const Blob = await response.blob();

    console.log(Blob);
    let FilePath = imageId + "." + type;

    let uploadRef = storage
      .ref(`/users/${userId}/images`)
      .child(FilePath)
      .put(Blob);

    uploadRef.on(
      "state_changed",
      snapshot => {
        let progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);

        this.setState({ progress });
      },
      () => console.log(e),
      final => {
        this.setState({
          progress: 100,
          uploading: false,
          ImageSelected: false,
          Caption: "",
          ImageId: null
        });
        uploadRef.snapshot.ref.getDownloadURL().then(download => {
          alert(download);
        });
      }
    );
  };

  publishPost = () => {
    let caption = this.state.Caption.trim();
    if (caption.length > 0) {
      this.uploadImage(this.state.ImageUri);
    } else {
      alert("Caption is required");
    }
  };

  cancelButton = () => {
    this.setState({
      ImageId: null,
      ImageSelected: false,
      ImageUri: "",
      Caption: ""
    });
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
          <KeyboardAvoidingView
            enabled={true}
            behavior="padding"
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
                      onChangeText={val => this.setState({ Caption: val })}
                    />
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                      }}
                    >
                      {this.state.uploading ? (
                        <View>
                          <Text>{this.state.progress}%</Text>
                          {this.state.progress !== 100 ? (
                            <ActivityIndicator />
                          ) : null}
                        </View>
                      ) : null}
                    </View>
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
                          onPress={() => this.cancelButton()}
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
                          title="Publish"
                          onPress={() => this.publishPost()}
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
          </KeyboardAvoidingView>
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
