import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert, Box, Button, Chip, Paper, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";

import { fetchCourseById } from "../../features/course/courseThunks";
import {
  fetchLessonsByCourse,
  deleteLessonThunk,
} from "../../features/lesson/lessonThunks";

const getCourseTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"],
) => {
  if (typeof instructor === "object") return instructor?.name || "Instructor";
  if (typeof teacherId === "object") return teacherId?.name || "Instructor";
  if (typeof instructor === "string") return instructor;
  return "Instructor";
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { user, isAuthenticated, isStudent } = useAuth();
  const { selectedCourse, loading } = useAppSelector((s) => s.course);
  const { courseLessons, error: lessonError } = useAppSelector((s) => s.lesson);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchLessonsByCourse(courseId));
    }
  }, [courseId, dispatch]);

  const lessons = useMemo(
    () => [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order)),
    [courseLessons],
  );

  const isTeacherOwner =
    user?.role === "teacher" &&
    selectedCourse?.teacherId &&
    user._id ===
      (typeof selectedCourse.teacherId === "object"
        ? selectedCourse.teacherId._id
        : selectedCourse.teacherId);

  const teacherName = getCourseTeacherName(
    selectedCourse?.teacherId,
    selectedCourse?.instructor,
  );

  const handleDeleteLesson = async (lessonId: string) => {
    await dispatch(deleteLessonThunk(lessonId));
  };

  if (loading && !selectedCourse) {
    return (
      <Typography sx={{ color: theme.palette.text.primary }}>
        Loading course...
      </Typography>
    );
  }

  if (!selectedCourse) {
    return (
      <Typography sx={{ color: theme.palette.text.primary }}>
        No course found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100%",
        boxSizing: "border-box",
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      {/* HERO */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            minHeight: 320,
            position: "relative",
            background: selectedCourse.thumbnail
              ? `url(${selectedCourse.thumbnail}) center/cover`
              : "linear-gradient(135deg,#0ea5e9,#0369a1,#082f49)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 320,
            }}
          >
            {/* TOP ACTIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label={selectedCourse.isPublished ? "Published" : "Draft"}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: theme.palette.text.primary,
                  }}
                />
                <Chip
                  label={selectedCourse.category}
                  sx={{
                    color: theme.palette.text.primary,
                    bgcolor: "rgba(255,255,255,0.15)",
                  }}
                />
                <Chip
                  label={selectedCourse.level}
                  sx={{
                    color: theme.palette.text.primary,
                    bgcolor: "rgba(255,255,255,0.15)",
                  }}
                />{" "}
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => navigate("/courses")}
                  sx={{ color: "#fff" }}
                >
                  Back
                </Button>

                {isAuthenticated && isStudent && (
                  <Button
                    variant="contained"
                    color="success"
                    // onClick={() => console.log("Enroll course : ", _id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Enroll Now
                  </Button>
                )}

                {isTeacherOwner && (
                  <Button
                    startIcon={<EditRoundedIcon />}
                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </Box>

            {/* TITLE */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                  },
                }}
              >
                {" "}
                {selectedCourse.title}
              </Typography>

              <Typography sx={{ color: "#ddd", mt: 1, maxWidth: 700 }}>
                {selectedCourse.description}
              </Typography>
            </Box>

            {/* META */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "repeat(4,1fr)",
                },
                gap: 2,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                Instructor : {teacherName}
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                Lessons : {lessons.length}
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                Enrolled : {selectedCourse.enrollmentCount || 0}
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                Price:{" "}
                {selectedCourse.price ? `Rs.${selectedCourse.price}` : "Free"}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* MAIN LAYOUT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* LESSON LIST */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>Course Lessons</Typography>

            <Chip
              icon={<AutoStoriesRoundedIcon />}
              label={`${lessons.length} lessons`}
            />
          </Box>

          {lessonError && <Alert severity="error">{lessonError}</Alert>}

          {lessons.length === 0 ? (
            <Typography sx={{ color: theme.palette.text.secondary }}>
              No lessons yet!
            </Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {lessons.map((lesson, i) => (
                <Paper
                  key={lesson._id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      {i + 1}. {lesson.title}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Chip size="small" label={lesson.type} />
                      {lesson.isPreview && (
                        <Chip size="small" label="Preview" color="success" />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      onClick={() => navigate(`/lesson/${lesson._id}`)}
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Open
                    </Button>

                    {isTeacherOwner && (
                      <Button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>

        {/* SIDEBAR */}
        <Box sx={{ display: "grid", gap: 2 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Course Snapshot</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography>Level : {selectedCourse.level}</Typography>
              <Typography>Category : {selectedCourse.category}</Typography>
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Manage</Typography>

            {isTeacherOwner ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/courses/${courseId}/lessons/create`)}
              >
                + Create Lesson
              </Button>
            ) : (
              <Typography sx={{ color: theme.palette.text.secondary, mt: 2 }}>
                Only instructor can manage lessons
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
