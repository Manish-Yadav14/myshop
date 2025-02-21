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
      console.log(action.payload)
      state.totalQuantity += 1;
      const idx = state.items.findIndex((e)=>e.id==action.payload.id);
      if(idx!==-1) state.items.splice(idx,1);
      state.items.push(action.payload);
      console.log("ITEMS: ",JSON.stringify(state.totalQuantity));
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
