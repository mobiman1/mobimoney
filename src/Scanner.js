import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { BarCodeScanner, Permissions } from "expo";
import Modal from "./Modal";
import Product from "./Product";
import { productLoad } from "./actions";
import SomeData from "./stateless/SomeData.json";

class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testMode: "product", // 'list' or 'product' for testing app without manually scanning qr codes
      hasCameraPermission: null,
      quantity: "1",
      shopDetails: [
        // later we will get this data from the company JSON using property business_data
        {
          shopName: "NBlume Beach & Casual Fashion for Women",
          shopImage: "https://nblume.com/images/logoNBlume.png",
          currency: this.getCurrencySymbol("USD")
        }
      ]
    };

    this.productDispatch = this.productDispatch.bind(this);
    this.clearData = this.clearData.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const testData = this.state.testMode;

    if (testData === "list") {
      SomeData.forEach(data => {
        this.setState({
          productData: Object.assign({}, data, ...this.state.shopDetails)
        });
        this.productDispatch();
      });
    } else if (testData === "product") {
      this.setState({
        productData: Object.assign({}, SomeData[0], ...this.state.shopDetails)
      });
    } else {
      this.setState({ productData: "" });
    }
  }

  getCurrencySymbol(currency) {
    // we'll add more currencies later

    switch (currency) {
      case "USD":
        return <Text>&#36;</Text>;
      case "BHT":
        return <Text>&#3647;</Text>;
      case "EUR":
        return <Text>&#8364;</Text>;
      default:
        return <Text>&#36;</Text>;
    }
  }

  extractHostname(url) {
    let hostname;

    if (url.indexOf("://") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    hostname = hostname.split(":")[0]; // find & remove port number
    hostname = hostname.split("?")[0]; // find & remove "?"

    return hostname;
  }

  handleBarCodeRead = ({ type, data }) => {
    const hostname = this.extractHostname(data);

    // must write type specific to iOS
    // if (type === "QR_CODE" && hostname === "mobimoney.com") {
    fetch(data)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          productData: Object.assign(
            {},
            responseData[0],
            ...this.state.shopDetails
          )
        });
      })
      .catch(error => {
        console.log(error);
      });
    // } else {
    // console.log("invalid url");
    // }
  };

  productDispatch = () => {
    this.props.dispatchProductLoad({
      product_id: this.state.productData.product_id,
      quantity: this.state.quantity,
      title: this.state.productData.title,
      shopName: this.state.productData.shopName,
      shopImage: this.state.productData.shopImage,
      currency: this.state.productData.currency,
      price_original: this.state.productData.price_original,
      price_final: this.state.productData.price_final,
      legend_1: this.state.productData.legend_1,
      legend_2: this.state.productData.legend_2,
      image_large: this.state.productData.image_large,
      image_small: this.state.productData.image_small
    });

    setTimeout(() => {
      this.setState({ productData: "" });
    }, 1000);
  };

  clearData() {
    this.setState({ productData: "" });
  }

  changeQuantity(quantity) {
    this.setState({ quantity });
  }

  renderModal = product => {
    if (product) {
      return (
        <Modal
          favorites // add the favorites icon
          buttonOn={"ADD TO CART"}
          buttonOff={"ADDED!"}
          parentMethod1={this.clearData}
          parentMethod2={this.productDispatch}
        >
          <Product item={product} parentMethod={this.changeQuantity} />
        </Modal>
      );
    }
    return null;
  };

  render() {
    const { hasCameraPermission, productData } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeRead={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />

        {this.renderModal(productData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

function mapDispatchToProps(dispatch) {
  return { dispatchProductLoad: response => dispatch(productLoad(response)) };
}

export default connect(null, mapDispatchToProps)(Scanner);
