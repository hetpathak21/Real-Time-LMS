import { AlertColor } from "@mui/material";

type ToastHandler = (message: string, type?: AlertColor) => void;

let globalToast: ToastHandler | null = null;

export const setToastHandler = (handler: ToastHandler) => {
  globalToast = handler;
};

export const showToast = (
  message: string,
  type: AlertColor = "success"
) => {
  if (globalToast) {
    globalToast(message, type);
  }
};