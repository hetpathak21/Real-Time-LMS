import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Chip, Paper, Typography, Button } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllCourses } from "../../features/course/courseThunks";
import CourseCard from "../../components/course/CourseCard";

export default function CourseList() {
  const dispatch = useAppDispatch();

  const { courses, loading } = useAppSelector((state) => state.course);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return courses;

    return courses.filter((course) => {
      const haystack = [
        course.title,
        course.description,
        course.category,
        course.level,
        ...(course.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [courses, search]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        flex: "1",
        minHeight: "100%",
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "20px",
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800 }}
              color={theme.palette.text.primary}
            >
              Course Explorer
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              Search and manage all courses
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => navigate("/teacher/create-course")}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Create Course
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "12px",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#f8fafc",
                border: `1px solid ${theme.palette.divider}`,
                "& input::placeholder": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <SearchRoundedIcon sx={{ color: theme.palette.text.secondary }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Chip
            label={`${filteredCourses.length} results`}
            sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700 }}
          />
          <Chip
            label={`${courses.length} total courses`}
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : "#f8fafc",
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
        </Box>
      </Paper>

      {/* LOADING */}
      {loading ? (
        <Typography sx={{ color: theme.palette.text.secondary }}>
          Loading courses...
        </Typography>
      ) : courses.length === 0 ? (
        /* EMPTY STATE */
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: `1px dashed ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            No courses yet!
          </Typography>

          <Typography
            sx={{
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            Create your first course to get started
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </Button>
        </Paper>
      ) : filteredCourses.length === 0 ? (
        /* NO SEARCH RESULTS */
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: `1px dashed ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            No matching courses found
          </Typography>

          <Typography sx={{ color: theme.palette.text.secondary, mt: 1 }}>
            Try different keywords
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
        </Paper>
      ) : (
        /* GRID */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </Box>
      )}
    </Box>
  );
}
