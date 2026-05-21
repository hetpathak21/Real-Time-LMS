import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadUser } from "./features/auth/authThunks";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useAppDispatch();

  const { loading, user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  /**
   * Load logged-in user on app start
   */
  useEffect(() => {
    if(token){

      dispatch(loadUser());
    }
  }, [dispatch, token]);

  /**
   * Show global loader only during initial auth check
   */
  if (loading && !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          bgcolor: "#f5f7fb",
        }}
      >
        <AppRoutes />
      </Box>
    </BrowserRouter>
  );
}