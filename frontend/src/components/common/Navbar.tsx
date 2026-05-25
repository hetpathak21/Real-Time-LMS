import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  InputBase,
} from "@mui/material";

import {
  NotificationsOutlined,
  LogoutOutlined,
  MenuOutlined,
  Search,
} from "@mui/icons-material";

import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authThunks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();


  const [searchOpen, setSearchOpen] = useState(false);

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
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Mobile menu */}
          <IconButton
            sx={{ display: { md: "none" } }}
            onClick={() => console.log("Open drawer")}
          >
            <MenuOutlined />
          </IconButton>

          {/* Search box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f5f9",
              borderRadius: "10px",
              px: 1.5,
              py: 0.5,
              width: searchOpen ? "180px" : { xs: 0, sm: 180, md: 260 },
              transition: "0.3s ease",
              overflow: "hidden",
            }}
          >
            <Search sx={{ fontSize: 18, color: "#64748b" }} />

            <InputBase
              placeholder="Search courses..."
              sx={{
                ml: 1,
                fontSize: "14px",
                width: "100%",
              }}
            />
          </Box>

          {/* Mobile search toggle */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={() => setSearchOpen((p) => !p)}
          >
            <Search />
          </IconButton>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>

          <IconButton>
            <NotificationsOutlined sx={{ fontSize: 20 }} />
          </IconButton>

          {/* USER INFO */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
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
              sx={{
                width: 36,
                height: 36,
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
            <LogoutOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
