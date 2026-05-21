import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";

export default function AssignmentDetails() {
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 2,
            sm: 4,
          },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
          }}
        >
          React Hooks Assignment
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
            lineHeight: 1.8,
          }}
        >
          Build a React application demonstrating
          useState, useEffect, and custom hooks.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="body1"
          sx={{ mb: 1 }}
        >
          Due Date: 25 May 2026
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 3 }}
        >
          Status: Pending
        </Typography>

        <Button variant="contained">
          Submit Assignment
        </Button>
      </Paper>
    </Box>
  );
}