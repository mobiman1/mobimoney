import React, { Component } from "react";
import { FlatList, View, Text, TextInput, Image } from "react-native";

const numberWithCommas = x => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.couponCode = this.couponCode.bind(this);
  }

  couponCode({ code }) {
    this.props.parentMethod(code);
  }

  renderItem(productList) {
    const priceSummation =
      productList.item.price_final * productList.item.quantity;

    return (
      <View style={styles.shopRow} key={productList.item.product_id}>
        <View style={styles.textColumn}>
          <Text style={styles.productTitle}>
            {productList.item.title} ({productList.item.quantity})
          </Text>
        </View>
        <View style={styles.pricesColumn}>
          <Text style={styles.productPrice}>
            {productList.item.currency}
            {numberWithCommas(priceSummation.toFixed(2))}
          </Text>
        </View>
      </View>
    );
  }

  renderText() {
    const {
      // get shop data from first object in array
      shopImage,
      shopName,
      currency
    } = this.props.products[0];

    const { subtotal, VAT, total, accountBalance } = this.props.amounts;

    return (
      <View style={styles.invoice}>
        <View style={styles.shopRow}>
          <Image
            style={styles.shopThumbnail}
            borderRadius={30}
            source={{ uri: shopImage }}
          />
          <Text style={styles.shopTitle}>{shopName}</Text>
        </View>
        <View style={styles.dividerTop} />
        <FlatList
          // contentContainerStyle={styles.container}
          data={this.props.products}
          renderItem={this.renderItem}
          keyExtractor={product => product.product_id}
        />
        <View style={styles.shopRow}>
          <View style={styles.textColumn}>
            <Text style={styles.productTitle}>Subtotal</Text>
          </View>
          <View style={styles.pricesColumn}>
            <Text style={styles.productPrice}>
              {currency}
              {numberWithCommas(subtotal.toFixed(2))}
            </Text>
          </View>
        </View>
        <View style={styles.shopRow}>
          <View style={styles.textColumn}>
            <TextInput
              style={styles.textInput}
              placeholder="COUPON CODE"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={text => this.setState({ input: text })}
              underlineColorAndroid={"transparent"}
            />
          </View>
        </View>
        <View style={styles.shopRow}>
          <View style={styles.textColumn}>
            <Text style={styles.productTitle}>Tax</Text>
          </View>
          <View style={styles.pricesColumn}>
            <Text style={styles.productPrice}>
              {currency}
              {numberWithCommas(VAT.toFixed(2))}
            </Text>
          </View>
        </View>
        <View style={styles.shopRow}>
          <View style={styles.textColumn}>
            <Text style={styles.productTitle}>Total</Text>
          </View>
          <View style={styles.pricesColumn}>
            <Text style={styles.productPrice}>
              {currency}
              {numberWithCommas(total.toFixed(2))}
            </Text>
          </View>
        </View>
        <View style={styles.dividerBottom} />
        <View style={styles.shopRow}>
          <Text style={styles.balance}>
            Mobimoney account balance: {currency}
            {numberWithCommas(accountBalance.toFixed(2))}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return this.renderText();
  }
}

const styles = {
  invoice: {
    backgroundColor: "#ffffff"
    // paddingBottom: 67 // height of bottom button
  },
  shopRow: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  shopThumbnail: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  shopTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#252525",
    // textAlign: "center",
    marginRight: 70
  },
  dividerTop: {
    height: 1,
    marginBottom: 15,
    backgroundColor: "#999999"
  },
  dividerBottom: {
    height: 1,
    marginTop: 15,
    backgroundColor: "#999999"
  },
  productTitle: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold"
  },
  textColumn: {
    width: "75%"
  },
  textInput: {
    height: 40,
    width: "75%",
    borderColor: "#999999",
    borderWidth: 2,
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10
  },
  pricesColumn: {
    width: "25%"
  },
  productPrice: {
    textAlign: "right",
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold"
  },
  balance: {
    color: "#252525",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 15,
    marginBottom: 15
  }
};

export default Invoice;
