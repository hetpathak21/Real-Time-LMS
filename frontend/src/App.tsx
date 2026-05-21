import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadUser } from "./features/auth/authThunks";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Initial auth loading screen
  if (loading) {
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