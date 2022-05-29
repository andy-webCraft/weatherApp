import React from "react";
import s from "./thermometr.module.scss";

type typedProps = {
  gradus: number;
};

const Thermometr = ({ gradus }: typedProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.body}>
        <div className={s.graduations}>
          <span className={s.t30}>30</span>
          <span className={s.t20}>20</span>
          <span className={s.t10}>10</span>
          <span className={s.t0}>0</span>
          <span className={s.t_10}>-10</span>
          <span className={s.t_20}>-20</span>
          <span className={s.t_30}>-30</span>
        </div>
        <div
          className={s.temperature}
          style={{ height: 90 + gradus * 3 }}
        ></div>
      </div>
    </div>
  );
};

export default Thermometr;
