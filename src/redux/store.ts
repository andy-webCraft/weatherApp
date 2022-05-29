import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./reducer/app-reducer";
import locationReducer from "./reducer/location-reducer";
import forecastReducer from "./reducer/forecast-reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    forecast: forecastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
