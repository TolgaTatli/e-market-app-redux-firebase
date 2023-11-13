import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counterSlice";
import walletSlice from "../features/walletSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    wallet: walletSlice,
  },
});
