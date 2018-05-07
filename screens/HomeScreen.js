import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Modal from "../src/Modal";
import Invoice from "../src/stateless/Invoice";
import ProductList from "../src/stateless/ProductList";
import Button from "../src/stateless/Button";
import Subtotal from "../src/Subtotal";
import checkIfFirstLaunch from "../src/stateless/Initial";
import { productDelete } from "../src/actions";

class HomeScreen extends Component {
  static navigationOptions = {
    title: <Subtotal />
  };

  constructor(props) {
    super(props); // according to dan abromov we should *always* pass props to the constructor

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
      invoiceData: "",
      accountBalance: 2520 // this will be dynamically derived from user's account later

      // dispatched: false
    };

    this.productDispatch = this.productDispatch.bind(this);
    this.clearData = this.clearData.bind(this);
    this.couponCode = this.couponCode.bind(this);
  }

  async componentWillMount() {
    // const isFirstLaunch = await checkIfFirstLaunch();
    const isFirstLaunch = true; // shows on each startup

    this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });
  }

  componentWillReceiveProps() {
    if (JSON.stringify(this.props.products) !== []) {
      this.setState({ isFirstLaunch: false });
    }
  }

  getInvoiceData() {
    this.setState({ invoiceData: this.props.products });
  }

  productDispatch = () => {
    this.setState({
      accountBalance: this.state.accountBalance - this.props.subtotal

      // dispatched: true
    });
  };

  clearData() {
    // console.log(this.child.state.registered);

    if (this.child.state.registered) {
      // if the user has clicked 'pay now' delete the products
      this.props.products.forEach(item => {
        this.props.dispatchProductDelete(item.product_id);
      });
    }

    this.setState({ invoiceData: "" });
  }

  couponCode() {
    // give user means to add coupon code
  }

  bottomContent(isFirstLaunch) {
    if (isFirstLaunch || !this.props.subtotal || this.state.invoiceData) {
      return (
        <View>
          {isFirstLaunch ? (
            <View style={styles.tooltip}>
              <View style={styles.tooltipBox}>
                <Text style={styles.tooltipText}>SCAN YOUR FIRST ITEM</Text>
              </View>
              <View style={styles.triangle} />
            </View>
          ) : null}

          <View style={styles.checkoutOffStyle}>
            <View style={styles.checkoutOffColor}>
              <Button touchable={false}>CHECKOUT</Button>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.checkoutOnStyle}>
        <View style={styles.checkoutOnColor}>
          <Button touchable onPress={() => this.getInvoiceData()}>
            CHECKOUT
          </Button>
        </View>
      </View>
    );
  }

  renderModal = cart => {
    const subtotal = this.props.subtotal;
    const VAT = subtotal * 0.0841;
    const total = subtotal + VAT;
    const accountBalance = this.state.accountBalance;

    const amounts = {
      subtotal,
      VAT,
      total,
      accountBalance
    };

    if (cart) {
      return (
        <Modal
          ref={ref => (this.child = ref)}
          favorites={false} // don't add the favorites icon
          buttonOn={"PAY NOW"}
          buttonOff={"SUCCESS!"}
          parentMethod1={this.clearData}
          parentMethod2={this.productDispatch}
        >
          <Invoice
            products={this.props.products}
            amounts={amounts}
            parentMethod={this.couponCode}
          />
        </Modal>
      );
    }

    return null;
  };

  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch, invoiceData } = this.state;

    if (!hasCheckedAsyncStorage) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ProductList products={this.props.products} />
        {this.bottomContent(isFirstLaunch)}
        {this.renderModal(invoiceData)}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  tooltip: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: -10,
    zIndex: 999
  },
  tooltipBox: {
    backgroundColor: "#0086f4",
    borderRadius: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    zIndex: 998
  },
  tooltipText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  },
  triangle: {
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 35,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#0086f4",
    position: "relative",
    top: -15,
    transform: [{ rotate: "180deg" }],
    zIndex: 1997
  },
  checkoutOffStyle: {
    marginBottom: 2,
    flexDirection: "row",
    position: "absolute",
    bottom: -5
  },
  checkoutOffColor: {
    flex: 1,
    backgroundColor: "#999999"
  },
  checkoutOnStyle: {
    marginBottom: 2,
    flexDirection: "row",
    position: "absolute",
    bottom: -5
  },
  checkoutOnColor: {
    flex: 1,
    backgroundColor: "#0086f4"
  }
};

const mapStateToProps = state => {
  return { products: state.libraries, subtotal: state.subtotal };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchProductDelete: response => dispatch(productDelete(response))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
