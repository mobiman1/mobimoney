import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children, touchable }) => {
  const { buttonStyle, textStyle } = styles;

  if (touchable) {
    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    // letterSpacing: 2, // no letterspacing on android
    paddingTop: 20,
    paddingBottom: 23
  },
  buttonStyle: {
    flex: 1,
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0
  }
};

export default Button;
