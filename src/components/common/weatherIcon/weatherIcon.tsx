import React from "react";
import s from "./weatherIcon.module.scss";

type typedProps = {
  icon: string;
};

const WeatherIcon = ({ icon }: typedProps) => {
  return (
    <div className={s.icon}>
      <img src={require(`../../../assets/icons/${icon}.png`)}  alt="icon" />
    </div>
  );
};

export default WeatherIcon;
