import React from "react";
import { dailyForecast } from "../../../redux/reducer/forecast-reducer";
import { IForecastProps } from "../forecast-container";
import s from "./dailyForecast.module.scss";
import DailyItem from "./dailyItem/dailyItem";

const DailyForecast = ({ forecast }: IForecastProps<Array<dailyForecast>>) => {
  const dailyList = forecast?.map((item) => {
    return <DailyItem key={item.dt} forecast={item} />;
  });

  return <div className={s.wrapper}>{dailyList}</div>;
};

export default DailyForecast;
