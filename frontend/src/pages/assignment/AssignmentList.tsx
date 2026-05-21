import {
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

import AssignmentCard from "../../components/assignment/AssignmentCard";

const assignments = [
  {
    title: "React Hooks Assignment",
    course: "React Fundamentals",
    dueDate: "25 May 2026",
    status: "Pending" as const,
  },
  {
    title: "Node API Task",
    course: "Backend Development",
    dueDate: "28 May 2026",
    status: "Submitted" as const,
  },
  {
    title: "MongoDB Aggregation",
    course: "Database Systems",
    dueDate: "30 May 2026",
    status: "Reviewed" as const,
  },
];

export default function AssignmentList() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
          }}
        >
          Assignments
        </Typography>

        <TextField
          placeholder="Search assignments..."
          size="small"
          sx={{
            width: {
              xs: "100%",
              sm: 300,
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {assignments.map((assignment) => (
          <Grid
            key={assignment.title}
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <AssignmentCard {...assignment} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}