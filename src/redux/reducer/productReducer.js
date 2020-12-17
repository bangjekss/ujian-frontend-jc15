const INITIAL_STATE = {
  productList: [],
  productDetails: {},
  isLoading: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        productList: action.payload,
      };
    case 'FETCH_BY_ID':
      return {
        ...state,
        productDetails: action.payload,
      };
    default:
      return state;
  }
};

export { productReducer };
