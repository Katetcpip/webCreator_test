import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface BaseState {
    
}

const initialBaseState: BaseState = {
    
};

const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {
        
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
        };
      },
    },
});

export const baseActions = baseSlice.actions;

// export const selectisDarkTheme = (state: RootState) => state.base.isDarkTheme;

export default baseSlice.reducer;
