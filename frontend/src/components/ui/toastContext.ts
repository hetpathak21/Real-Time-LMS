import { createContext, useContext } from "react";
import { AlertColor } from "@mui/material";

export type ToastContextType = {
  showToast: (message: string, severity?: AlertColor) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};