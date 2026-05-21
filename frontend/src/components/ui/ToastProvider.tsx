import React, { useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { ToastContext } from "./toastContext";
import { setToastHandler } from "../../utils/toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showToast = (msg: string, type: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  // global helper connection
  setToastHandler(showToast);

  const handleClose = () => setOpen(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};