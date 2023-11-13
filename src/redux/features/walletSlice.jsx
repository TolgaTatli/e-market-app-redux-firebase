import { createSlice } from "@reduxjs/toolkit";

const totalBalance = 30000;
const formattedBalance = totalBalance.toLocaleString("tr-TR", {
  style: "currency",
  currency: "TRY",
});

const initialState = {
  formattedBalance,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // Buraya ürün sepete eklendiğinde sepetin fiyatından düşülecek!
  },
});

export const {} = walletSlice.actions;
export default walletSlice.reducer;
