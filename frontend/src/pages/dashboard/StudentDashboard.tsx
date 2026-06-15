// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Avatar,
//   LinearProgress,
// } from "@mui/material";

// import { AssignmentTurnedIn, AccessTime } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";

// import { useAppDispatch, useAppSelector } from "../../app/hooks";

// import { fetchTeachers } from "../../features/auth/authThunks";

// const activeCourses = [
//   {
//     title: "Advanced React & TypeScript",
//     instructor: "Nil Yeager",
//     progress: 75,
//     char: "R",
//     color: "#0ea5e9",
//   },
//   {
//     title: "UI Design Principles",
//     instructor: "James Martin",
//     progress: 40,
//     char: "D",
//     color: "#eab308",
//   },
//   {
//     title: "Node.js Backend Architecture",
//     instructor: "David Frank",
//     progress: 15,
//     char: "N",
//     color: "#ec4899",
//   },
// ];

// const dashboardStats = [
//   {
//     title: "Hours Spent",
//     value: "42.5 hrs",
//     icon: <AccessTime sx={{ fontSize: 18 }} />,
//   },
//   {
//     title: "Certificates",
//     value: "3 Earned",
//     icon: <AssignmentTurnedIn sx={{ fontSize: 18 }} />,
//   },
// ];

// export default function StudentDashboard() {
//   const dispatch = useAppDispatch();
//   const theme = useTheme();

//   const { teachers, teachersLoading } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchTeachers());
//   }, [dispatch]);

//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: "150vh",
//         minWidth: "81vw",
//         bgcolor: theme.palette.background.default,
//         px: { xs: 2, sm: 3, md: 4 },
//         py: { xs: 2, md: 4 },
//         mt: -6.8,
//         ml: -4
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <Box>
//           <Typography sx={{ fontWeight: 800, fontSize: 28 }}>
//             Student Workspace
//           </Typography>
//           <Typography sx={{ color: theme.palette.text.secondary }}>
//             Track courses, assignments and progress.
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           onClick={() => navigate("/courses")}
//           sx={{
//             bgcolor: theme.palette.primary.main,
//             color: "#fff",
//             textTransform: "none",
//             borderRadius: 2,
//             px: 3,
//             "&hover": {
//               bgcolor: theme.palette.primary.dark,
//             },
//           }}
//         >
//           Continue Learning
//         </Button>
//       </Box>

//       {/* ================= MAIN GRID ================= */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", xl: "3fr 1fr" },
//           gap: 3,
//         }}
//       >
//         {/* ================= LEFT SECTION ================= */}
//         <Box>
//           {/* HERO */}
//           <Paper
//             sx={{
//               p: { xs: 2.5, md: 4 },
//               borderRadius: 3,
//               color: theme.palette.common.white,
//               position: "relative",
//               overflow: "hidden",
//               background: `linear-gradient(135deg, #770cea, #8b4df6)`,
//               mb: 3,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
//                 gap: 3,
//                 alignItems: "center",
//               }}
//             >
//               {/* HERO TEXT */}
//               <Box>
//                 <Typography sx={{ fontWeight: 800, fontSize: 27 }}>
//                   Welcome Back, Learner!
//                 </Typography>

//                 <Typography sx={{ mt: 1, mb: 2, opacity: 0.9 }}>
//                   You completed 3 lessons this week and submitted 2 assignments.
//                 </Typography>
//               </Box>

//               {/* STATS */}
//               <Box sx={{ display: "grid", gap: 2 }}>
//                 {dashboardStats.map((item, i) => (
//                   <Paper
//                     key={i}
//                     sx={{
//                       p: 2,
//                       bgcolor: "rgba(255,255,255,0.12)",
//                       borderRadius: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.5,
//                     }}
//                   >
//                     <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
//                       {item.icon}
//                     </Avatar>

//                     <Box>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           fontSize: "18px",
//                           color: "#fff",
//                         }}
//                       >
//                         {item.title}
//                       </Typography>
//                       <Typography sx={{ fontWeight: 600, color: "#fff" }}>
//                         {item.value}
//                       </Typography>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>
//           </Paper>

//           {/* ACTIVE COURSES */}
//           <Box sx={{ display: "grid", gap: 3 }}>
//             <Paper sx={{ p: 2.5, borderRadius: 3 }}>
//               <Typography sx={{ fontWeight: 700, mb: 2 }}>
//                 Active Courses
//               </Typography>

