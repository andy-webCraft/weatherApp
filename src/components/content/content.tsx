import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/hooks";
import {
  getForecastAsync,
  selectForecast,
} from "../../redux/reducer/forecast-reducer";
import ForecastContainer from "../forecast/forecast-container";
import SearchContainer from "../search/search-container";
import s from "./content.module.scss";
import weatherBg from "../../tools/weatherBg";
import { getUserLocationAsync } from "../../redux/reducer/location-reducer";
import Notification from "../common/notification/notification";
import { setNewNotification } from "../../redux/reducer/app-reducer";
import cn from "classnames";

const Content = () => {
  const dispatch = useTypedDispatch();
  let { current } = useTypedSelector(selectForecast);

  let [background, setBackground] = useState<string>("default-bg");

  useEffect(() => {
    const getUserForecast = async () => {
      try {
        const locationData = await dispatch(getUserLocationAsync()).unwrap();
        dispatch(
          getForecastAsync({
            geo_lat: locationData.data.geo_lat,
            geo_lon: locationData.data.geo_lon,
          })
        ).unwrap();
      } catch (error) {
        dispatch(
          setNewNotification({
            type: "info",
            message:
              "Чтобы автоматически получать прогноз погоды в вашем регионе, разрешите получение геоданных",
          })
        );
      }
    };

    getUserForecast();
  }, []);

  useEffect(() => {
    current && setBackground(weatherBg(current?.weather[0].main, current?.dt));
  }, [current]);

  return (
    <div className={cn(s.wrapper, { loadForecast: current }, background)}>
      <Notification />

      <div className={s.search}>
        <SearchContainer />
      </div>

      {current && (
        <div className={s.forecast}>
          <ForecastContainer />
        </div>
      )}
    </div>
  );
};

export default Content;
