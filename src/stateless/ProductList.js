import React, { Component } from "react";
import { FlatList } from "react-native";
import ProductDetails from "./ProductDetails";

class ProductList extends Component {
  renderItem(productList) {
    return <ProductDetails productList={productList} />;
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 135 }}
        data={this.props.products}
        renderItem={this.renderItem}
        keyExtractor={product => product.product_id}
      />
    );
  }
}

export default ProductList;
