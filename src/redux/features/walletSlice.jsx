import { createSlice } from "@reduxjs/toolkit";

const totalBalanceNum = 30000;
const formattedBalance = totalBalanceNum.toLocaleString("tr-TR", {
  style: "currency",
  currency: "TRY",
});

const initialState = {
  formattedBalance,
  totalBalanceNum,
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
