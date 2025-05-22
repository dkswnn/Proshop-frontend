import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'PayPal'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    setUserCart: (state, action) => {
      state.cartItems = action.payload;
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
    },
    resetCart: (state) => (state = initialState),
    loadUserCart: (state, action) => {
      if (action.payload && action.payload.cart) {
        state.cartItems = action.payload.cart;
      }
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  setUserCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
  loadUserCart
} = cartSlice.actions;

export default cartSlice.reducer;
