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
  PersonOutlined,
  Menu,
} from "@mui/icons-material";

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

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 MENU ITEMS                                 */
  /* -------------------------------------------------------------------------- */

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: `/${user?.role || "admin"}/dashboard`,
    },
    {
      label: "Courses",
      icon: <MenuBookOutlined />,
      path: "/courses",
    },
    {
      label: "Assignments",
      icon: <AssignmentOutlined />,
      path: `/${user?.role || "admin"}/assignments`,
    },
    {
      label: "Profile",
      icon: <PersonOutlined />,
      path: "/profile",
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                              DRAWER CONTENT                                */
  /* -------------------------------------------------------------------------- */

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: theme.palette.background.paper }}>
      <Toolbar sx={{ minHeight: "70px !important", px: 3 }}>
        {/* Logo Text */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.main,
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
                color: isSelected
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,

                bgcolor: isSelected
                  ? `${theme.palette.primary.main}15`
                  : "transparent",

                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.text.primary,
                },

                "& .MuiListItemIcon-root": {
                  color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  minWidth: "40px",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: isSelected ? 700 : 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
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
            bgcolor: theme.palette.background.paper,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid #edf2f9",
            borderRadius: "10px",
            p: 1,
            "&:hover": { bgcolor: theme.palette.action.hover },
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
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
