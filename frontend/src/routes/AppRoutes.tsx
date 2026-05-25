import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboards
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
// import Profile from "../pages/profile/Profile";

// Protected Routes
import ProtectedRoutes from "./ProtectedRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// MUI
import { Box, Typography, Button } from "@mui/material";
import AssignmentList from "../pages/assignment/AssignmentList";
import AssignmentDetails from "../pages/assignment/AssignmentDetails";

/* -------------------------------------------------------------------------- */
/*                          UNAUTHORIZED PAGE                                 */
/* -------------------------------------------------------------------------- */

function UnauthorizedPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        bgcolor: "#f5f7fb",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          403
        </Typography>

        <Typography variant="h6" gutterBottom>
          Unauthorized Access!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You do not have permission to access this page.
        </Typography>

        <Button variant="contained" href="/login">
          Go To Login
        </Button>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                                ROUTES                                      */
/* -------------------------------------------------------------------------- */

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* STUDENT */}
      <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
      <Route path="/student/assignments" element={<AssignmentList />} />
      <Route path="/student/assignments/details" element={<AssignmentDetails />} />
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>
      </Route>

      {/* TEACHER */}
      <Route element={<ProtectedRoutes allowedRoles={["teacher"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
