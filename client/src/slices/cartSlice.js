import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items = action.payload;
      state.quantity = state.items.length;
      // state.totalPrice += newItem.price;
    },  
    clearCart: (state) => {
        // Reset the cart to its initial state
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      }
  },
});

export const { addItemToCart,removeItemFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
