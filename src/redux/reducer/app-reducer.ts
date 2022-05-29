import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type notification = {
  type: "error" | "warning" | "info" | "success";
  message: string;
};

export interface IAppState {
  isRequesting: boolean;
  notification: notification | null;
}

const initialState: IAppState = {
  isRequesting: false,
  notification: null,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    requestingToggle: (state, action: PayloadAction<boolean>) => {
      state.isRequesting = action.payload;
    },
    setNewNotification: (state, action: PayloadAction<notification>) => {
      state.notification = action.payload;
    },
  },
});

export const { requestingToggle, setNewNotification } = appReducer.actions;

export const selectApp = (state: RootState) => state.app;

export default appReducer.reducer;
