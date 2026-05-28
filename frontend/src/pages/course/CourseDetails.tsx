import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";

import {
  deleteCourseThunk,
  fetchCourseById,
} from "../../features/course/courseThunks";

import {
  fetchLessonsByCourse,
  deleteLessonThunk,
} from "../../features/lesson/lessonThunks";

import { showToast } from "../../utils/toast";
import CourseAssignmentsSection from "../../components/assignment/CourseAssignmentsSection";

/**
 * Teacher name helper
 */
const getCourseTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"],
) => {
  if (typeof instructor === "object") return instructor?.name || "Instructor";

  if (typeof teacherId === "object") return teacherId?.name || "Instructor";

  if (typeof instructor === "string") return instructor;

  return "Instructor";
};

const getEnrollmentCourseId = (enrollment: IEnrollment) => {
  if (typeof enrollment.courseId === "object") {
    return enrollment.courseId._id;
  }

  return enrollment.courseId;
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { user, isAuthenticated, isStudent } = useAuth();

  const { selectedCourse, loading } = useAppSelector((s) => s.course);

  const { courseLessons, error: lessonError } = useAppSelector((s) => s.lesson);

  /**
   * Fetch data
   */
  useEffect(() => {
    if (!courseId) return;

    dispatch(fetchCourseById(courseId));
    dispatch(fetchLessonsByCourse(courseId));
  }, [courseId, dispatch]);

  /**
   * Sorted lessons
   */
  const lessons = useMemo(() => {
    return [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order));
  }, [courseLessons]);

  /**
   * Ownership check
   */
  const isTeacherOwner =
    user?.role === "teacher" &&
    selectedCourse?.teacherId &&
    user._id ===
      (typeof selectedCourse.teacherId === "object"
        ? selectedCourse.teacherId._id
        : selectedCourse.teacherId);

  const isAlreadyEnrolled = useMemo(
    () =>
      Boolean(
        courseId &&
          myEnrollments.some(
            (enrollment) => getEnrollmentCourseId(enrollment) === courseId
          )
      ),
    [courseId, myEnrollments]
  );

  const teacherName = getCourseTeacherName(
    selectedCourse?.teacherId,
    selectedCourse?.instructor,
  );

  /**
   * Delete lesson
   */
  const handleDeleteLesson = async (lessonId: string) => {
    await dispatch(deleteLessonThunk(lessonId));
  };

  /**
   * Delete course
   */
  const handleDeleteCourse = async () => {
    if (!courseId) return;

    try {
      await dispatch(deleteCourseThunk(courseId)).unwrap();

      showToast("Course deleted successfully", "success");

      navigate("/courses");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete course";

      showToast(message, "error");
    }
  };

  /**
   * Loading state
   */
  if (loading && !selectedCourse) {
    return (
      <Typography sx={{ color: "text.primary" }}>Loading course...</Typography>
    );
  }

  if (!selectedCourse) {
    return (
      <Typography sx={{ color: "text.primary" }}>No course found</Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 3,
        boxSizing: "border-box",
      }}
    >
      {/* HERO */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            minHeight: { xs: 400, md: 360 },
            position: "relative",
            backgroundImage: selectedCourse.thumbnail
              ? `url(${selectedCourse.thumbnail})`
              : "linear-gradient(135deg, #770cea, #00a3ff, #0f172a)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.85))",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: { xs: 3, md: 4 },
              minHeight: { xs: 400, md: 360 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* TOP BAR */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Stack direction="row" spacing={1}>
                <Chip
                  label={selectedCourse.isPublished ? "Published" : "Draft"}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                />
                <Chip
                  label={selectedCourse.category}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                />
                <Chip
                  label={selectedCourse.level}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => navigate("/courses")}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Back
                </Button>

                {isAuthenticated && isStudent && (
                  <Button variant="contained">Enroll Now</Button>
                )}

                {isTeacherOwner && (
                  <Button
                    startIcon={<EditRoundedIcon />}
                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                    sx={{
                      bgcolor: "background.paper",
                    }}
                  >
                    Edit
                  </Button>
                )}

                {isTeacherOwner && (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={handleDeleteCourse}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </Box>

            {/* TITLE */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                {selectedCourse.title}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {selectedCourse.description}
              </Typography>
            </Box>

            {/* STATS */}
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
              <Paper sx={{ p: 2, color: "#fff" }}>
                Instructor: {teacherName}
              </Paper>
              <Paper sx={{ p: 2, color: "#fff" }}>
                Lessons: {lessons.length}
              </Paper>
              <Paper sx={{ p: 2, color: "#fff" }}>
                Enrolled: {selectedCourse.enrollmentCount || 0}
              </Paper>
              <Paper sx={{ p: 2, color: "#fff" }}>
                Price:{" "}
                {selectedCourse.price ? `Rs.${selectedCourse.price}` : "Free"}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* CONTENT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2.2fr 0.8fr",
          },
          gap: 3,
        }}
      >
        {/* LESSONS */}
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Course Lessons</Typography>

            <Chip
              icon={<AutoStoriesRoundedIcon />}
              label={`${lessons.length} Modules`}
            />
          </Box>

          {lessonError && <Alert severity="error">{lessonError}</Alert>}

          {lessons.map((lesson, i) => (
            <Paper key={lesson._id} sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>
                {i + 1}. {lesson.title}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button onClick={() => navigate(`/lesson/${lesson._id}`)}>
                  Open
                </Button>

                {isTeacherOwner && (
                  <Button
                    color="error"
                    onClick={() => handleDeleteLesson(lesson._id)}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </Paper>
          ))}
        </Paper>

        {/* SIDEBAR */}
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ fontWeight: 800 }}>Course Info</Typography>

          <Typography>Level: {selectedCourse.level}</Typography>
        </Paper>
      </Box>

      <Dialog
        open={paymentOpen}
        onClose={() => paymentStep !== "processing" && setPaymentOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {paymentStep === "completed" ? "Payment completed" : "Complete enrollment"}
        </DialogTitle>
        <DialogContent>
          {paymentStep === "processing" && (
            <Box sx={{ py: 2 }}>
              <Typography sx={{ color: COLORS.textSub, mb: 2 }}>
                Processing dummy payment...
              </Typography>
              <LinearProgress />
            </Box>
          )}

          {paymentStep === "completed" && (
            <Box sx={{ py: 1 }}>
              <Typography sx={{ color: COLORS.textMain, fontWeight: 700 }}>
                You are enrolled in {selectedCourse.title}.
              </Typography>
              <Typography variant="body2" sx={{ color: COLORS.textSub, mt: 1 }}>
                Payment completed successfully. This is a temporary dummy payment flow.
              </Typography>
            </Box>
          )}

          {paymentStep === "review" && (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Typography sx={{ color: COLORS.textSub }}>
                Review this temporary payment before enrolling.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  border: `1px solid ${COLORS.border}`,
                  bgcolor: "#f8fafc",
                }}
              >
                <Typography sx={{ fontWeight: 800, color: COLORS.textMain }}>
                  {selectedCourse.title}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                  Amount: {selectedCourse.price ? `Rs. ${selectedCourse.price}` : "Free"}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {paymentStep === "completed" ? (
            <Button variant="contained" onClick={() => setPaymentOpen(false)}>
              Continue
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setPaymentOpen(false)}
                disabled={paymentStep === "processing"}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDummyPayment}
                disabled={paymentStep === "processing"}
              >
                Pay Now
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
