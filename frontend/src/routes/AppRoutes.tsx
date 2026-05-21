import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboards
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

// Protected Routes
import ProtectedRoutes from "./ProtectedRoute";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";

// MUI
import { Box, Typography, Button } from "@mui/material";

// --------------------
// Unauthorized Page
// --------------------

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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
          gutterBottom
        >
          403
        </Typography>

        <Typography variant="h6" gutterBottom>
          Unauthorized Access
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          You do not have permission to access this page.
        </Typography>

        <Button variant="contained" href="/login">
          Go To Login
        </Button>
      </Box>
    </Box>
  );
}

// --------------------
// App Routes
// --------------------

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ================= STUDENT ROUTES ================= */}

      <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>
      </Route>

      {/* ================= TEACHER ROUTES ================= */}

      <Route element={<ProtectedRoutes allowedRoles={["teacher"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* ================= DEFAULT REDIRECT ================= */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