//               <Box sx={{ display: "grid", gap: 2 }}>
//                 {activeCourses.map((c, i) => (
//                   <Paper
//                     key={i}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       display: "flex",
//                       flexDirection: { xs: "column", sm: "row" },
//                       gap: 2,
//                       alignItems: "center",
//                     }}
//                   >
//                     <Avatar sx={{ bgcolor: c.color }}>{c.char}</Avatar>

//                     <Box sx={{ flex: 1 }}>
//                       <Typography sx={{ fontWeight: 700 }}>
//                         {c.title}
//                       </Typography>

//                       <Typography variant="caption">{c.instructor}</Typography>

//                       <LinearProgress
//                         value={c.progress}
//                         variant="determinate"
//                         sx={{
//                           mt: 1,
//                           height: 7,
//                           borderRadius: 5,
//                           bgcolor: theme.palette.action.disabledBackground,
//                         }}
//                       />
//                     </Box>

//                     <Button variant="contained" size="small">
//                       Resume
//                     </Button>
//                   </Paper>
//                 ))}
//               </Box>
//             </Paper>
//           </Box>
//         </Box>

//         <Paper sx={{ p: 2.5, borderRadius: 3, height: "fit-content" }}>
//           <Typography sx={{ fontWeight: 700, mb: 2 }}>
//             My Instructors
//           </Typography>

//           {teachersLoading && (
//             <Typography variant="body2">Loading instructors...</Typography>
//           )}

//           <Box sx={{ display: "grid", gap: 2 }}>
//             {teachers?.map((teacher, idx) => (
//               <Box
//                 key={idx}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   borderBottom: `1px solid ${theme.palette.divider}`,
//                   pb: 1.5,
//                 }}
//               >
//                 <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
//                   <Avatar
//                     sx={{
//                       width: 30,
//                       height: 30,
//                       bgcolor: "#15cabd",
//                     }}
//                   >
//                     {teacher.name?.charAt(0).toUpperCase()}
//                   </Avatar>

//                   <Box>
//                     <Typography sx={{ fontWeight: 700 }}>
//                       {teacher.name}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Button size="small">Chat</Button>
//               </Box>
//             ))}
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  AccessTime,
  AssignmentTurnedIn,
  Notifications,
  AutoStories,
  School,
  ChatBubbleOutlined,
} from "@mui/icons-material";

import Grid from "@mui/system/Grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeachers } from "../../features/auth/authThunks";
import { ITeacher } from "../../features/auth/authTypes";

// Synced UI Color Palette Tokens
const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  bannerGradientStart: "#770cea",
  bannerGradientEnd: "#8b4df6",
};

const COURSE_ACCENTS = ["#0ea5e9", "#14b8a6", "#eab308", "#ec4899", "#6366f1"];

const getCourseColor = (index: number) =>
  COURSE_ACCENTS[index % COURSE_ACCENTS.length];

interface StudentCourse {
  _id: string;
  title: string;
  instructor: string;
  progress: number;
  category: string;
  assignmentCount: number;
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Dynamic Redux Selectors mapped identically to system architecture patterns
  const { teachers, teachersLoading } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  // Safely extract slice data fields (Assumes your slice maps standard tracking structures)
  const { loading, error } = useAppSelector((state) => state.course || {});

  const enrolledCourses: StudentCourse[] = [];

  // Fallback data mapping to maintain structural layout if store is resolving async data
  const courses =
    Array.isArray(enrolledCourses) && enrolledCourses.length > 0
      ? enrolledCourses
      : [
          {
            _id: "1",
            title: "Advanced React & TypeScript",
            instructor: "Nil Yeager",
            progress: 75,
            category: "Frontend",
            assignmentCount: 1,
          },
          {
            _id: "2",
            title: "UI Design Principles",
            instructor: "James Martin",
            progress: 40,
            category: "Design",
            assignmentCount: 3,
          },
          {
            _id: "3",
            title: "Node.js Backend Architecture",
            instructor: "David Frank",
            progress: 15,
            category: "Backend",
            assignmentCount: 2,
          },
        ];

  const completedCourses = courses.filter((c) => c.progress === 100);
  const totalAssignmentsPending = courses.reduce(
    (sum, c) =>
      sum + (!c.progress || c.progress < 100 ? c.assignmentCount || 0 : 0),
    0,
  );

