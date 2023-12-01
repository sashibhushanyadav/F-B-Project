import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const productSlicce = createSlice({
  name: "Order",
  initialState,
  reducers: {
    createOrder: (state, data) => {
      state.order = data.payload;
    },
  },
});

export default productSlicce.reducer;
export const { createOrder } = productSlicce.actions;
