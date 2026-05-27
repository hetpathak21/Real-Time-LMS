import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Chip, Paper, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCourseThunk, fetchCourseById } from "../../features/course/courseThunks";
import {
  fetchLessonsByCourse,
  deleteLessonThunk,
} from "../../features/lesson/lessonThunks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";
import { showToast } from "../../utils/toast";

const COLORS = {
  bgLight: "#f4f7fd",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
};

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

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await dispatch(deleteCourseThunk(courseId)).unwrap();
      showToast("Course deleted successfully", "success");
      navigate("/courses");
    } catch (err: any) {
      showToast(err || "Failed to delete course", "error");
    }
  };

  if (loading && !selectedCourse) {
    return (
      <Typography sx={{ color: COLORS.textSub }}>Loading course...</Typography>
    );
  }

  if (!selectedCourse) {
    return (
      <Typography sx={{ color: COLORS.textSub }}>No course found</Typography>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight, p: 3 }}>
      {/* HERO */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 3,
          border: "1px solid #e2e8f0",
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
                  sx={{ bgcolor: "#fff", fontWeight: 700 }}
                />
                <Chip label={selectedCourse.category} sx={{ color: "#fff" }} />
                <Chip label={selectedCourse.level} sx={{ color: "#fff" }} />
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
                    onClick={() => console.log("Enroll course:", courseId)}
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
                  <>
                    <Button
                      startIcon={<EditRoundedIcon />}
                      onClick={() => navigate(`/courses/${courseId}/edit`)}
                      sx={{ bgcolor: "#fff", color: "#000" }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => handleDeleteCourse(selectedCourse._id)}
                      sx={{
                        color: "#ef4444",
                        "&:hover": {
                          bgcolor: "rgba(239, 68, 68, 0.08)",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            {/* TITLE */}
            <Box>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800 }}>
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
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 2,
              }}
            >
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Instructor: {teacherName}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Lessons: {lessons.length}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Enrolled: {selectedCourse.enrollmentCount || 0}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
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
            <Typography fontWeight={800}>Course Lessons</Typography>

            <Chip
              icon={<AutoStoriesRoundedIcon />}
              label={`${lessons.length} lessons`}
            />
          </Box>

          {lessonError && <Alert severity="error">{lessonError}</Alert>}

          {lessons.length === 0 ? (
            <Typography sx={{ color: "#64748b" }}>No lessons yet</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {lessons.map((lesson, i) => (
                <Paper
                  key={lesson._id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Box>
                    <Typography fontWeight={700}>
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
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={800}>Course Snapshot</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography>Level: {selectedCourse.level}</Typography>
              <Typography>Category: {selectedCourse.category}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={800}>Manage</Typography>

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
              <Typography sx={{ color: "#64748b", mt: 2 }}>
                Only instructor can manage lessons
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}