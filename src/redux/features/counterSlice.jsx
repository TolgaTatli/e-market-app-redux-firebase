import { createSlice } from "@reduxjs/toolkit";

import {
  getInitialStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../../localstorage";

const initialState = { ...getInitialStateFromLocalStorage(), totalValue: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId } = action.payload;
      if (state[productId]) {
        state[productId].value += 1;
      } else {
        state[productId] = { value: 1 };
      }
      state.totalValue += 1;

      saveStateToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      if (state[productId] && state[productId].value > 1) {
        state[productId].value -= 1;
        state.totalValue -= 1;
      } else {
        delete state[productId];
        state.totalValue -= 1;
      }
      saveStateToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart } = counterSlice.actions;
export default counterSlice.reducer;
