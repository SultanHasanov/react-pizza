import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cartSlice";
import filter from "../features/filterSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
