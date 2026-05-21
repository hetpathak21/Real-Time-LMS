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
import { ROUTES } from "../../utils/constants";

const drawerWidth = 260;

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());

    showToast("Logged out successfully", "info");

    navigate(ROUTES.LOGIN);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: "#fff",
        color: "#000",

        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          md: `${drawerWidth}px`,
        },

        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "70px !important",
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

            fontSize: {
              xs: "1rem",
              sm: "1.2rem",
            },
          }}
        >
          LMS Portal
        </Typography>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          {/* Username */}
          <Typography
            variant="body1"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },

              fontWeight: 500,
            }}
          >
            {user?.name || "User"}
          </Typography>

          {/* Avatar */}
          <Avatar>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Avatar>

          {/* Logout */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}