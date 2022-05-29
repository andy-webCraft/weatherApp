import { parseTimestamp } from "./parseTimestamp";

const weatherBg = (weather: string, time: number) => {
  const hourDay = +parseTimestamp(time, "hour");
  const timeDay = hourDay > 6 && hourDay < 20 ? "day" : "night";
  const weatherType = weather.toLowerCase();

  return weatherType + "-" + timeDay + "-bg";
};

export default weatherBg;
