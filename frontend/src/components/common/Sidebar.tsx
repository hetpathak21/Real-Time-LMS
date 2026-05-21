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

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 260;

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const { user } = useAuth();

  const role = user?.role || "student";

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 MENU ITEMS                                 */
  /* -------------------------------------------------------------------------- */

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: `/${role}/dashboard`,
    },
    {
      label: "Courses",
      icon: <MenuBookIcon />,
      path: `/${role}/courses`,
    },
    {
      label: "Assignments",
      icon: <AssignmentIcon />,
      path: `/${role}/assignments`,
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                              DRAWER CONTENT                                */
  /* -------------------------------------------------------------------------- */

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          LMS Portal
        </Typography>
      </Toolbar>

      <List
        sx={{
          px: 1,
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={isActive}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,

                bgcolor: isActive ? "primary.main" : "transparent",

                color: isActive ? "#fff" : "inherit",

                "&:hover": {
                  bgcolor: isActive
                    ? "primary.dark"
                    : "rgba(0,0,0,0.04)",
                },

                "& .MuiListItemIcon-root": {
                  color: isActive ? "#fff" : "inherit",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 14,
            left: 14,
            zIndex: 1400,
            bgcolor: "#fff",

            boxShadow: 3,

            "&:hover": {
              bgcolor: "#f3f4f6",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #e5e7eb",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}