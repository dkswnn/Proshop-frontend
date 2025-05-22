export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * item.qty),
    0
  );

  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // Calculate tax price (15% tax)
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));

  // Calculate total price
  state.totalPrice = (
    state.itemsPrice +
    state.shippingPrice +
    state.taxPrice
  ).toFixed(2);

  return state;
};
