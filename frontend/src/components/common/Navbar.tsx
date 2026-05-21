// import { useNavigate } from "react-router-dom";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   Button,
// } from "@mui/material";

// import { logout } from "../../features/auth/authSlice";
// import { useAppDispatch } from "../../app/hooks";
// import { useAuth } from "../../hooks/useAuth";

// import { showToast } from "../../utils/toast";

// export default function Navbar() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { user } = useAuth();

//   const handleLogout = () => {
//     dispatch(logout());

//     showToast("Logged out successfully", "info");

//     navigate("/login");
//   };

//   return (
//     <AppBar
//       position="fixed"
//       elevation={1}
//       sx={{
//         bgcolor: "#fff",
//         color: "#000",
//         width: {
//           md: "calc(100% - 260px)",
//         },
//         ml: {
//           md: "260px",
//         },
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* Title */}
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 700,
//             ml: {
//               xs: 5,
//               md: 0,
//             },
//           }}
//         >
//           Learning Management System
//         </Typography>

//         {/* Right Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Typography
//             variant="body1"
//             sx={{
//               display: {
//                 xs: "none",
//                 sm: "block",
//               },
//             }}
//           >
//             {user?.name}
//           </Typography>

//           <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>

//           <Button variant="outlined" color="error" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  NotificationsOutlined,
  Brightness4Outlined,
  ChatOutlined,
  LanguageOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authThunks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } finally {
      showToast("Logged out successfully", "info");
      navigate("/login");
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#1e293b",
        borderBottom: "1px solid #edf2f9",
        width: { md: "calc(100% - 260px)" },
        ml: { md: "260px" },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          minHeight: "70px !important",
        }}
      >
        {/* Left Side: Dynamic Workspace Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", width: { xs: "40%", sm: "300px" }, ml: { xs: 5, md: 0 } }}>
          <Box
            component="input"
            placeholder="Search..."
            sx={{
              width: "100%",
              border: "none",
              outline: "none",
              bgcolor: "#f8fafc",
              p: "10px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              color: "#1e293b",
              "&::placeholder": { color: "#94a3b8" },
            }}
          />
        </Box>

        {/* Right Side: Quick Action Utilities & User Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
          <IconButton size="small" sx={{ color: "#64748b" }}><Brightness4Outlined /></IconButton>
          <IconButton size="small" sx={{ color: "#64748b" }}><NotificationsOutlined /></IconButton>
          <IconButton size="small" sx={{ color: "#64748b" }}><ChatOutlined /></IconButton>
          <IconButton size="small" sx={{ color: "#64748b", display: { xs: "none", sm: "inline-flex" } }}><LanguageOutlined /></IconButton>
          
          {/* Active User Information Card Block */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: 1 }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>
                {user?.name || "Nil Yeager"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b", display: "block", fontWeight: 600, textTransform: "uppercase", fontSize: "10px" }}>
                {user?.role || "Admin"}
              </Typography>
            </Box>
            <Avatar 
              onClick={() => navigate("/profile")}
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: "#00a3ff", 
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0px 4px 12px rgba(0, 163, 255, 0.2)",
                cursor: "pointer",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </Avatar>
          </Box>

          {/* <IconButton size="small" sx={{ color: "#64748b", ml: 0.5 }}><SettingsOutlined /></IconButton> */}
          <IconButton size="small" color="error" onClick={handleLogout} sx={{ ml: 0.5 }}><LogoutOutlined /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
