import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const stats = [
  {
    title: "Total Users",
    value: 1450,
  },
  {
    title: "Total Courses",
    value: 86,
  },
  {
    title: "Teachers",
    value: 42,
  },
  {
    title: "Students",
    value: 1320,
  },
];

export default function AdminDashboard() {
  return (
    <Box>
      {/* Title */}
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
        Admin Dashboard
      </Typography>

      {/* Stats */}
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