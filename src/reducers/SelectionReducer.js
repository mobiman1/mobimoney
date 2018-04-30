export default (state = null, action) => {
  switch (action.type) {
    case 'select_library':
      let payload = action.payload;

      if (state === payload) {
        payload = !payload;
      }

      return payload;
    default:
      return state;
  }
};
