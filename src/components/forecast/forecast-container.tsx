import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/hooks";
import { selectForecast } from "../../redux/reducer/forecast-reducer";
import { selectLocation } from "../../redux/reducer/location-reducer";
import s from "./forecast-container.module.scss";
import CurrentForecast from "./currentForecast/currentForecast";
import HourlyForecast from "./hourlyForecast/hourlyForecast";
import DailyForecast from "./dailyForecast/dailyForecast";
import { selectApp } from "../../redux/reducer/app-reducer";
import Loader from "../common/loader/loader";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

type typeForecast = "current" | "hourly" | "daily";

export interface IForecastProps<T> {
  forecast: T | null;
}

const ForecastContainer = () => {
  let [viewBlock, toggleViewBlock] = useState<typeForecast>("current");

  let { current: location } = useTypedSelector(selectLocation);
  let { current, hourly, daily } = useTypedSelector(selectForecast);
  let { isRequesting } = useTypedSelector(selectApp);

  const handleToggle = (e: React.SyntheticEvent, value: typeForecast) => {
    if (value) toggleViewBlock(value);
  };

  return (
    <div className={s.wrapper}>
      <TabContext value={viewBlock}>
        {current && (
          <div className={s.top}>
            {location && (
              <span className={s.city}>
                {location.data.city ? location.data.city : location.value}
              </span>
            )}

            <TabList
              className={s.tabList}
              variant="fullWidth"
              onChange={handleToggle}
            >
              <Tab className={s.tabBtn} label="Сейчас" value="current" />
              <Tab className={s.tabBtn} label="На 48 часов" value="hourly" />
              <Tab className={s.tabBtn} label="На неделю" value="daily" />
            </TabList>
          </div>
        )}

        {isRequesting ? (
          <Loader />
        ) : (
          <div className={s.body}>
            <TabPanel value="current">
              <CurrentForecast forecast={current} />
            </TabPanel>
            <TabPanel value="hourly">
              <HourlyForecast forecast={hourly} />
            </TabPanel>
            <TabPanel value="daily">
              <DailyForecast forecast={daily} />
            </TabPanel>
          </div>
        )}
      </TabContext>
    </div>
  );
};

export default ForecastContainer;
