import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useTypedSelector } from "../../../hooks/hooks";
import { selectApp } from "../../../redux/reducer/app-reducer";

const Notification = () => {
  let [show, showToggle] = useState<boolean>(false);
  let { notification } = useTypedSelector(selectApp);

  useEffect(() => {
    notification && showToggle(true);
  }, [notification]);

  return (
    <Snackbar
      sx={{ maxWidth: 350 }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={show}
      autoHideDuration={5000}
      onClose={() => showToggle(false)}
      transitionDuration={500}
    >
      <Alert severity={notification?.type}>{notification?.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
