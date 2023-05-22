import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./feautures/basketSlice";
import restaurantReducer from "./feautures/restaurantSlice"

export const store = configureStore({
    //names are coming from features slice file here for reducers
    reducer: {
        basket: basketReducer,
        restaurant: restaurantReducer,
    },
})