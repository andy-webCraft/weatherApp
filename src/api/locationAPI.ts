import axios from "axios";
import { APIkey } from "./forecastAPI";

export type geocoding = {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

const instance = axios.create({
  baseURL: "http://api.openweathermap.org/geo/1.0/",
});

export const locationAPI = {
  getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (location: GeolocationPosition) => resolve(location),
        (error: GeolocationPositionError) => {reject(error)}
      );
    });
  },
  directGeocoding(city: string, limit = 1) {
    return instance.get<Array<geocoding>>(
      `direct?q=${city}&limit=${limit}&appid=${APIkey}`
    );
  },
  reverseGeocoding(geo_lat: number, geo_lon: number, limit = 1) {
    return instance.get<Array<geocoding>>(
      `reverse?lat=${geo_lat}&lon=${geo_lon}&limit=${limit}&appid=${APIkey}`
    );
  },
};
