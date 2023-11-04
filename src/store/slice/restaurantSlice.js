import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
