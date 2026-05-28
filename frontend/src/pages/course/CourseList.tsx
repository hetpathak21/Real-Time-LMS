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

  useEffect(() => {
    if (
      !recentlyCreatedCourseId ||
      !courses.some((course) => course._id === recentlyCreatedCourseId)
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(clearRecentlyCreatedCourse());
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [courses, dispatch, recentlyCreatedCourseId]);

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
            gap: 3,
            alignItems: { xs: "flex-start", lg: "center" },
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
                p: 1.5,
                bgcolor: alpha(COLORS.primary, 0.08),
                borderRadius: "18px",
                color: COLORS.primary,
                display: "flex",
                boxShadow: `0 8px 16px ${alpha(COLORS.primary, 0.06)}`,
                border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
              }}
            >
              <SparklesIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color={COLORS.textMain}
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  Course Explorer
                </Typography>

                {/* Meaningful Real-time Status Indicator Badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.25,
                    py: 0.4,
                    borderRadius: "20px",
                    bgcolor: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.15)",
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#22c55e",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(0.9)", opacity: 0.6 },
                        "50%": { transform: "scale(1.3)", opacity: 1 },
                        "100%": { transform: "scale(0.9)", opacity: 0.6 },
                      },
                      animation: "pulse 2s infinite ease-in-out",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#166534",
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      fontSize: "0.68rem",
                    }}
                  >
                    Published Courses
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textSub,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  maxWidth: 460,
                }}
              >
                Search, monitor, and deploy educational materials systematically
                across your student channels.
              </Typography>
            </Box>
          </Box>

          {/* Right Side: High-End Glassmorphic Controls Layer */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              width: { xs: "100%", lg: "auto" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
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
                placeholder="Search by text index, categories, tags..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>

            {isTeacher && (
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddRoundedIcon />}
                onClick={() => navigate("/teacher/create-course")}
                sx={{
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  px: 3.5,
                  py: 1.4,
                  bgcolor: COLORS.primary,
                  boxShadow: `0 4px 12px ${alpha(COLORS.primary, 0.15)}`,
                  transition: "all 0.25s ease",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    bgcolor: "#0092e4",
                    boxShadow: `0 6px 20px ${alpha(COLORS.primary, 0.35)}`,
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Create Course
              </Button>
            )}
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

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: COLORS.textMain,
                fontSize: "1.4rem",
                lineHeight: 1,
              }}
            >
              {courses.length}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.textSub,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontSize: "0.72rem",
              }}
            >
              Global Curriculums Managed
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/* ================= DATA CONSUMPTION BLOCK ================= */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 6,
            justifyContent: "center",
          }}
        >
          <CircularProgress size={20} sx={{ color: COLORS.primary }} />
          <Typography
            variant="body2"
            sx={{ color: COLORS.textSub, fontWeight: 600 }}
          >
            Fetching content...
          </Typography>
        </Box>
      ) : courses.length === 0 ? (
        /* INSTANCE: ABSOLUTE EMPTY GRID */
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "24px",
            border: `2px dashed ${COLORS.border}`,
            bgcolor: "transparent",
            ...cardStagger,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={800}
            color={COLORS.textMain}
          >
            No courses listed yet
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: COLORS.textSub, mt: 0.5, mb: 2.5 }}
          >
            Create your master profile and configure your first lesson track.
          </Typography>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddRoundedIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: COLORS.primary,
            }}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </Button>
        </Paper>
      ) : filteredCourses.length === 0 ? (
        /* INSTANCE: EXCLUSION CRITERIA MATCH */
        <Paper
          elevation={0}
          sx={{
            p: 6,
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
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              borderColor: COLORS.border,
              color: COLORS.textMain,
            }}
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
        </Paper>
      ) : (
        /* PRECISE PRESERVED GRID MECHANICS WITH CASCADE ENTRY STYLING */
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
            ...cardStagger,
          }}
        >
          {filteredCourses.map((course) => (
            <Box
              key={course._id}
              sx={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CourseCard {...course} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
