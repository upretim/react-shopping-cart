import * as actionTypes from './actionTypes';

const initialState = {
  products: [],
  filteredProducts: [],
  cartItems: [],
  totalProducts: 0,
  showModal: false,
  filterByText: '',
  filterSizeText: '',
  discountCode: '',
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'ADD':
      newState.counter = newState.counter + 1;
      newState.loading = false;
      break;
    case 'SUBSTRACT':
      newState.counter = newState.counter - 1;
      newState.loading = false;
      break;
    case 'LOADING':
      newState.loading = true;
      break;
    case actionTypes.GET_PRODUCT_DATA_SUCCESS:
      newState.products = action.payload;
      break;
      case actionTypes.GET_PRODUCT_DATA_SUCCESS:
        console.log('Filtered items')
      //  newState.products = action.payload;
        break;
    default:
      break;
  }
  return newState;
};
export default reducer;
