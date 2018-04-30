import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  LayoutAnimation,
  Picker
} from "react-native";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";
import * as actions from "../actions";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderQuantity(quantityOld) {
    if (this.props.expanded) {
      return (
        <View style={styles.pickerContentStyle}>
          <Text style={styles.pickerSides} />
          <Picker
            style={styles.pickerStyle}
            selectedValue={quantityOld.toString()}
            onValueChange={quantityNew => {
              this.props.changeQuantity([
                this.props.productList.item.product_id,
                quantityNew
              ]);
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

  renderProduct() {
    const {
      product_id,
      title,
      currency,
      price_original,
      price_final,
      legend_1,
      legend_2,
      image_small
    } = this.props.productList.item;
    const {
      topView,
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      subtextStyle1,
      subtextStyle2,
      crossStyle,
      priceStyle,
      numberStyle,
      bottomStyle
    } = styles;

    const swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => {
          this.props.productDelete(product_id);
        }
      }
    ];

    return (
      <Swipeout right={swipeoutBtns}>
        <View style={topView}>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={{ uri: image_small }} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={subtextStyle1}>{legend_1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={subtextStyle2}>{legend_2}</Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() => this.props.selectLibrary(product_id)}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={bottomStyle}>
                  {price_original !== 0 && (
                    <Text style={crossStyle}>
                      {currency}
                      {price_original.toFixed(2)}
                    </Text>
                  )}
                  <Text style={priceStyle}>
                    {currency}
                    {price_final.toFixed(2)}
                  </Text>
                  <Text>&nbsp;&nbsp;&nbsp;</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={numberStyle}>({this.props.quantity})</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.renderQuantity(this.props.quantity)}
      </Swipeout>
    );
  }

  render() {
    return this.renderProduct();
  }
}

const styles = {
  topView: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderBottomWidth: 5,
    borderBottomColor: "#0086f4",
    zIndex: 1
  },
  headerContentStyle: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap"
  },
  headerTextStyle: {
    color: "#252525",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 17
  },
  subtextStyle1: {
    color: "#252525",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 17
  },
  subtextStyle2: {
    textAlign: "right",
    marginRight: 15,
    marginBottom: 17,
    color: "#252525",
    fontSize: 13,
    fontWeight: "bold"
  },
  bottomStyle: {
    flexDirection: "row",
    flex: 1
  },
  crossStyle: {
    textDecorationLine: "line-through",
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10
  },
  priceStyle: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold"
  },
  numberStyle: {
    textAlign: "right",
    marginRight: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0086f4",
    position: "relative",
    bottom: 1,
    right: 10
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 5
  },
  thumbnailStyle: {
    height: 120,
    width: 85
  },
  pickerContentStyle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0086f4"
  },
  pickerStyle: {
    width: 100,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#ffffff"
  },
  pickerSides: {
    backgroundColor: "#0086f4",
    flex: 1,
    height: "100%"
  }
};

const mapStateToProps = (state, ownProps) => {
  const quantity = ownProps.productList.item.quantity;
  const expanded =
    state.selectedLibraryId === ownProps.productList.item.product_id;

  return { quantity, expanded };
};

export default connect(mapStateToProps, actions)(ProductDetails);
