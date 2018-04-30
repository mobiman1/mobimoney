import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./stateless/Button";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registered: false
    };

    this.clearData = this.clearData.bind(this);
    this.productDispatch = this.productDispatch.bind(this);
  }

  clearData() {
    this.props.parentMethod1();
  }

  productDispatch() {
    this.setState({ registered: true });
    this.props.parentMethod2();
  }

  topStrip() {
    return (
      <View style={styles.topStrip}>
        {this.props.favorites ? (
          <TouchableOpacity>
            <Ionicons name={"ios-heart-outline"} style={styles.heartStyle} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity>
          <Ionicons
            onPress={() => this.clearData()}
            name={"md-close"}
            style={styles.xStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  button() {
    if (this.state.registered) {
      return (
        <View style={{ backgroundColor: "#666666" }}>
          <Button touchable={false}>{this.props.buttonOff}</Button>
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: "#0086f4" }}>
        <Button touchable onPress={() => this.productDispatch()}>
          {this.props.buttonOn}
        </Button>
      </View>
    );
  }

  render() {
    // this.props.children displays relevant component passed down from the parent

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {this.topStrip()}
          {this.props.children}
          {this.button()}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  topStrip: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 3,
    paddingBottom: 0,
    backgroundColor: "#f8f8f8"
  },
  heartStyle: {
    color: "#ff0000",
    fontSize: 28,
    fontWeight: "bold",
    paddingRight: 30
  },
  xStyle: {
    color: "#252525",
    fontSize: 29,
    fontWeight: "bold",
    paddingRight: 20
  },
  // buttonOnStyle: {
  // backgroundColor: "#0086f4"
  // position: "relative",
  // bottom: 0,
  // left: 0,
  // right: 0
  // },
  // buttonOffStyle: {
  // backgroundColor: "#666666"
  // position: "relative",
  // bottom: 0,
  // left: 0,
  // right: 0
  // },
  scroll: {
    position: "absolute", // position the modal on top of all other elements
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99
  },
  container: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff"
  }
};

export default Modal;
