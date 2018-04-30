import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { subtotal } from "./actions";

const numberWithCommas = x => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

class Subtotal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: ""
    };
  }

  componentWillMount() {
    this.props.dispatchSubtotal(this.props.products);

    if (this.props.products.length) {
      // only after we scan a product we set the currency
      this.setState({ currency: this.props.products[0].currency });
    }
  }

  componentDidUpdate() {
    this.props.dispatchSubtotal(this.props.products);
  }

  render() {
    const { totalPrice } = this.props;

    if (totalPrice > 0) {
      return (
        <Text>
          Subtotal: {this.state.currency}
          {numberWithCommas(totalPrice.toFixed(2))}
        </Text>
      );
    }
    return <Text>Empty Cart</Text>;
  }
}

// const styles = {
// title: {
// flex: 1,
// flexDirection: "row",
// justifyContent: "centered",
// alignSelf: "center",
// textAlign: "center"
// }
// };

const mapStateToProps = state => {
  return { products: state.libraries, totalPrice: state.subtotal };
};

// explicitly dipatching function as opposed to using * as actions (ProductDetails.js)
function mapDispatchToProps(dispatch) {
  return { dispatchSubtotal: response => dispatch(subtotal(response)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subtotal);
