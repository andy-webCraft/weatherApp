import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { locationAPI } from "../../api/locationAPI";
import { RootState } from "../store";

export interface ILocation {
  data: {
    country: string;
    city: string;
    geo_lat: number;
    geo_lon: number;
  };
  value: string;
}

export interface ILocationState {
  current: ILocation | null;
  lastSearch: Array<ILocation>;
}

const initialState: ILocationState = {
  current: null,
  lastSearch: [],
};

const locationReducer = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<ILocation>) => {
      state.current = action.payload;
    },
    getLastSearching: (state) => {
      const lastSearching = localStorage.getItem("lastSearching");

      if (lastSearching) {
        state.lastSearch = JSON.parse(lastSearching);
      }
    },
    addLastSearching: (state, action: PayloadAction<ILocation>) => {
      const include: boolean = state.lastSearch.some(
        (item) => item.value === action.payload.value
      );

      if (!include) {
        state.lastSearch.unshift(action.payload);
        if (state.lastSearch.length > 5) {
          state.lastSearch.length = 5;
        }
        localStorage.setItem("lastSearching", JSON.stringify(state.lastSearch));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserLocationAsync.fulfilled,
      (state, action: PayloadAction<ILocation>) => {
        state.current = action.payload;
      }
    );
  },
});

export const getUserLocationAsync = createAsyncThunk<ILocation>(
  "location/getUserLocation",
  async () => {
    const position = await locationAPI.getUserLocation();
    const response = await locationAPI.reverseGeocoding(
      position.coords.latitude,
      position.coords.longitude
    );

    const locationData: ILocation = {
      data: {
        country: response.data[0].country,
        city: response.data[0].local_names[
          response.data[0].country.toLowerCase()
        ],
        geo_lat: response.data[0].lat,
        geo_lon: response.data[0].lon,
      },
      value: response.data[0].name,
    };

    return locationData;
  }
);

export const getGeoDataByCityAsync = createAsyncThunk<ILocation, string>(
  "location/getGeoDataByCity",
  async (city) => {
    const response = await locationAPI.directGeocoding(city);

    const locationData: ILocation = {
      data: {
        country: response.data[0].country,
        city: response.data[0].local_names[
          response.data[0].country.toLowerCase()
        ],
        geo_lat: response.data[0].lat,
        geo_lon: response.data[0].lon,
      },
      value: response.data[0].name,
    };

    return locationData;
  }
);

export const { setLocation, getLastSearching, addLastSearching } =
  locationReducer.actions;

export const selectLocation = (state: RootState) => state.location;

export default locationReducer.reducer;
