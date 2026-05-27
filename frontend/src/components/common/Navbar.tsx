import { useNavigate } from "react-router-dom";
import { AppBar, Typography, Box, Avatar, IconButton } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { NotificationsOutlined, LogoutOutlined } from "@mui/icons-material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { logoutUser } from "../../features/auth/authThunks";
import { toggleTheme } from "../../features/theme/themeSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      showToast("Logged out successfully!", "info");
      navigate("/login");
    } catch {
      showToast("Logout failed!", "error");
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: { md: "calc(100% - 260px)" },
        ml: { md: "260px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, sm: 1, md: 1.5 },
          ml: "auto",
          flexWrap: "nowrap",
        }}
      >
        <Box sx={{ display: "flex", ml: 100, alignItems: "center", gap: 1.5 }}>
          <IconButton
            sx={{
              color: theme.palette.text.primary,
              p: { xs: 0.7, sm: 1 },
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <NotificationsOutlined sx={{ fontSize: {xs: 24, sm: 25} }} />
          </IconButton>

          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: theme.palette.text.primary,
              p: { xs: 0.7, sm: 1 },
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            {mode === "dark" ? (
              <LightModeOutlinedIcon sx={{ fontSize: 25 }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: 25 }} />
            )}
          </IconButton>

          {/* USER INFO */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.2,
              px: 1.2,
            }}
          >
            <Box sx={{ textAlign: "right", lineHeight: 1.1 }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
                {user?.name || "User"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: theme.palette.text.secondary,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {user?.role || "Student"}
              </Typography>
            </Box>

            <Avatar
              onClick={() => navigate("/profile")}
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                bgcolor: "#00a3ff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </Box>

          {/* LOGOUT */}
          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined
              sx={{
                fontSize: { xs: 22, sm: 25 },
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}
