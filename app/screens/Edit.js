import React, { Component } from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import { f, database, auth, storage } from "../../config/config";
import {
  Input,
  Item,
  Icon,
  Button,
  Label,
  Textarea,
  Spinner
} from "native-base";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class Edit extends Component {
  state = {
    user: {},
    ImageSelected: false,
    ImageUri: "",
    uploading: false
  };

  checkPermissions = () => {
    const { status } = Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      Camera: status
    });
    const { statusRoll } = Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      CameraRoll: statusRoll
    });
  };

  fetchImage = async () => {
    this.checkPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.setState({
        ImageSelected: true,
        ImageUri: result.uri
      });

      this.uploadImage(this.state.ImageUri);
    } else {
      console.log("cancelled");
      this.setState({
        ImageSelected: false
      });
    }
  };

  uploadImage = async uri => {
    const userId = f.auth().currentUser.uid;
    const type = uri.split(".").pop();

    this.setState({
      uploading: true
    });

    const response = await fetch(uri);
    const Blob = await response.blob();

    let FilePath = f.auth().currentUser.uid + "." + type;

    let uploadRef = storage
      .ref(`/users/${userId}/profileImages`)
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
        uploadRef.snapshot.ref.getDownloadURL().then(download => {
          console.log(download);
          this.setState({
            uploading: false,
            user: { ...this.state.user, avatar: download }
          });
        });
      }
    );
  };

  componentDidMount() {
    this.checkPermissions();
    database
      .ref("users")
      .child(f.auth().currentUser.uid)
      .once("value")
      .then(res => {
        this.setState({ user: res.val() });
      });
  }

  submitUserInfo = () => {
    if (
      this.state.user.avatar != "" &&
      this.state.user.name != "" &&
      this.state.user.username != "" &&
      this.state.user.description &&
      this.state.user.description != ""
    ) {
      database
        .ref("users")
        .child(f.auth().currentUser.uid)
        .update(this.state.user)
        .then(() => {
          this.props.navigation.replace("Home");
        });
    } else {
      alert("please fill all fields");
    }
  };

  render() {
    return (
      <SafeAreaView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: 50
          }}
        >
          <View style={{ width: "90%", height: 50 }}>
            <Icon
              onPress={() => this.props.navigation.goBack()}
              name="ios-arrow-back"
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.uploading ? (
            <Spinner color="blue" />
          ) : (
            <Avatar
              showEditButton
              size="xlarge"
              rounded
              source={{ uri: this.state.user.avatar }}
              onPress={() => this.fetchImage()}
            />
          )}
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center"
          }}
        >
          <View style={{ width: "80%", marginTop: 50 }}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={val =>
                  this.setState({ user: { ...this.state.user, username: val } })
                }
                value={this.state.user.username}
                placeholder="Name...!"
              />
            </Item>
          </View>
          <View style={{ width: "80%", marginTop: 50 }}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                onChangeText={val =>
                  this.setState({ user: { ...this.state.user, name: val } })
                }
                value={this.state.user.name}
                placeholder="Name...!"
              />
            </Item>
          </View>
          <View style={{ width: "80%", marginTop: 50 }}>
            <Textarea
              maxLength={150}
              onChangeText={val =>
                this.setState({
                  user: { ...this.state.user, description: val }
                })
              }
              value={this.state.user.description}
              rowSpan={5}
              bordered
              placeholder="Description..."
            />
          </View>
          <View
            style={{
              marginTop: 50,
              width: "80%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              disabled={this.state.uploading == true ? true : false}
              onPress={() => this.submitUserInfo()}
              style={{
                width: "30%",
                justifyContent: "center",
                alignItems: "center"
              }}
              rounded
              primary
            >
              <Text style={{ color: "white" }}>Save</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
