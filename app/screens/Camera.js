import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Icon } from "native-base";
import styles from "../../constants/styles";

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();

      console.log(photo.uri);

      const response = await fetch(photo.uri);
      const Blob = await response.blob();

      if (Blob) {
        this.props.navigation.navigate("Upload", { Image: photo.uri });
      }
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <SafeAreaView
              style={[
                {
                  flex: 1,
                  backgroundColor: "transparent"
                }
              ]}
            >
              <View
                style={{
                  width: "100%",
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    width: "20%",
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    onPress={() => this.props.navigation.replace("Home")}
                    name="ios-arrow-back"
                    style={{ color: "white" }}
                  />
                </View>
                <View style={{ width: "60%" }}></View>
                <View
                  style={{
                    width: "20%",
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                      });
                    }}
                    name="flip"
                    type="MaterialIcons"
                    style={{ color: "white" }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    onPress={() => this.snap()}
                    name="circle-o-notch"
                    type="FontAwesome"
                    style={{ fontSize: 50, color: "white" }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Camera>
        </View>
      );
    }
  }
}
