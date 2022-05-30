import React from "react";
import { hourlyForecast } from "../../../redux/reducer/forecast-reducer";
import { IForecastProps } from "../forecast-container";
import s from "./hourlyForecast.module.scss";
import HourlyItem from "./hourlyItem/hourlyItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Scrollbar } from "swiper";
import "swiper/css";
import { parseTimestamp } from "../../../tools/parseTimestamp";

const HourlyForecast = ({
  forecast,
}: IForecastProps<Array<hourlyForecast>>) => {
  const hourlyList = forecast?.map((item) => {
    return (
      <SwiperSlide style={{ height: "auto" }} key={item.dt}>
        <HourlyItem forecast={item} />
      </SwiperSlide>
    );
  });

  const scaleList = forecast?.map((item) => {
    return <li key={item.dt}>{parseTimestamp(item.dt, "hour")}</li>;
  });

  return (
    <div className={s.wrapper}>
      <div className={s.scrollbar}>
        <ul className={s.scale}>{scaleList}</ul>
        <div className="hourly-scrollbar"></div>
      </div>

      <Swiper
        className="hourly-slider"
        style={{ overflow: "visible" }}
        modules={[Navigation, Scrollbar, Mousewheel]}
        freeMode
        scrollbar={{ el: ".hourly-scrollbar", draggable: true }}
        mousewheel={true}
        slidesPerView={1}
        breakpoints={{
          1500: { slidesPerView: 6 },
          1300: { slidesPerView: 5 },
          1050: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          375: { slidesPerView: 2 },
        }}
      >
        {hourlyList}
      </Swiper>
    </div>
  );
};

export default HourlyForecast;
