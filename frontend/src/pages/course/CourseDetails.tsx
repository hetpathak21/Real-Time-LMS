import { Box, Paper, Typography, Button, Divider } from "@mui/material";

export default function CourseDetails() {
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
              sm: "2.4rem",
            },
          }}
        >
          React Fundamentals
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
            lineHeight: 1.8,
          }}
        >
          This course helps students understand React fundamentals, component
          architecture, hooks, routing, and state management.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Instructor
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          John Doe
        </Typography>

        <Button variant="contained">Enroll Now</Button>
      </Paper>
    </Box>
  );
}
