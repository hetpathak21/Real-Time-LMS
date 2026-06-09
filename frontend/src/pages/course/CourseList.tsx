import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/course/CourseCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllCourses } from "../../features/course/courseThunks";
import { useAuth } from "../../hooks/useAuth";

const COLORS = {
  primary: "#00A8FF",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#0f172a",
  textSub: "#64748b",
  border: "#e2e8f0",
};

const pageReveal = {
  "@keyframes pageReveal": {
    "0%": { opacity: 0, transform: "translateY(12px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  animation: "pageReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
};

const cardStagger = {
  "@keyframes cardStagger": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  animation: "cardStagger 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards",
};

export default function CourseList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isTeacher } = useAuth();
  const { courses, loading } = useAppSelector((state) => state.course);
  const [search, setSearch] = useState("");

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
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        p: { xs: 2 },
        ...pageReveal,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: "24px",
          bgcolor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(30, 41, 59, 0.04)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "250px",
            height: "100%",
            background: `radial-gradient(circle at top right, ${alpha(COLORS.primary, 0.07)}, transparent 70%)`,
            pointerEvents: "none",
          },
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
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5 }}>
            <Box
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

              <Typography
                variant="h5"
                sx={{ fontWeight: 800, letterSpacing: "-0.02em", mt: 1 }}
                color={theme.palette.text.primary}
              >
                Course Explorer
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  maxWidth: 460,
                  mt: 1,
                }}
              >
                Search, monitor, and deploy educational materials systematically across your student channels.
              </Typography>
            </Box>
          </Box>

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
                gap: 1,
                px: 2,
                py: 1.25,
                borderRadius: "16px",
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
                flexGrow: { xs: 1, lg: 0 },
                width: { lg: 340 },
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:focus-within": {
                  bgcolor: "#ffffff",
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 0 4px ${alpha(COLORS.primary, 0.15)}`,
                  transform: "translateY(-1px)",
                },
                "& input::placeholder": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, category, level, tags..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                  fontWeight: 550,
                  color: COLORS.textMain,
                  width: "100%",
                }}
              />
            </Box>

            {isTeacher && (
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => navigate("/teacher/create-course")}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: COLORS.primary,
                  color: "white",
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

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Chip
            label={`${filteredCourses.length} results`}
            sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700 }}
          />
          <Chip
            label={`${courses.length} total courses`}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? theme.palette.background.default : "#f8fafc",
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
        </Box>
      </Paper>

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
          <Typography variant="body2" sx={{ color: COLORS.textSub, fontWeight: 600 }}>
            Fetching content...
          </Typography>
        </Box>
      ) : courses.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "24px",
            border: `2px dashed ${COLORS.border}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="subtitle1" fontWeight={800}>
            No courses listed yet
          </Typography>

          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5, mb: 2.5 }}>
            Create your first course to get started.
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
              mt: 2,
            }}
            onClick={() => navigate("/teacher/create-course")}
          >
            Create Course
          </Button>
        </Paper>
      ) : filteredCourses.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: "24px",
            border: `1px solid ${COLORS.border}`,
            bgcolor: COLORS.cardBg,
            ...cardStagger,
          }}
        >
          <Typography variant="subtitle1" fontWeight={800} color={COLORS.textMain}>
            No results match your search parameters
          </Typography>

          <Typography variant="body2" sx={{ color: COLORS.textSub, mt: 0.5, mb: 2 }}>
            Verify alternative keywords or reset filtering syntax constraints.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
            }}
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
        </Paper>
      ) : (
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