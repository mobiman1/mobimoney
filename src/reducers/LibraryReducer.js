const data = [];

export default (state = data, action) => {
  let index = 0;

  switch (action.type) {
    case 'product_load':
      index = state.findIndex(x => x.product_id === action.payload.product_id);

      if (index !== -1) {
        const quantity = Number(state[index].quantity);
        const newQuantity = quantity + Number(action.payload.quantity);
        const newObject = action.payload;
        newObject.quantity = newQuantity;

        return [...state.filter(item => action.payload.product_id !== item.product_id), newObject];
      }
      return [...state, action.payload].reverse();

    case 'change_quantity':
      index = state.findIndex(x => x.product_id === action.payload[0]);

      const newArray = state.map(
        x =>
          x.product_id === action.payload[0]
            ? Object.assign({}, x, { quantity: action.payload[1] })
            : x
      );
      return newArray;

    case 'product_delete':
      return [...state.filter(item => action.payload !== item.product_id)];
    default:
      return state;
  }
};
