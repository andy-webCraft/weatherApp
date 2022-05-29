import React from "react";
import s from "./loader.module.scss";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className={s.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
