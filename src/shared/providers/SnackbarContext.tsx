import React, { useState } from "react";
import { type AlertColor, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import theme from "../styles/mainTheme";
import { SnackbarContext } from "./useSnackbar";

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showSnackbar = (msg: string, sev: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const hideSnackbar = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, hideSnackbar }}
    >
      {children}
      <Snackbar
        open={open}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              severity === "success"
                ? theme.palette.snackbar.success
                : severity === "error"
                ? theme.palette.snackbar.error
                : severity === "warning"
                ? theme.palette.snackbar.warning
                : theme.palette.snackbar.info,

            "& .MuiAlert-message": {
              px: 1,
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
