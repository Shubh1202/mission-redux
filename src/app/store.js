import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/slices/TodoSlices"

export const store = configureStore({
    reducer: todoReducer
})