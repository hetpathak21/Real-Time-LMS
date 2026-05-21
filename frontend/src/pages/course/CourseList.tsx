import { Box, Grid, Typography, TextField } from "@mui/material";

import CourseCard from "../../components/course/CourseCard";

const courses = [
  {
    title: "React Fundamentals",
    description: "Learn React from basics to advanced concepts.",
    category: "Frontend",
    instructor: "John Doe",
  },
  {
    title: "Node.js API Development",
    description: "Build scalable backend APIs using Node.js.",
    category: "Backend",
    instructor: "Jane Smith",
  },
  {
    title: "MongoDB Mastery",
    description: "Understand NoSQL databases deeply.",
    category: "Database",
    instructor: "Alex Brown",
  },
];

export default function CourseList() {
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
          Courses
        </Typography>

        <TextField
          placeholder="Search courses..."
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
        {courses.map((course) => (
          <Grid
            key={course.title}
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
