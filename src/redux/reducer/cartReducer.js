const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CART':
      return {
        cart: action.payload,
      };
    // case 'ADD_TO_CART':
    //   return {
    //     cart: action.payload,
    //   };
    default:
      return state;
  }
};

export { cartReducer };
