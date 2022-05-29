import React from "react";
import { hourlyForecast } from "../../../../redux/reducer/forecast-reducer";
import { chancePrecipitation } from "../../../../tools/chancePrecipitation";
import { convertPressure } from "../../../../tools/convertPressure";
import { parseTimestamp } from "../../../../tools/parseTimestamp";
import { wingDirection } from "../../../../tools/wingDirection";
import WeatherIcon from "../../../common/weatherIcon/weatherIcon";
import { IForecastProps } from "../../forecast-container";
import s from "./hourlyItem.module.scss";

const HourlyItem = ({ forecast }: IForecastProps<hourlyForecast>) => {
  return (
    <div className={s.wrapper}>
      {forecast && (
        <div className={s.body}>
          <div className={s.top}>
            <div className={s.info}>
              <WeatherIcon icon={forecast.weather[0].icon} />
              <span className={s.time}>
                {parseTimestamp(forecast?.dt, "time")}
              </span>
              <span className={s.date}>
                {parseTimestamp(forecast?.dt, "date")}
              </span>
            </div>

            <p className={s.description}>{forecast.weather[0].description}</p>
          </div>

          <p className={s.temperature}>
            {Math.round(forecast.temp)}
            <span> &#8451;</span>
          </p>
          <p className={s.feelsLike}>
            Ощущается как {Math.round(forecast.feels_like)}
            <span>&#8451;</span>
          </p>

          <div className={s.bottom}>
            <ul className={s.list}>
              <li>
                <span>Влажность: {forecast.humidity}%</span>
              </li>
              <li>
                <span>
                  Давление: {convertPressure(forecast.pressure)} мм р.т.
                </span>
              </li>
              <li>
                <span>Облачность: {forecast.clouds}%</span>
              </li>
              <li>
                <span>
                  Ветер: {wingDirection(forecast.wind_deg)}{" "}
                  {Math.round(forecast.wind_speed)}
                  м/с
                </span>
              </li>
              <li>
                <span>
                  Вероятность осадков: {chancePrecipitation(forecast.pop)}%
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyItem;
