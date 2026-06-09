import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  alpha,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCourseThunk, fetchCourseById } from "../../features/course/courseThunks";
import { enrollInCourseThunk, fetchMyEnrollments } from "../../features/enrollment/enrollmentThunks";
import { fetchLessonsByCourse, deleteLessonThunk } from "../../features/lesson/lessonThunks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";
import { IEnrollment } from "../../types/enrollmentTypes";
import { showToast } from "../../utils/toast";
import CourseAssignmentsSection from "../../components/assignment/CourseAssignmentsSection";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#0f172a",
  textSub: "#64748b",
  border: "#e2e8f0",
};

const fadeInUp = {
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(16px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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

const getEnrollmentCourseId = (enrollment: IEnrollment) => {
  if (typeof enrollment.courseId === "object") {
    return enrollment.courseId._id;
  }

  return enrollment.courseId;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
};

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isStudent } = useAuth();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"review" | "processing" | "completed">("review");
  const { selectedCourse, loading } = useAppSelector((s) => s.course);
  const { courseLessons, error: lessonError } = useAppSelector((s) => s.lesson);
  const { myEnrollments, loading: enrollmentLoading } = useAppSelector((s) => s.enrollment);

  useEffect(() => {
    if (!courseId) return;
    dispatch(fetchCourseById(courseId));
    dispatch(fetchLessonsByCourse(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (isAuthenticated && isStudent) {
      dispatch(fetchMyEnrollments());
    }
  }, [dispatch, isAuthenticated, isStudent]);

  const lessons = useMemo(
    () => [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order)),
    [courseLessons]
  );

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

  const handleDeleteLesson = async (lessonId: string) => {
    await dispatch(deleteLessonThunk(lessonId));
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await dispatch(deleteCourseThunk(courseId)).unwrap();
      showToast("Course deleted successfully", "success");
      navigate("/courses");
    } catch (err) {
      showToast(getErrorMessage(err, "Failed to delete course"), "error");
    }
  };

  const openPaymentDialog = () => {
    if (isAlreadyEnrolled) {
      showToast("You are already enrolled in this course", "info");
      return;
    }

    setPaymentStep("review");
    setPaymentOpen(true);
  };

  const handleDummyPayment = () => {
    if (!courseId) return;

    setPaymentStep("processing");

    window.setTimeout(async () => {
      try {
        await dispatch(enrollInCourseThunk({ courseId })).unwrap();
        await dispatch(fetchMyEnrollments()).unwrap();
        setPaymentStep("completed");
        showToast("Payment completed and course enrolled", "success");
      } catch (err) {
        setPaymentStep("review");
        showToast(getErrorMessage(err, "Enrollment failed"), "error");
      }
    }, 700);
  };

  if (loading && !selectedCourse) {
    return (
      <Box sx={{ display: "flex", p: 6, justifyContent: "center", bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
        <Typography sx={{ color: COLORS.textSub, fontWeight: 600 }}>
          Syncing course configuration...
        </Typography>
      </Box>
    );
  }

  if (!selectedCourse) {
    return (
      <Box sx={{ display: "flex", p: 6, justifyContent: "center", bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
        <Typography sx={{ color: COLORS.textSub, fontWeight: 600 }}>
          Requested curriculum parameters not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight, p: { xs: 2, md: 4 }, ...fadeInUp }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          mb: 4,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 10px 30px rgba(30, 41, 59, 0.04)",
        }}
      >
        <Box
          sx={{
            minHeight: { xs: 360, md: 420 },
            position: "relative",
            backgroundImage: selectedCourse.thumbnail
              ? `url(${selectedCourse.thumbnail})`
              : "linear-gradient(135deg, #770cea, #00a3ff, #0f172a)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: 360, md: 420 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  size="small"
                  label={selectedCourse.isPublished ? "Live" : "Draft"}
                  sx={{
                    bgcolor: selectedCourse.isPublished ? "#dcfce7" : "#f1f5f9",
                    color: selectedCourse.isPublished ? "#15803d" : COLORS.textSub,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                />
                <Chip
                  size="small"
                  label={selectedCourse.category || "Uncategorized"}
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }}
                />
                <Chip
                  size="small"
                  label={selectedCourse.level || "All Levels"}
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }}
                />
              </Stack>

              <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center">
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => navigate("/courses")}
                  sx={{ color: "#fff", textTransform: "none", fontWeight: 600 }}
                >
                  Back
                </Button>

                {isAuthenticated && isStudent && (
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={openPaymentDialog}
                    disabled={enrollmentLoading || isAlreadyEnrolled}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 3,
                      bgcolor: COLORS.primary,
                      "&:hover": { bgcolor: "#0092e4" },
                    }}
                  >
                    {isAlreadyEnrolled ? "Enrolled" : "Enroll Now"}
                  </Button>
                )}

                {isTeacherOwner && (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      disableElevation
                      startIcon={<EditRoundedIcon />}
                      onClick={() => navigate(`/courses/${courseId}/edit`)}
                      sx={{
                        bgcolor: "#ffffff",
                        color: COLORS.textMain,
                        fontWeight: 700,
                        borderRadius: "12px",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#f1f5f9" },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => handleDeleteCourse(selectedCourse._id)}
                      sx={{
                        color: "#f87171",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "rgba(248, 113, 113, 0.08)" },
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>

            <Box sx={{ mt: { xs: 3, md: 0 } }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  mb: 1,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                }}
              >
                {selectedCourse.title}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(241, 245, 249, 0.8)",
                  maxWidth: 720,
                  lineHeight: 1.5,
                  fontSize: "0.95rem",
                }}
              >
                {selectedCourse.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                gap: 2,
                mt: 3,
              }}
            >
              {[
                {
                  label: "Instructor",
                  value: teacherName,
                  icon: <SchoolRoundedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  label: "Total Lessons",
                  value: `${lessons.length} Chapters`,
                  icon: <AutoStoriesRoundedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  label: "Learners Enrolled",
                  value: selectedCourse.enrollmentCount || 0,
                  icon: <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />,
                },
                {
                  label: "Program Value",
                  value: selectedCourse.price ? `Rs. ${selectedCourse.price}` : "Free Track",
                  icon: <LocalAtmRoundedIcon sx={{ fontSize: 18 }} />,
                },
              ].map((metric, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.75,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ color: COLORS.primary, display: "flex" }}>{metric.icon}</Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        opacity: 0.75,
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {metric.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2.2fr 0.8fr" },
          gap: 3,
        }}
      >
        <Box sx={{ display: "grid", gap: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: "20px",
              border: `1px solid ${COLORS.border}`,
              bgcolor: COLORS.cardBg,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2, flexWrap: "wrap" }}>
              <Typography variant="h6" fontWeight={800} color={COLORS.textMain}>
                Course Outline
              </Typography>
              <Chip
                icon={<AutoStoriesRoundedIcon sx={{ fontSize: 14, color: COLORS.primary }} />}
                label={`${lessons.length} Modules`}
                sx={{
                  fontWeight: 700,
                  bgcolor: alpha(COLORS.primary, 0.08),
                  color: COLORS.primary,
                }}
              />
            </Box>

            {lessonError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                {lessonError}
              </Alert>
            )}

            {lessons.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center", border: `2px dashed ${COLORS.border}`, borderRadius: "16px" }}>
                <Typography sx={{ color: COLORS.textSub, fontWeight: 500 }}>
                  No lecture modules compiled for this track yet.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {lessons.map((lesson, i) => (
                  <Paper
                    key={lesson._id}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: `1px solid ${COLORS.border}`,
                      bgcolor: "#f8fafc",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "#ffffff",
                        borderColor: alpha(COLORS.primary, 0.3),
                        boxShadow: "0 6px 16px rgba(0,0,0,0.02)",
                      },
                    }}
                  >
                    <Box>
                      <Typography fontWeight={700} color={COLORS.textMain} sx={{ fontSize: "0.95rem" }}>
                        {String(i + 1).padStart(2, "0")}. {lesson.title}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip
                          size="small"
                          label={lesson.type}
                          sx={{ fontWeight: 600, height: 20, fontSize: "0.7rem", bgcolor: COLORS.border }}
                        />
                        {lesson.isPreview && (
                          <Chip
                            size="small"
                            label="Free Preview"
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 700, height: 20, fontSize: "0.7rem" }}
                          />
                        )}
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button
                        onClick={() => navigate(`/lesson/${lesson._id}`)}
                        variant="contained"
                        disableElevation
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          textTransform: "none",
                          fontWeight: 700,
                          bgcolor: alpha(COLORS.primary, 0.1),
                          color: COLORS.primary,
                          "&:hover": { bgcolor: COLORS.primary, color: "#fff" },
                        }}
                      >
                        Open
                      </Button>
                      {isTeacherOwner && (
                        <Button
                          onClick={() => handleDeleteLesson(lesson._id)}
                          color="error"
                          size="small"
                          sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                          Delete
                        </Button>
                      )}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>

          {courseId && (
            <CourseAssignmentsSection
              courseId={courseId}
              canManage={Boolean(isTeacherOwner)}
              canSubmit={Boolean(isAuthenticated && isStudent)}
            />
          )}
        </Box>

        <Stack spacing={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.cardBg }}>
            <Typography fontWeight={800} color={COLORS.textMain} sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <InfoOutlinedIcon sx={{ fontSize: 18, color: COLORS.primary }} />
              Classification
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color={COLORS.textSub} fontWeight={500}>
                  Target Level:
                </Typography>
                <Typography variant="body2" color={COLORS.textMain} fontWeight={700}>
                  {selectedCourse.level || "Beginner"}
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color={COLORS.textSub} fontWeight={500}>
                  Category Tag:
                </Typography>
                <Typography variant="body2" color={COLORS.textMain} fontWeight={700}>
                  {selectedCourse.category || "General"}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.cardBg }}>
            <Typography fontWeight={800} color={COLORS.textMain} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SecurityRoundedIcon sx={{ fontSize: 18, color: isTeacherOwner ? "#22c55e" : COLORS.textSub }} />
              Operations Panel
            </Typography>
            {isTeacherOwner ? (
              <Button
                fullWidth
                variant="contained"
                disableElevation
                startIcon={<AddRoundedIcon />}
                onClick={() => navigate(`/courses/${courseId}/lessons/create`)}
                sx={{
                  py: 1.25,
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  bgcolor: COLORS.primary,
                  color: "white",
                  "&:hover": { bgcolor: "#0092e4" },
                }}
              >
                Create Lesson
              </Button>
            ) : (
              <Typography variant="body2" sx={{ color: COLORS.textSub, fontWeight: 500, lineHeight: 1.4 }}>
                Write privileges locked. Only assigned profile coordinators can deploy modules to this directory.
              </Typography>
            )}
          </Paper>
        </Stack>
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
              <Button onClick={() => setPaymentOpen(false)} disabled={paymentStep === "processing"}>
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
