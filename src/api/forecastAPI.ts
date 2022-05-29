import axios from "axios";
import { IForecast } from "../redux/reducer/forecast-reducer";

export const APIkey = "3bf0092413e9709387888bf12cbfa45e";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const forecastAPI = {
  getForecast(geo_lat: number, geo_lon: number) {
    return instance.get<IForecast>(
    `onecall?lat=${geo_lat}&lon=${geo_lon}&exclude=minutely,alerts&units=metric&&lang=ru&appid=${APIkey}`
    );
  },
};
