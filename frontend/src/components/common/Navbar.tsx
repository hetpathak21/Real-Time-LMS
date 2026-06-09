import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  // InputBase,
} from "@mui/material";
import {
  NotificationsOutlined,
  LogoutOutlined,
  // MenuOutlined,
  // Search,
} from "@mui/icons-material";

import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authThunks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
// import { useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  // const user = useAppSelector((state) => state.auth.user);

  // const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      showToast("Logged out successfully", "info");
      navigate("/login");
    } catch {
      showToast("Logout failed", "error");
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#0f172a",
        borderBottom: "1px solid #e2e8f0",
        width: { md: "calc(100% - 260px)" },
        ml: { md: "260px" },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "64px !important",
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}></Box> */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
          <IconButton>
            <NotificationsOutlined sx={{ fontSize: 36, px: 0.6 }} />
          </IconButton>

          {/* USER INFO */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              px: 0.7,
            }}
          >
            <Box sx={{ textAlign: "right", lineHeight: 1.1 }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
                {user?.name || "User"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {user?.role || "Student"}
              </Typography>
            </Box>

            <Avatar
              onClick={() => navigate("/profile")}
              src={user?.avatar || undefined}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#00a3ff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {!user?.avatar && user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Box>

          {/* LOGOUT */}
          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined sx={{ fontSize: 25, px: 0.5 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
