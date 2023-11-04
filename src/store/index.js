import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import restaurantSlice from "./slice/restaurantSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    restaurant: restaurantSlice,
  },
});
