import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";

import { logout } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";

import { showToast } from "../../utils/toast";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());

    showToast("Logged out successfully", "info");

    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        width: {
          md: "calc(100% - 260px)",
        },
        ml: {
          md: "260px",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            ml: {
              xs: 5,
              md: 0,
            },
          }}
        >
          Learning Management System
        </Typography>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {user?.name}
          </Typography>

          <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>

          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
