import React from "react";
import { dailyForecast } from "../../../../redux/reducer/forecast-reducer";
import { chancePrecipitation } from "../../../../tools/chancePrecipitation";
import { convertPressure } from "../../../../tools/convertPressure";
import { getDayOfWeek } from "../../../../tools/getDayOfWeek";
import { parseTimestamp } from "../../../../tools/parseTimestamp";
import { wingDirection } from "../../../../tools/wingDirection";
import WeatherIcon from "../../../common/weatherIcon/weatherIcon";
import { IForecastProps } from "../../forecast-container";
import s from "./dailyItem.module.scss";

const DailyItem = ({ forecast }: IForecastProps<dailyForecast>) => {
  return (
    <div className={s.wrapper}>
      {forecast && (
        <div className={s.body}>

          <div className={s.left}>
            <span className={s.date}>
              {parseTimestamp(forecast.dt, "date")}
            </span>
            <p className={s.weekDay}>{getDayOfWeek(forecast.dt)}</p>
            <WeatherIcon icon={forecast.weather[0].icon} />
            <span className={s.description}>
              {forecast.weather[0].description}
            </span>
          </div>

          <div className={s.divider}></div>

          <div className={s.center}>
            <div className={s.temperature}>
              <p>
                {Math.round(forecast.temp.min)}
                <span>&#8451;</span> ... {Math.round(forecast.temp.max)}
                <span>&#8451;</span>
              </p>
            </div>

            <ul className={s.daily}>
              <li>
                <span>Утром: {Math.round(forecast.temp.morn)}</span>
                <span>&#8451;</span>
              </li>
              <li>
                <span>Днём: {Math.round(forecast.temp.day)}</span>
                <span>&#8451;</span>
              </li>
              <li>
                <span>Вечером: {Math.round(forecast.temp.eve)}</span>
                <span>&#8451;</span>
              </li>
              <li>
                <span>Ночью: {Math.round(forecast.temp.night)}</span>
                <span>&#8451;</span>
              </li>
            </ul>
          </div>

          <div className={s.divider}></div>

          <div className={s.right}>
            <ul className={s.list}>
              <li>
                <span>Восход: {parseTimestamp(forecast.sunrise, "time")}</span>
              </li>
              <li>
                <span>Закат: {parseTimestamp(forecast.sunset, "time")}</span>
              </li>
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

export default DailyItem;