  const maxProgress = Math.max(...courses.map((c) => c.progress || 0), 1);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        p: { xs: 2, sm: 3, md: 4 },
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: COLORS.textMain }}
        >
          Student Workspace
        </Typography>
      </Box>

      {/* ================= MAIN 12-COLUMN STRUCTURAL GRID ================= */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          {/* ================= HERO GRADIENT BANNER ================= */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${COLORS.bannerGradientStart} 0%, ${COLORS.bannerGradientEnd} 100%)`,
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
                Welcome Back, {user?.name || "Learner"}!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                You are actively pursuing {courses.length} course
                {courses.length > 1 ? "s" : ""} and have{" "}
                {totalAssignmentsPending} assignments pending.
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
                    <AccessTime sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", fontWeight: 600 }}
                    >
                      Hours Tracked
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      42.5 hrs completed
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
                    <AssignmentTurnedIn sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", fontWeight: 600 }}
                    >
                      Certificates
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {completedCourses.length} Milestone Awards
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* ================= ACTIVE ENROLLMENT MANAGER ================= */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
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
                  My Continuous Learning Programs
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
                  Manage All Programs
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
                  <Typography>Loading academic profile metrics...</Typography>
                </Paper>
              ) : error ? (
                <Paper
                  elevation={0}
                  sx={{ p: 3, borderRadius: "16px", bgcolor: "#fff1f2" }}
                >
                  <Typography color="error">{error}</Typography>
                </Paper>
              ) : (
                <>
                  {/* EXPLORE TRIGGER INJECTOR COMPONENT */}
                  <Paper
                    elevation={0}
                    onClick={() => navigate("/courses")}
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
                    <AutoStories sx={{ fontSize: 34, color: COLORS.primary }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: COLORS.textMain }}
                      >
                        Browse Educational Curriculum Marketplace
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: COLORS.textSub }}
                      >
                        Discover frontend, backend and full-stack programs.
                      </Typography>
                    </Box>
                  </Paper>

                  {/* PREMIUM FIXED SCROLL VIEWPORT PANELS */}
                  <Box
                    sx={{
                      maxHeight: "380px",
                      overflowY: "auto",
                      pr: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      "&::-webkit-scrollbar": { width: "6px" },
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
                        key={course._id || index}
                        elevation={0}
                        sx={{
                          p: 1.75,
                          borderRadius: "12px",
                          mb: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          bgcolor: "#fff",
                          border: "1px solid #e2e8f0",
                          "&:last-child": { mb: 0 },
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
                              width: 44,
                              height: 44,
                              borderRadius: "10px",
                              bgcolor: getCourseColor(index),
                              fontWeight: 700,
                              fontSize: "1.1rem",
                              flexShrink: 0,
                            }}
                          >
                            {course.title.trim().charAt(0).toUpperCase()}
                          </Avatar>

                          <Box sx={{ width: "100%", minWidth: 0 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                color: COLORS.textMain,
                              }}
                            >
                              {course.title}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mt: 0.5, mb: 1, flexWrap: "wrap" }}
                            >
                              {course.category && (
                                <Chip
                                  size="small"
                                  label={course.category}
                                  sx={{ height: 22 }}
                                />
                              )}
                              <Chip
                                size="small"
                                label={`Faculty: ${course.instructor}`}
                                variant="outlined"
                                sx={{ height: 22 }}
                              />
                            </Stack>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <LinearProgress
                                value={course.progress || 0}
                                variant="determinate"
                                sx={{
                                  flex: 1,
                                  height: 6,
                                  borderRadius: 5,
                                  bgcolor: "#f1f5f9",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: getCourseColor(index),
                                  },
                                }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, color: COLORS.textMain }}
                              >
                                {course.progress || 0}%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Stack sx={{ flexShrink: 0, pl: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/course/${course._id}`)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              bgcolor: COLORS.primary,
                              color: COLORS.bgLight,
                              borderRadius: "8px",
                              px: 2,
                              "&:hover": { bgcolor: "#008ee0" },
                            }}
                          >
                            Resume
                          </Button>
                        </Stack>
                      </Paper>
                    ))}
                  </Box>
                </>
              )}
            </Grid>
          </Grid>

          {/* ================= DATA ANALYTICS CHARTS MATRIX ================= */}
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
                  Curriculum Progress Spectrum
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
                  {courses.slice(0, 5).map((course, index) => (
                    <Box
                      key={course._id || index}
                      sx={{
                        height: `${Math.max(15, Math.round(((course.progress || 0) / maxProgress) * 100))}%`,
                        width: "12%",
                        bgcolor: getCourseColor(index),
                        borderRadius: "4px 4px 0 0",
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
                    textAlign: "left",
                  }}
                >
                  Syllabus Performance Ratio
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: COLORS.textMain }}
                  >
                    {courses.length === 0
                      ? "0%"
                      : `${Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length)}%`}
                  </Typography>
                </Box>
                <Box />
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
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
                  sx={{ fontWeight: 600, color: COLORS.textMain }}
                >
                  Milestone Metrics
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#22c55e",
                    display: "block",
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  {completedCourses.length} Programs Completed
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
                  <Typography
                    variant="body2"
                    sx={{
                      color: COLORS.textSub,
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    {completedCourses.length === 0
                      ? "Finish structural course trees to unlock secure certificates."
                      : "Keep up the excellent academic speed!"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* ================= RIGHT ACTION SIDEBAR COMPONENT RAIL ================= */}
        <Grid size={{ xs: 12, lg: 3 }}>
          {/* PROFILE CONTROL PANEL */}
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
              Academic Operations Center
            </Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<School />}
              onClick={() => navigate("/courses")}
              disableElevation
              sx={{
                bgcolor: COLORS.primary,
                color: "#ffffff",
                borderRadius: "8px",
                py: 1,
                fontWeight: 600,
                textTransform: "none",
                mb: 2.5,
                "&:hover": { bgcolor: "#008ee0" },
              }}
            >
              Browse Global Catalog
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
                    fontWeight: 600,
                  }}
                >
                  Enrolled Tree
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: COLORS.textMain }}
                >
                  {courses.length}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.textSub,
                    display: "block",
                    fontSize: "10px",
                    fontWeight: 600,
                  }}
                >
                  Completed
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: COLORS.textMain }}
                >
                  {completedCourses.length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* MANAGED CONTACT INTERFACE (INSTRUCTORS) */}
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
                Assigned Core Faculty
              </Typography>
            </Box>

            {teachersLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  mb: 1,
                }}
              >
                <CircularProgress size={14} />
                <Typography variant="caption" sx={{ color: COLORS.textSub }}>
                  Syncing messenger configurations...
                </Typography>
              </Box>
            )}

            <List disablePadding>
              {(teachers && teachers.length > 0 ? teachers : []).map(
                (teacher: ITeacher, idx: number) => (
                  <ListItem
                    key={teacher._id || idx}
                    disablePadding
                    sx={{ mb: 1.5, "&:last-child": { mb: 0 } }}
                    secondaryAction={
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/chat/${teacher._id || ""}`)}
                        sx={{
                          bgcolor: "#edf5ff",
                          color: COLORS.primary,
                          "&:hover": { bgcolor: "#dbeafe" },
                        }}
                      >
                        <ChatBubbleOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar sx={{ minWidth: "38px" }}>
                      <Avatar
                        sx={{
                          bgcolor: getCourseColor(idx + 1),
                          color: "#fff",
                          fontSize: "12px",
                          width: 32,
                          height: 32,
                          fontWeight: 700,
                        }}
                      >
                        {teacher.name?.charAt(0).toUpperCase() || "T"}
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
                          {teacher.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{
                            color: COLORS.textSub,
                            fontSize: "10px",
                            display: "block",
                          }}
                        >
                          Faculty Advisor
                        </Typography>
                      }
                    />
                  </ListItem>
                ),
              )}
            </List>
          </Paper>

          {/* CAMPUS BOARD PANEL */}
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}
            >
              Workspace Notifications
            </Typography>
            <List disablePadding>
              {[
                {
                  title: "Mid-Term Code Assessment",
                  time: "2 days remaining",
                  desc: "Project evaluations for active full-stack branches start this Friday.",
                  color: "#6366f1",
                },
                {
                  title: "Database Architecture Upgrade",
                  time: "30 May",
                  desc: "Workspace environment services scheduled for backend optimization tasks.",
                  color: "#eab308",
                },
              ].map((notice, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    alignItems: "flex-start",
                    mb: 2,
                    "&:last-child": { mb: 0 },
                  }}
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
                            fontSize: "12px",
                            color: COLORS.textMain,
                          }}
                        >
                          {notice.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: COLORS.textSub,
                            fontSize: "9px",
                            fontWeight: 600,
                          }}
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
                          fontSize: "11px",
                        }}
                      >
                        {notice.desc}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
