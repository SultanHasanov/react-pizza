import { configureStore } from "@reduxjs/toolkit";
import filter from "../features/filterSlice";



export const store = configureStore({
  reducer: {
    filter,
  },
});
