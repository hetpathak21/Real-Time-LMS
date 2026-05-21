import { Outlet } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
        }}
      >
        {/* LMS Branding */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 1,
            mt: 1.2,
          }}
        >
          LMS Portal
        </Typography>

        <Outlet />
      </Paper>
    </Box>
  );
}
