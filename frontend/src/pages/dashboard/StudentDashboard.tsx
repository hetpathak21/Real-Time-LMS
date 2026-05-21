import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const stats = [
  {
    title: "Enrolled Courses",
    value: 8,
  },
  {
    title: "Completed Assignments",
    value: 24,
  },
  {
    title: "Pending Assignments",
    value: 5,
  },
  {
    title: "Notifications",
    value: 12,
  },
];

export default function StudentDashboard() {
  return (
    <Box>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          fontSize: {
            xs: "1.8rem",
            sm: "2.2rem",
          },
        }}
      >
        Student Dashboard
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid
            key={item.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}