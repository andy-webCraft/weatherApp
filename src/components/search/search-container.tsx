import React, { useEffect, useState } from "react";
import { suggestion, suggestionsAPI } from "../../api/suggestionsAPI";
import { useTypedDispatch, useTypedSelector } from "../../hooks/hooks";
import {
  requestingToggle,
  setNewNotification,
} from "../../redux/reducer/app-reducer";
import { getForecastAsync } from "../../redux/reducer/forecast-reducer";
import {
  addLastSearching,
  getGeoDataByCityAsync,
  getLastSearching,
  ILocation,
  selectLocation,
  setLocation,
} from "../../redux/reducer/location-reducer";
import Search from "./search";
import s from "./search-container.module.scss";

const SearchContainer = () => {
  const dispatch = useTypedDispatch();
  let { lastSearch } = useTypedSelector(selectLocation);

  let [loading, loadingToggle] = useState<boolean>(false);
  let [options, setOptions] =
    useState<Array<suggestion | ILocation>>(lastSearch);

  useEffect(() => {
    dispatch(getLastSearching());
    setOptions(lastSearch);
  }, []);

  const fetchSuggestions = async (value: string) => {
    if (value.length > 0) {
      try {
        loadingToggle(true);
        const response = await suggestionsAPI.getAutoComplite(value);
        setOptions(response.data.suggestions);
        loadingToggle(false);
      } catch (error: any) {
        dispatch(setNewNotification({ type: "error", message: error.message }));
        loadingToggle(false);
      }
    } else {
      setOptions(lastSearch);
    }
  };

  const fetchForecast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue: string = e.currentTarget["searchInput"].value;
    const target = options.find((item) => item.value === inputValue);

    try {
      dispatch(requestingToggle(true));

      let locationData;

      if (target) {
        locationData = {
          data: {
            country: target.data.country,
            city: target.data.city,
            geo_lat: +target.data.geo_lat,
            geo_lon: +target.data.geo_lon,
          },
          value: target.value,
        };
      } else {
        locationData = await dispatch(
          getGeoDataByCityAsync(inputValue)
        ).unwrap();
      }

      await dispatch(
        getForecastAsync({
          geo_lat: locationData.data.geo_lat,
          geo_lon: locationData.data.geo_lon,
        })
      ).unwrap();

      dispatch(setLocation(locationData));
      dispatch(addLastSearching(locationData));
      dispatch(requestingToggle(false));
    } catch (error: any) {
      if (error.name === "TypeError") {
        dispatch(
          setNewNotification({
            type: "error",
            message: `Город ${inputValue} не найден`,
          })
        );
      } else {
        dispatch(setNewNotification({ type: "error", message: error.message }));
      }
      dispatch(requestingToggle(false));
    }
  };

  return (
    <div className={s.wrapper}>
      <Search
        options={options}
        loading={loading}
        fetchSuggestions={fetchSuggestions}
        handleSubmit={fetchForecast}
      />
    </div>
  );
};

export default SearchContainer;
