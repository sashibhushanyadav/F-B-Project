import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  shippingAddress: {},
  paymentMethod: "",
};

const productSlicce = createSlice({
  name: "Product",
  initialState,
  reducers: {},
});

export default productSlicce.reducer;
export const {} = productSlicce.actions;
