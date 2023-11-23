import { createSlice } from "@reduxjs/toolkit";
import { config } from "../config";

const initialState = {
  cartItem: [],
  shippingAddress: {},
  paymentMethod: "",
};

const productSlicce = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state: any, data: any) => {
      const existProduct = state.cartItem.find(
        (item: any) => item.productId === data.payload.productId
      );
      if (existProduct) {
        state.cartItem = state.cartItem.map((item: any) =>
          item.productId === data.payload.productId ? data.payload : item
        );
      } else {
        state.cartItem = [...state.cartItem, data.payload];
      }
    },
    removeFromCart: (state: any, data: any) => {
      state.cartItem = state.cartItem.filter((cart: any) => {
        return cart.productId !== data.payload;
      });
    },
    setShippingAddress: (state: any, data: any) => {
      state.shippingAddress = data.payload;
    },
    addPaymentMethod: (state: any, data: any) => {
      state.paymentMethod = data.payload;
    },
  },
});

export default productSlicce.reducer;
export const {
  addToCart,
  removeFromCart,
  setShippingAddress,
  addPaymentMethod,
} = productSlicce.actions;
