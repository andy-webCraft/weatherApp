import React from "react";
import { currentForecast } from "../../../redux/reducer/forecast-reducer";
import { convertPressure } from "../../../tools/convertPressure";
import { getDayOfWeek } from "../../../tools/getDayOfWeek";
import { parseTimestamp } from "../../../tools/parseTimestamp";
import { wingDirection } from "../../../tools/wingDirection";
import Thermometr from "../../common/thermometr/thermometr";
import WeatherIcon from "../../common/weatherIcon/weatherIcon";
import { IForecastProps } from "../forecast-container";
import s from "./currentForecast.module.scss";

const CurrentForecast = ({ forecast }: IForecastProps<currentForecast>) => {
  return (
    <div className={s.wrapper}>
      {forecast && (
        <div className={s.body}>

          <div className={s.thermometr}>
            <Thermometr gradus={forecast?.temp} />
          </div>

          <div className={s.top}>
            <div className={s.info}>
              
              <div className={s.icon}>
                <WeatherIcon icon={forecast.weather[0].icon} />
                <span className={s.description}>
                  {forecast.weather[0].description}
                </span>
              </div>

              <div className={s.date}>
                <span>{parseTimestamp(forecast?.dt, "date")}</span>
                <p>{getDayOfWeek(forecast.dt)}</p>
              </div>
            </div>

            <p className={s.temperature}>
              {Math.round(forecast.temp)}
              <span>&#8451;</span>
            </p>
            <p className={s.feelsLike}>
              Ощущается как {Math.round(forecast.feels_like)}
              <span>&#8451;</span>
            </p>
          </div>

          <div className={s.bottom}>
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
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentForecast;
