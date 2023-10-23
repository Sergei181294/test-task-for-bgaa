import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../api"

const SLICE_NAME = "info";

export const getDataFromBack = createAsyncThunk(SLICE_NAME, getData)


export interface DataStore {
       data: any;
       teachers: any;  
}

const initialState: DataStore = {
       data: [] ,
       teachers: [],
}
export const { reducer, actions } = createSlice({
       name: SLICE_NAME,
       initialState,
       reducers: {},
       extraReducers: (builder) => {
              builder.addCase(getDataFromBack.pending, (state, action) => {
                     
              });
              builder.addCase(getDataFromBack.rejected, (state, action) => {
                    
              });
              builder.addCase(getDataFromBack.fulfilled, (state, action) => { 
                     state.data = action.payload.data;
                     state.teachers = action.payload.teachers;
              })
       }
})


export const actionsData = { getDataFromBack }