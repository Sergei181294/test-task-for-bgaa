import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as dataReducer } from "./slice"

const reducer = combineReducers({
       reducer: dataReducer
});

export const store = configureStore({
       reducer: reducer
})

export type RootStore = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch