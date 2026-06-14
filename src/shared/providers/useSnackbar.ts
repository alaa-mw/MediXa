import { createContext, useContext } from "react";
import { type AlertColor } from "@mui/material";

interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};