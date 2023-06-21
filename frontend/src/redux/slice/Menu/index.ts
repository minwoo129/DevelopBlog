import { createSlice } from "@reduxjs/toolkit";
import { MenuInitialState as initialState } from "../../state";
import { setMenuOpenAction, setMenuVisibleAction } from "./types";

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuVisible: (state, action: setMenuVisibleAction) => {
      state.isMenuVisible = action.payload;
    },
    setMenuOpen: (state, action: setMenuOpenAction) => {
      state.isMenuOpen = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { setMenuOpen, setMenuVisible } = menuSlice.actions;
