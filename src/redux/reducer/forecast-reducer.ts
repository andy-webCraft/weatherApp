import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forecastAPI } from "../../api/forecastAPI";
import { RootState } from "../store";
// import { initialState } from "./forecast-mockup";

export type currentForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
};
export type hourlyForecast = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  pop: number;
};
export type dailyForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
};

export interface IForecast {
  current: currentForecast | null;
  hourly: Array<hourlyForecast> | null;
  daily: Array<dailyForecast> | null;
}

const initialState: IForecast = {
  current: null,
  hourly: null,
  daily: null,
};

const forecastReducer = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setForecast(state, action: PayloadAction<IForecast>) {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getForecastAsync.fulfilled,
      (state, action: PayloadAction<IForecast>) => {
        state.current = action.payload.current;
        state.hourly = action.payload.hourly;
        state.daily = action.payload.daily;
      }
    );
  },
});

export const getForecastAsync = createAsyncThunk<
  IForecast,
  { geo_lat: number; geo_lon: number }
>("forecast/getForecast", async (geoData) => {
  const { geo_lat, geo_lon } = geoData;
  const response = await forecastAPI.getForecast(geo_lat, geo_lon);

  const forecast: IForecast = {
    current: response.data.current,
    hourly: response.data.hourly,
    daily: response.data.daily,
  };

  return forecast;
});

export const selectForecast = (state: RootState) => state.forecast;

export default forecastReducer.reducer;
