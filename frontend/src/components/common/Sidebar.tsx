// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// import {
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Toolbar,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import MenuIcon from "@mui/icons-material/Menu";

// import { useAuth } from "../../hooks/useAuth";

// const drawerWidth = 260;

// export default function Sidebar() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [mobileOpen, setMobileOpen] = useState(false);

//   const location = useLocation();

//   const { user } = useAuth();

//   const handleDrawerToggle = () => {
//     setMobileOpen((prev) => !prev);
//   };

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <DashboardIcon />,
//       path: `/${user?.role}/dashboard`,
//     },
//     {
//       label: "Courses",
//       icon: <MenuBookIcon />,
//       path: `/${user?.role}/courses`,
//     },
//     {
//       label: "Assignments",
//       icon: <AssignmentIcon />,
//       path: `/${user?.role}/assignments`,
//     },
//   ];

//   const drawerContent = (
//     <Box>
//       <Toolbar>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 700,
//           }}
//         >
//           LMS Portal
//         </Typography>
//       </Toolbar>

//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.label}
//             component={Link}
//             to={item.path}
//             selected={location.pathname === item.path}
//             onClick={() => setMobileOpen(false)}
//             sx={{
//               mx: 1,
//               borderRadius: 2,
//               mb: 1,
//             }}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>

//             <ListItemText primary={item.label} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       {isMobile && (
//         <IconButton
//           onClick={handleDrawerToggle}
//           sx={{
//             position: "fixed",
//             top: 12,
//             left: 12,
//             zIndex: 1300,
//             bgcolor: "#fff",
//             boxShadow: 2,
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//       )}

//       {/* Mobile Drawer */}
//       {isMobile ? (
//         <Drawer
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           variant="temporary"
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       ) : (
//         // Desktop Drawer
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               boxSizing: "border-box",
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       )}
//     </>
//   );
// }


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Toolbar,
} from "@mui/material";
import {
  DashboardOutlined,
  MenuBookOutlined,
  AssignmentOutlined,
  Menu,
} from "@mui/icons-material";

import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 260;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: `/${user?.role || "admin"}/dashboard`,
    },
    {
      label: "Courses",
      icon: <MenuBookOutlined />,
      path: `/${user?.role || "admin"}/courses`,
    },
    {
      label: "Assignments",
      icon: <AssignmentOutlined />,
      path: `/${user?.role || "admin"}/assignments`,
    },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: "#ffffff" }}>
      <Toolbar sx={{ minHeight: "70px !important", px: 3 }}>
        {/* Core Platform Identity Brand Logo Text */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#00a3ff",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          EduLearn
        </Typography>
      </Toolbar>

      <List sx={{ px: 1.5, mt: 2 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={isSelected}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: "12px",
                mb: 1,
                py: 1.2,
                px: 2,
                color: isSelected ? "#00a3ff" : "#64748b",
                bgcolor: isSelected ? "#00a3ff10 !important" : "transparent",
                "&:hover": {
                  bgcolor: "#f8fafc",
                  color: isSelected ? "#00a3ff" : "#1e293b",
                },
                "& .MuiListItemIcon-root": {
                  color: isSelected ? "#00a3ff" : "#94a3b8",
                  minWidth: "40px",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: "14px", fontWeight: isSelected ? 700 : 500 }} 
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Toggle Trigger Button */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 15,
            left: 16,
            zIndex: 1300,
            bgcolor: "#ffffff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid #edf2f9",
            borderRadius: "10px",
            p: 1,
            "&:hover": { bgcolor: "#f8fafc" }
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Responsive View Viewport Handling */}
      {isMobile ? (
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxShadow: "20px 0px 40px rgba(0,0,0,0.03)",
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #edf2f9",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}