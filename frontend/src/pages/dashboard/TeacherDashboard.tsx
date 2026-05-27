import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Chip,
  Stack,
  CircularProgress,
  alpha,
} from "@mui/material";

import {
  People,
  CheckCircleOutlined,
  RateReview,
  ChevronRight,
  Notifications,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteCourseThunk,
  fetchMyCourses,
  publishCourseThunk,
  unpublishCourseThunk,
} from "../../features/course/courseThunks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { ICourse } from "../../types/courseTypes";
import Grid from "@mui/system/Grid";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  bannerBlue: "#0ea5e9",
};

const COURSE_ACCENTS = ["#0ea5e9", "#14b8a6", "#eab308", "#ec4899", "#6366f1"];

const getCourseColor = (index: number) =>
  COURSE_ACCENTS[index % COURSE_ACCENTS.length];

const getCourseInitial = (course: ICourse) =>
  course.title.trim().charAt(0).toUpperCase() || "C";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { myCourses, myCoursesMeta, loading, error } = useAppSelector(
    (state) => state.course,
  );

  const courses = Array.isArray(myCourses) ? myCourses : [];
  const publishedCourses = courses.filter((course) => course.isPublished);
  const draftCourses = courses.filter((course) => !course.isPublished);
  const totalEnrollments = courses.reduce(
    (sum, course) => sum + (course.enrollmentCount || 0),
    0,
  );
  const recentCourses = [...courses].slice(0, 3);
  const maxEnrollment = Math.max(
    ...courses.map((course) => course.enrollmentCount || 0),
    1,
  );

  const categoryCount = new Map<string, number>();
  courses.forEach((course) => {
    const key = course.category?.trim() || "Uncategorized";
    categoryCount.set(key, (categoryCount.get(key) || 0) + 1);
  });

  const categoryData = Array.from(categoryCount.entries()).slice(0, 5);
  const topCourses = [...courses]
    .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
    .slice(0, 4);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  const handleTogglePublish = async (course: ICourse) => {
    try {
      if (course.isPublished) {
        await dispatch(unpublishCourseThunk(course._id)).unwrap();
        showToast("Course moved to draft!", "success");
      } else {
        await dispatch(publishCourseThunk(course._id)).unwrap();
        showToast("Course published successfully!", "success");
      }
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Failed to update course status!";

      showToast(message, "error");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await dispatch(deleteCourseThunk(courseId)).unwrap();
      showToast("Course deleted successfully", "success");
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Failed to update course status";

      showToast(message, "error");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: COLORS.textMain }}
        >
          Teacher Command Center
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${COLORS.bannerBlue} 0%, #0369a1 100%)`,
              color: "#ffffff",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box sx={{ maxWidth: { md: "70%" } }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, fontSize: "1.8rem" }}
              >
                Hello, {user?.name || "Instructor"}!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                {courses.length === 0
                  ? "Your teaching workspace is ready. Start by creating your first course."
                  : `You are managing ${courses.length} course${courses.length > 1 ? "s" : ""} from one dashboard.`}
              </Typography>
              <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <People sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", fontWeight: 600 }}
                    >
                      Total Enrolled
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {totalEnrollments} Students
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <CheckCircleOutlined sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", fontWeight: 600 }}
                    >
                      Published Courses
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {publishedCourses.length} Live
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: COLORS.textMain }}
                >
                  My Active Courses
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate("/courses")}
                  sx={{
                    color: COLORS.textSub,
                    textTransform: "none",
                    fontSize: "12px",
                  }}
                >
                  Manage All
                </Button>
              </Box>

              {loading ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "#fff",
                  }}
                >
                  <CircularProgress size={22} />
                  <Typography>Loading courses...</Typography>
                </Paper>
              ) : error ? (
                <Paper
                  elevation={0}
                  sx={{ p: 3, borderRadius: "16px", bgcolor: "#fff1f2" }}
                >
                  <Typography color="error">{error}</Typography>
                </Paper>
              ) : courses.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "16px",
                    textAlign: "center",
                    bgcolor: "#fff",
                    border: "2px dashed #dbeafe",
                  }}
                >
                  <RateReview
                    sx={{
                      fontSize: 60,
                      color: COLORS.primary,
                      mb: 1,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: COLORS.textMain,
                      mb: 1,
                    }}
                  >
                    No Courses Yet
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: COLORS.textSub,
                      mb: 3,
                    }}
                  >
                    Start creating your first course for students.
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => navigate("/teacher/create-course")}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    Create Course
                  </Button>
                </Paper>
              ) : (
                // <>
                //   <Paper
                //     elevation={0}
                //     onClick={() => navigate("/teacher/create-course")}
                //     sx={{
                //       p: 2,
                //       borderRadius: "12px",
                //       mb: 2,
                //       display: "flex",
                //       alignItems: "center",
                //       gap: 2,
                //       cursor: "pointer",
                //       border: "2px dashed #bfdbfe",
                //       bgcolor: "#f8fbff",
                //       transition: "0.2s",
                //       "&:hover": {
                //         bgcolor: "#eef6ff",
                //         transform: "translateY(-2px)",
                //       },
                //     }}
                //   >
                //     <RateReview
                //       sx={{
                //         fontSize: 34,
                //         color: COLORS.primary,
                //       }}
                //     />

                //     <Box>
                //       <Typography
                //         variant="subtitle2"
                //         sx={{
                //           fontWeight: 700,
                //           color: COLORS.textMain,
                //         }}
                //       >
                //         Create New Course
                //       </Typography>

                //       <Typography
                //         variant="caption"
                //         sx={{
                //           color: COLORS.textSub,
                //         }}
                //       >
                //         Add a new learning program
                //       </Typography>
                //     </Box>
                //   </Paper>

                //   {courses.map((course, index) => (
                //     <Paper
                //       key={course._id}
                //       elevation={0}
                //       sx={{
                //         p: 1.75,
                //         borderRadius: "12px",
                //         mb: 1.5,
                //         display: "flex",
                //         justifyContent: "space-between",
                //         gap: 2,
                //         bgcolor: "#fff",
                //       }}
                //     >
                //       <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
                //         <Avatar
                //           variant="rounded"
                //           sx={{
                //             width: 40,
                //             height: 40,
                //             borderRadius: "10px",
                //             bgcolor: getCourseColor(index),
                //             fontWeight: 700,
                //           }}
                //         >
                //           {getCourseInitial(course)}
                //         </Avatar>

                //         <Box sx={{ width: "100%" }}>
                //           <Typography
                //             variant="subtitle2"
                //             sx={{ fontWeight: 600 }}
                //           >
                //             {course.title}
                //           </Typography>

                //           <Stack
                //             direction="row"
                //             spacing={1}
                //             sx={{ mt: 0.5, mb: 0.75, flexWrap: "wrap" }}
                //           >
                //             {course.category ? (
                //               <Chip
                //                 size="small"
                //                 label={course.category}
                //                 sx={{ height: 22 }}
                //               />
                //             ) : null}
                //             <Chip
                //               size="small"
                //               label={course.isPublished ? "Published" : "Draft"}
                //               color={course.isPublished ? "success" : "default"}
                //               variant={
                //                 course.isPublished ? "filled" : "outlined"
                //               }
                //               sx={{ height: 22 }}
                //             />
                //           </Stack>

                //           <Typography
                //             variant="caption"
                //             sx={{ display: "block", color: COLORS.textSub }}
                //           >
                //             {course.enrollmentCount || 0} students enrolled
                //           </Typography>
                //         </Box>
                //       </Box>

                //       <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
                //         <Button
                //           size="small"
                //           onClick={() => navigate(`/course/${course._id}`)}
                //         >
                //           View
                //         </Button>
                //         <Button
                //           size="small"
                //           onClick={() => handleTogglePublish(course)}
                //         >
                //           {course.isPublished ? "Unpublish" : "Publish"}
                //         </Button>
                //         <Button
                //           size="small"
                //           color="error"
                //           onClick={() => handleDeleteCourse(course._id)}
                //         >
                //           Delete
                //         </Button>
                //       </Stack>
                //     </Paper>
                //   ))}
                // </>
                <>
                  {/* ================= PRESERVED CREATE COURSE TRIGGER ================= */}
                  <Paper
                    elevation={0}
                    onClick={() => navigate("/teacher/create-course")}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                      border: "2px dashed #bfdbfe",
                      bgcolor: "#f8fbff",
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: "#eef6ff",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <RateReview
                      sx={{
                        fontSize: 34,
                        color: COLORS.primary,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: COLORS.textMain,
                        }}
                      >
                        Create New Course
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: COLORS.textSub,
                        }}
                      >
                        Add a new learning program
                      </Typography>
                    </Box>
                  </Paper>

                  {/* ================= PREMIUM FIXED SCROLL VIEWPORT WRAPPER ================= */}
                  <Box
                    sx={{
                      maxHeight: "380px", // Clamps the vertical layout height perfectly
                      overflowY: "auto",
                      pr: 0.5, // Padding buffer prevents layout shift when scrollbar activates
                      display: "flex",
                      flexDirection: "column",
                      // High-End Custom Scrollbar Styling
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: alpha(COLORS.textSub, 0.2),
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: alpha(COLORS.textSub, 0.4),
                      },
                    }}
                  >
                    {courses.map((course, index) => (
                      <Paper
                        key={course._id}
                        elevation={0}
                        sx={{
                          p: 1.75,
                          borderRadius: "12px",
                          mb: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                          bgcolor: "#fff",
                          border: "1px solid #e2e8f0", // Subtle containment outline
                          "&:last-child": {
                            mb: 0, // Cleans trailing margin at the bottom of scroll block
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            width: "100%",
                            minWidth: 0,
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "10px",
                              bgcolor: getCourseColor(index),
                              fontWeight: 700,
                              flexShrink: 0, // Prevents layout crushing during flex distributions
                            }}
                          >
                            {getCourseInitial(course)}
                          </Avatar>

                          <Box sx={{ width: "100%", minWidth: 0 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis", // Elegant title protection truncation
                              }}
                            >
                              {course.title}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mt: 0.5, mb: 0.75, flexWrap: "wrap" }}
                            >
                              {course.category ? (
                                <Chip
                                  size="small"
                                  label={course.category}
                                  sx={{ height: 22 }}
                                />
                              ) : null}
                              <Chip
                                size="small"
                                label={
                                  course.isPublished ? "Published" : "Draft"
                                }
                                color={
                                  course.isPublished ? "success" : "default"
                                }
                                variant={
                                  course.isPublished ? "filled" : "outlined"
                                }
                                sx={{ height: 22 }}
                              />
                            </Stack>

                            <Typography
                              variant="caption"
                              sx={{ display: "block", color: COLORS.textSub }}
                            >
                              {course.enrollmentCount || 0} students enrolled
                            </Typography>
                          </Box>
                        </Box>

                        <Stack
                          spacing={1}
                          sx={{ alignItems: "flex-end", flexShrink: 0 }}
                        >
                          <Button
                            size="small"
                            onClick={() => navigate(`/course/${course._id}`)}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleTogglePublish(course)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              color: COLORS.textSub,
                            }}
                          >
                            {course.isPublished ? "Unpublish" : "Publish"}
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleDeleteCourse(course._id)}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Paper>
                    ))}
                  </Box>
                </>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}
              >
                Course Publishing Overview
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  mb: 2,
                  bgcolor: COLORS.cardBg,
                  height: "135px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: COLORS.textMain }}
                  >
                    Weekly Grading Metrics
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.textSub, display: "block" }}
                  >
                    Published vs draft distribution across your courses
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 50,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    borderBottom: "1px solid #e2e8f0",
                    pb: 0.5,
                  }}
                >
                  {(courses.length > 0
                    ? courses
                        .slice(0, 5)
                        .map((course) =>
                          Math.max(
                            20,
                            Math.round(
                              ((course.enrollmentCount || 0) / maxEnrollment) *
                                100,
                            ),
                          ),
                        )
                    : [20, 35, 25, 45, 30]
                  ).map((val, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: `${val}%`,
                        width: "100%",
                        bgcolor:
                          index === 2 && courses.length > 0
                            ? COLORS.primary
                            : "#e2e8f0",
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      bgcolor: "#ef4444",
                      color: "#ffffff",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {draftCourses.length} Drafts
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}
                    >
                      Ready to refine
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      bgcolor: "#22c55e",
                      color: "#ffffff",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {myCoursesMeta?.total || courses.length} Courses
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}
                    >
                      In your library
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: COLORS.cardBg,
                  height: "180px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: COLORS.textMain, mb: 1 }}
                >
                  Average Score Spectrum per Course
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    height: 110,
                    pt: 1,
                  }}
                >
                  {(courses.length > 0
                    ? courses
                        .slice(0, 5)
                        .map((course) =>
                          Math.max(
                            20,
                            Math.round(
                              ((course.enrollmentCount || 0) / maxEnrollment) *
                                100,
                            ),
                          ),
                        )
                    : [20, 35, 25, 45, 30]
                  ).map((val, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: `${val}%`,
                        width: "12%",
                        bgcolor: getCourseColor(index),
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: COLORS.cardBg,
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.textMain,
                    width: "100%",
                  }}
                >
                  Course Engagement
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    border: "8px solid #edf2f9",
                    borderRightColor: COLORS.primary,
                    borderTopColor: COLORS.primary,
                    borderBottomColor: COLORS.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {courses.length === 0
                      ? "0%"
                      : `${Math.round(
                          (publishedCourses.length / courses.length) * 100,
                        )}%`}
                  </Typography>
                </Box>
                <Box />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: COLORS.cardBg,
                  height: "180px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: COLORS.textMain }}
                >
                  Student Dropouts
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#ef4444", display: "block", mb: 1 }}
                >
                  {draftCourses.length} course
                  {draftCourses.length === 1 ? "" : "s"} still offline
                </Typography>
                <Box
                  sx={{
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: "1px dashed #e2e8f0",
                  }}
                >
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                    Publish drafts when you are ready
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              mb: 3,
              bgcolor: COLORS.cardBg,
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}
            >
              Ready to construct new materials?
            </Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<RateReview />}
              onClick={() => navigate("/teacher/create-course")}
              disableElevation
              sx={{
                bgcolor: COLORS.primary,
                color: "#ffffff",
                borderRadius: "8px",
                py: 1,
                fontWeight: 600,
                textTransform: "none",
                mb: 2.5,
              }}
            >
              Add New Assignment
            </Button>
            <Grid
              container
              spacing={1}
              sx={{ pt: 1.5, borderTop: "1px solid #edf2f9" }}
            >
              <Grid size={{ xs: 6 }} sx={{ borderRight: "1px solid #edf2f9" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.textSub,
                    display: "block",
                    fontSize: "10px",
                  }}
                >
                  Active Exams
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: COLORS.textMain }}
                >
                  {publishedCourses.length}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.textSub,
                    display: "block",
                    fontSize: "10px",
                  }}
                >
                  Draft Courses
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: COLORS.textMain }}
                >
                  {draftCourses.length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={0}
            sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, mb: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: COLORS.textMain }}
              >
                Recent Courses
              </Typography>
              <Button
                size="small"
                onClick={() => navigate("/courses")}
                sx={{
                  color: COLORS.primary,
                  textTransform: "none",
                  fontSize: "11px",
                }}
              >
                Review Queue
              </Button>
            </Box>
            <List disablePadding>
              {(recentCourses.length > 0
                ? recentCourses.map((course) => ({
                    name: course.title,
                    desc: course.category || "Uncategorized course",
                    img: getCourseInitial(course),
                    published: course.isPublished,
                    courseId: course._id,
                  }))
                : [
                    {
                      name: "No recent course activity",
                      desc: "Create a course to populate this area",
                      img: "+",
                      published: false,
                      courseId: "",
                    },
                  ]
              ).map((course, index) => (
                <ListItem
                  key={`${course.name}-${index}`}
                  disablePadding
                  sx={{ mb: 1.5, "&:last-child": { mb: 0 } }}
                  secondaryAction={
                    <Button
                      size="small"
                      variant="text"
                      disabled={!course.courseId}
                      onClick={() =>
                        course.courseId
                          ? navigate(`/course/${course.courseId}`)
                          : navigate("/teacher/create-course")
                      }
                      sx={{
                        color: "#0ea5e9",
                        fontSize: "10px",
                        textTransform: "none",
                        fontWeight: 700,
                        bgcolor: "#e0f2fe",
                        px: 1,
                      }}
                    >
                      {course.published ? "Open" : "Edit"}
                    </Button>
                  }
                >
                  <ListItemAvatar sx={{ minWidth: "36px" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#f1f5f9",
                        color: COLORS.textMain,
                        fontSize: "14px",
                        width: 28,
                        height: 28,
                      }}
                    >
                      {course.img}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "12px",
                          color: COLORS.textMain,
                        }}
                      >
                        {course.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: COLORS.textSub,
                          fontSize: "10px",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "90px",
                        }}
                      >
                        {course.desc}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: COLORS.textMain }}
              >
                Course Enrollment Ratios
              </Typography>
              <Button
                size="small"
                onClick={() => navigate("/courses")}
                sx={{
                  color: COLORS.primary,
                  textTransform: "none",
                  fontSize: "11px",
                }}
              >
                View All
              </Button>
            </Box>
            {(topCourses.length > 0
              ? topCourses.map((course, index) => ({
                  label: course.title,
                  value: Math.max(
                    12,
                    Math.round(
                      ((course.enrollmentCount || 0) / maxEnrollment) * 100,
                    ),
                  ),
                  user: `${course.enrollmentCount || 0} Active`,
                  color: getCourseColor(index),
                }))
              : [
                  {
                    label: "No courses yet",
                    value: 10,
                    user: "0 Active",
                    color: "#cbd5e1",
                  },
                ]
            ).map((row, index) => (
              <Box
                key={`${row.label}-${index}`}
                sx={{ mb: 2, "&:last-child": { mb: 0 } }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: COLORS.textMain }}
                  >
                    {row.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub }}>
                    {row.user}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={row.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#f1f5f9",
                    "& .MuiLinearProgress-bar": { bgcolor: row.color },
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: COLORS.textMain }}
              >
                Latest Course Activity
              </Typography>
              <Button
                size="small"
                onClick={() => navigate("/courses")}
                sx={{
                  color: COLORS.primary,
                  textTransform: "none",
                  fontSize: "11px",
                }}
              >
                View All
              </Button>
            </Box>
            {(recentCourses.length > 0
              ? recentCourses.map((course, index) => ({
                  title: course.title,
                  meta: `Created: ${new Date(
                    course.createdAt,
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`,
                  icon: getCourseInitial(course),
                  color: getCourseColor(index),
                  courseId: course._id,
                }))
              : [
                  {
                    title: "Plan your first course",
                    meta: "Start with title, category, and description",
                    icon: "+",
                    color: "#94a3b8",
                    courseId: "",
                  },
                ]
            ).map((course, index) => (
              <Paper
                key={`${course.title}-${index}`}
                elevation={0}
                sx={{
                  p: 1.2,
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #f1f5f9",
                  borderRadius: "12px",
                  "&:last-child": { mb: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: course.color,
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                    }}
                  >
                    {course.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "13px",
                        color: COLORS.textMain,
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: COLORS.textSub }}
                    >
                      {course.meta}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={() =>
                    course.courseId
                      ? navigate(`/course/${course.courseId}`)
                      : navigate("/teacher/create-course")
                  }
                >
                  <ChevronRight sx={{ fontSize: 18 }} />
                </IconButton>
              </Paper>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: COLORS.cardBg,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}
            >
              Teacher Notice board
            </Typography>
            <List disablePadding sx={{ flexGrow: 1 }}>
              {(categoryData.length > 0
                ? categoryData.map(([category, count], index) => ({
                    title: category,
                    time: `${count} course${count > 1 ? "s" : ""}`,
                    desc: `Category cluster with ${count} course${count > 1 ? "s" : ""} in your dashboard.`,
                    color: getCourseColor(index),
                  }))
                : [
                    {
                      title: "Course categories will appear here",
                      time: "0 courses",
                      desc: "As you create courses, this board becomes a quick category overview.",
                      color: "#94a3b8",
                    },
                  ]
              ).map((notice, index) => (
                <ListItem
                  key={`${notice.title}-${index}`}
                  disablePadding
                  sx={{ alignItems: "flex-start", mb: 2 }}
                >
                  <ListItemAvatar sx={{ minWidth: 42 }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: `${notice.color}15`,
                        color: notice.color,
                        width: 32,
                        height: 32,
                        borderRadius: "6px",
                      }}
                    >
                      <Notifications sx={{ fontSize: 16 }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: "13px",
                            color: COLORS.textMain,
                          }}
                        >
                          {notice.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: COLORS.textSub, fontSize: "10px" }}
                        >
                          {notice.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: COLORS.textSub,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {notice.desc}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              fullWidth
              size="small"
              onClick={() => navigate("/teacher/create-course")}
              sx={{
                mt: 1,
                bgcolor: "#edf5ff",
                color: COLORS.primary,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                py: 1,
              }}
            >
              Create another course
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
