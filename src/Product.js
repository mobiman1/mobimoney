import React, { Component } from "react";
import {
  Dimensions,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  LayoutAnimation,
  Picker
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: "1",
      expanded: 0
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  changeQuantity({ quantity }) {
    this.props.parentMethod(quantity);
  }

  renderQuantity() {
    if (this.state.expanded) {
      return (
        <View style={styles.pickerContentStyle}>
          <Text style={styles.pickerSides} />
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.quantity}
            onValueChange={quantity => {
              this.setState({ quantity });
              this.changeQuantity({ quantity });
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>
          <Text style={styles.pickerSides} />
        </View>
      );
    }
  }

  renderText() {
    const {
      title,
      currency,
      price_original,
      price_final,
      legend_1,
      legend_2
    } = this.props.item;

    return (
      <View>
        <View style={styles.productRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.legends}>
            <Text style={styles.subtextStyle1}>{legend_1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.subtextStyle2}>{legend_2}</Text>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ expanded: !this.state.expanded });
              }}
            >
              <View style={styles.bottomStyle}>
                {price_original !== 0 && (
                  <Text style={styles.crossStyle}>
                    {currency}
                    {price_original.toFixed(2)}
                  </Text>
                )}
                <Text style={styles.priceStyle}>
                  {currency}
                  {price_final.toFixed(2)}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.numberStyle}>
                    ({this.state.quantity})
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View>{this.renderQuantity()}</View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Image
          style={styles.imageStyle}
          source={{ uri: this.props.item.image_small }}
        />
        {this.renderText()}
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    height: SCREEN_WIDTH - 20,
    width: SCREEN_WIDTH - 20,
    padding: 0,
    margin: 0
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    color: "#252525"
  },
  productRow: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },
  legends: {
    flexDirection: "row",
    marginBottom: 20
  },
  subtextStyle1: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold"
  },
  subtextStyle2: {
    textAlign: "right",
    marginRight: 5,
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold"
  },
  bottomStyle: {
    flexDirection: "row",
    flex: 1
    // marginTop: 10,
    // marginLeft: 10,
    // marginBottom: 10
    // backgroundColor: "#00ff00"
  },
  crossStyle: {
    textDecorationLine: "line-through",
    color: "#252525",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10
  },
  priceStyle: {
    color: "#252525",
    fontSize: 17,
    fontWeight: "bold"
  },
  numberStyle: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0086f4",
    position: "relative",
    bottom: 1,
    right: 10
  },
  pickerContentStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0086f4",
    // marginTop: 10,
    marginBottom: 10
  },
  pickerStyle: {
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff"
  },
  pickerSides: {
    backgroundColor: "#0086f4",
    flex: 1,
    height: "100%"
  },
  addToCartStyle: {
    backgroundColor: "#0086f4",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  removeFromCartStyle: {
    backgroundColor: "#666666",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
};

export default Product;
