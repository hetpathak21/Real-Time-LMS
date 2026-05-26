import { Box, Grid, Typography, TextField } from "@mui/material";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAssignmentsByCourse } from "../../features/assignment/assignmentThunks";
import AssignmentCard from "../../components/assignment/AssignmentCard";

export default function AssignmentList() {
  const dispatch = useAppDispatch();

  const { assignments, loading, error } = useAppSelector(
    (state) => state.assignment,
  );

  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchAssignmentsByCourse(courseId));
    }
  }, [dispatch, courseId]);

  if (loading) {
    return <Typography sx={{ mt: 2 }}>Loading assignments...</Typography>;
  }

  if (error) {
    return <Typography sx={{ mt: 2, color: "error.main" }}>{error}</Typography>;
  }

  const mappedAssignments = assignments;

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
        {mappedAssignments.map((assignment) => (
          <Grid
            key={assignment._id}
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
