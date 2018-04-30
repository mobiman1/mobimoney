export default (state = 0, action) => {
  switch (action.type) {
    case "subtotal":
      const productArray = action.payload;
      let subtotal = 0;

      subtotal = productArray.reduce((previous, item) => {
        return (previous += item.price_final * Number(item.quantity));
      }, 0);

      return subtotal;
    default:
      return state;
  }
};
