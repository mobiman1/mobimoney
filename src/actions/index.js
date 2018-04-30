export const productLoad = productData => {
  return {
    type: "product_load",
    payload: productData
  };
};

export const changeQuantity = productData => {
  return {
    type: "change_quantity",
    payload: productData
  };
};

export const productDelete = libraryId => {
  return {
    type: "product_delete",
    payload: libraryId
  };
};

export const selectLibrary = libraryId => {
  return {
    type: "select_library",
    payload: libraryId
  };
};

export const subtotal = productArray => {
  return {
    type: "subtotal",
    payload: productArray
  };
};
