import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import { useAuth } from "../hooks/useAuth";

interface ProtectedRoutesProps {
  allowedRoles?: ("student" | "teacher" | "admin")[];
}

export default function ProtectedRoutes({
  allowedRoles,
}: ProtectedRoutesProps) {
  const { user, loading, isAuthenticated } = useAuth();

  // Loading state while checking auth
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow route access
  return <Outlet />;
}