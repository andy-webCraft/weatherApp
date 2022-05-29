import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import s from "./search.module.scss";
import { suggestion } from "../../api/suggestionsAPI";
import { ILocation } from "../../redux/reducer/location-reducer";

type SearchProps = {
  options: Array<suggestion | ILocation>;
  loading: boolean;
  fetchSuggestions: Function;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const Search = ({
  options,
  loading,
  fetchSuggestions,
  handleSubmit,
}: SearchProps) => {
  let [value, setValue] = useState<string>("");

  let timerID: any = useRef();

  useEffect(() => {
    clearTimeout(timerID.current);
    timerID.current = setTimeout(() => fetchSuggestions(value), 400);
  }, [value]);

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Autocomplete
        className={s.input}
        freeSolo={true}
        options={options.map((option) => option.value)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            name="searchInput"
            {...params}
            variant="filled"
            label="Введите населённый пункт"
            value={value}
            onChange={onChangeHandle}
            required
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Button className={s.btn} variant="contained" type="submit">
        Узнать
      </Button>
    </form>
  );
};

export default Search;
