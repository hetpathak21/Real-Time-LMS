// import { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Avatar,
//   LinearProgress,
// } from "@mui/material";

// import { useTheme } from "@mui/material/styles";

// import { useAppDispatch, useAppSelector } from "../../app/hooks";

// import { fetchTeachers } from "../../features/auth/authThunks";

// import { People, School } from "@mui/icons-material";

// export default function CompleteAdminDashboard() {
//   const dispatch = useAppDispatch();
//   const theme = useTheme();

//   const { teachers, teachersLoading } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchTeachers());
//   }, [dispatch]);

//   return (
//     <Box
//       sx={{
//         bgcolor: theme.palette.background.default,
//         minHeight: "100vh",
//         p: { xs: 2, md: 4 },
//       }}
//     >
//       {/* HEADER */}
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary}}
//       >
//         Admin Dashboard
//       </Typography>

//       {/* MAIN GRID */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
//           gap: 3,
//         }}
//       >
//         {/* LEFT SIDE */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           {/* HERO */}
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 2.5, md: 4 },
//               borderRadius: 3,
//               background: "linear-gradient(135deg, #1e927e 15%, #18c8ab 100%)",
//               color: theme.palette.common.white,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: 18, sm: 24 },
//               }}
//             >
//               Learn Effectively With EduNex!
//             </Typography>

//             <Typography sx={{ fontSize: "17px" }}>
//               Get upto 30% off on every course !
//             </Typography>

//             {/* STATS ROW */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 3,
//                 fontSize: "14px",
//               }}
//             >
//               {[
//                 { icon: <School />, label: "Students : ", value: "75,000+" },
//                 { icon: <People />, label: "Mentors : ", value: "200+" },
//               ].map((item, i) => (
//                 <Box
//                   key={i}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1.5,
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       bgcolor: "rgba(255,255,255,0.2)",
//                       width: 34,
//                       height: 34,
//                     }}
//                   >
//                     {item.icon}
//                   </Avatar>

//                   <Box>
//                     <Typography
//                       variant="caption"
//                       sx={{ fontWeight: 600, fontSize: "17px" }}
//                     >
//                       {item.label}
//                     </Typography>
//                     <Typography variant="caption" sx={{ fontSize: "15px" }}>
//                       {item.value}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Paper>

//           {/* POPULAR COURSES */}
//           <Paper sx={{ p: 2.5, borderRadius: 3 }}>
//             <Typography sx={{ fontWeight: 700, mb: 2 }}>
//               Popular Courses
//             </Typography>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               {[
//                 {
//                   title: "UI/UX Design",
//                   count: "30+ Courses",
//                   char: "U",
//                   color: "#eab308",
//                 },
//                 {
//                   title: "Marketing",
//                   count: "25+ Courses",
//                   char: "M",
//                   color: "#ec4899",
//                 },
//                 {
//                   title: "Web Dev",
//                   count: "30+ Courses",
//                   char: "W",
//                   color: "#14b8a6",
//                 },
//               ].map((course, idx) => (
//                 <Paper
//                   key={idx}
//                   sx={{
//                     p: 1.5,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     borderRadius: 2,
//                     flexWrap: "wrap",
//                     gap: 1,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <Avatar sx={{ bgcolor: course.color }}>
//                       {course.char}
//                     </Avatar>

//                     <Box>
//                       <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
//                         {course.title}
//                       </Typography>
//                       <Typography variant="caption">{course.count}</Typography>
//                     </Box>
//                   </Box>

//                   <Button
//                     size="small"
//                     sx={{
//                       textTransform: "none",
//                       fontSize: 15,
//                     }}
//                   >
//                     View
//                   </Button>
//                 </Paper>
//               ))}
//             </Box>
//           </Paper>
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
//           {/* TEACHERS */}
//           <Paper sx={{ p: 2.5, borderRadius: 3 }}>
//             <Typography sx={{ fontWeight: 700, mb: 2 }}>
//               Best Instructors
//             </Typography>

//             {teachersLoading && (
//               <Typography variant="body2">Loading instructors...</Typography>
//             )}

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               {teachers?.map((teacher, i) => (
//                 <Box
//                   key={i}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
//                     <Avatar
//                       sx={{
//                         width: 30,
//                         height: 30,
//                         bgcolor: "#15cabd",
//                       }}
//                     >
//                       {teacher.name?.charAt(0).toUpperCase()}
//                     </Avatar>

//                     <Box>
//                       <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
//                         {teacher.name}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Button size="small">Courses</Button>
//                 </Box>
//               ))}
//             </Box>
//           </Paper>

//           {/* COMPLETION */}
//           <Paper sx={{ p: 2.5, borderRadius: 3 }}>
//             <Typography sx={{ fontWeight: 700, mb: 2 }}>
//               Course Completion
//             </Typography>

//             {[
//               { label: "In Progress", value: 40, color: "#3b82f6" },
//               { label: "Completed", value: 20, color: "#14b8a6" },
//               { label: "Inactive", value: 18, color: "#eab308" },
//             ].map((row, i) => (
//               <Box key={i} sx={{ mb: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography variant="caption" sx={{ color: row.color }}>
//                     {row.label}
//                   </Typography>
//                 </Box>

//                 <LinearProgress
//                   variant="determinate"
//                   value={row.value}
//                   sx={{
//                     height: 6,
//                     borderRadius: 3,
//                     bgcolor: "#f1f5f9",
//                     "& .MuiLinearProgress-bar": {
//                       bgcolor: row.color,
//                     },
//                   }}
//                 />
//               </Box>
//             ))}
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Fixed missing import
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
  CircularProgress,
  Chip,
  Stack,
  alpha,
  Divider,
} from "@mui/material";
import {
  People,
  School,
  Add,
  MoreVert,
  ChevronRight,
  Notifications,
  AutoStories,
  AdminPanelSettings,
  Settings,
} from "@mui/icons-material";
import Grid from "@mui/system/Grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeachers } from "../../features/auth/authThunks";
import { fetchAllUsers } from "../../features/user/userThunks";
import { fetchAllCourses } from "../../features/course/courseThunks";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  bannerGreen: "#1e927e",
};

const COURSE_ACCENTS = ["#eab308", "#ec4899", "#14b8a6", "#3b82f6", "#a855f7"];
const getAccentColor = (index: number) => COURSE_ACCENTS[index % COURSE_ACCENTS.length];

export default function CompleteAdminDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Dynamic global state selectors mapping directly to system slices
  const { teachers, teachersLoading } = useAppSelector((state) => state.auth);
  const { users, loading: usersLoading } = useAppSelector((state) => state.user);
  const { courses, loading: coursesLoading } = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchAllUsers());
    dispatch(fetchAllCourses());
  }, [dispatch]);

  // ================= DYNAMIC DATA RESOLVERS =================
  const platformTeachers = Array.isArray(teachers) ? teachers : [];
  
  const platformStudents = Array.isArray(users)
    ? users
        .filter((user) => user.role === "student")
        .sort((a, b) => {
          const aTs = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTs = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTs - aTs;
        })
    : [];

  const platformCourses = courses?.length > 0 ? courses : [
    { _id: "c1", title: "MERN Stack Architecture", instructor: "Nil Yeager", students: 120, status: "Active", enrollmentCount: 1240, category: "Design", char: "U" },
    { _id: "c2", title: "Python for Data Science", instructor: "David Frank", students: 450, status: "Active", enrollmentCount: 890, category: "Marketing", char: "M" },
    { _id: "c3", title: "UI/UX Advanced Lab", instructor: "James Martin", students: 85, status: "Draft", enrollmentCount: 2840, category: "Engineering", char: "W" },
  ];

  // System Metric Accumulators
  const totalEnrollments = platformCourses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);
  const maxEnrollment = Math.max(...platformCourses.map((c) => c.enrollmentCount || 1), 1);

  // CRITICAL FIX: Defined strictly before the component execution reaches the JSX return loop
  const systemLogs = [
    { title: "New Teacher Registry", time: "Just Now", desc: `Instructor registry updated with ${platformTeachers.length} profiles live.`, color: "#0ea5e9" },
    { title: "Gateway Payout Batch", time: "Today", desc: "Automated billing cycles successfully processed platform transactions.", color: "#ec4899" },
    { title: "Database Optimization", time: "Yesterday", desc: "Global schema instances tuned for rapid workspace delivery.", color: "#14b8a6" }
  ];

  return (
      <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", p: { xs: 2, md: 4 }, fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ================= HEADER CONTROL BAR ================= */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.textMain }}>Global Control Center</Typography>
            <Typography variant="caption" sx={{ color: COLORS.textSub }}>System Status: <Box component="span" sx={{ color: "success.main", fontWeight: 700 }}>Optimal</Box></Typography>
        </Box>
        <Stack direction="row" spacing={2}>
            <IconButton sx={{ bgcolor: "#fff", border: "1px solid #e2e8f0" }}><Settings /></IconButton>
            <Chip icon={<AdminPanelSettings />} label="Super Admin" color="primary" sx={{ fontWeight: 600 }} />
        </Stack>
      </Box>

      {/* ================= MAIN 12-COLUMN CORE GRID ================= */}
      <Grid container spacing={3}>
        
        {/* LEFT WORKSPACE AREA */}
        <Grid size={{ xs: 12, lg: 8 }}>
          
          {/* 1. ANALYTICS HERO */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: "20px", background: `linear-gradient(135deg, ${COLORS.bannerGreen} 15%, #29a38f 100%)`, color: "#fff", mb: 3, position: "relative", overflow: "hidden" }}>
            <Grid container alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>EduNex Ecosystem</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>Platform-wide overview of active learning nodes and pedagogical performance.</Typography>
                    <Stack direction="row" spacing={4}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{platformStudents.length}</Typography>
                            <Typography variant="caption">Total Students</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{platformTeachers.length}</Typography>
                            <Typography variant="caption">Total Teachers</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{platformCourses.length}</Typography>
                            <Typography variant="caption">Total Courses</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 0, md: 4 }} sx={{ textAlign: "right" }}>
                    <AutoStories sx={{ fontSize: 120, opacity: 0.2 }} />
                </Grid>
            </Grid>
          </Paper>

          {/* 2. DYNAMIC COURSE INVENTORY */}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: COLORS.textMain }}>Global Course Inventory</Typography>
          <Paper elevation={0} sx={{ borderRadius: "20px", overflow: "hidden", mb: 3, border: "1px solid #e2e8f0" }}>
            <List disablePadding>
              {platformCourses.map((course, idx) => (
                <React.Fragment key={course._id || idx}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ bgcolor: alpha(getAccentColor(idx), 0.1), color: getAccentColor(idx), fontWeight: 700 }}>
                        {course.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={<Typography sx={{ fontWeight: 700, fontSize: "14px", color: COLORS.textMain }}>{course.title}</Typography>}
                      secondary={`Instructor: ${course.instructor}`}
                    />
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ textAlign: "center" }}>
                            <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>{course.students}</Typography>
                            <Typography variant="caption" sx={{ color: COLORS.textSub }}>Enrolled</Typography>
                        </Box>
                        <Chip label={course.status} size="small" color={course.status === "Active" ? "success" : "default"} variant="filled" />
                        <IconButton size="small"><ChevronRight /></IconButton>
                    </Stack>
                  </ListItem>
                  {idx < platformCourses.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* 3. STUDENT ACTIVITY FEED */}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: COLORS.textMain }}>Recent Student Registrations</Typography>
          {(usersLoading || coursesLoading) && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          {!usersLoading && platformStudents.length === 0 && (
            <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                No students found yet.
              </Typography>
            </Paper>
          )}
          <Grid container spacing={2}>
            {platformStudents.slice(0, 3).map((student) => (
               <Grid size={{ xs: 12, md: 4 }} key={student._id}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: "15px", border: "1px solid #e2e8f0", textAlign: "center", bgcolor: COLORS.cardBg }}>
                    <Avatar sx={{ mx: "auto", mb: 1, bgcolor: COLORS.primary, fontWeight: 600 }}>{student.name.charAt(0)}</Avatar>
                    <Typography sx={{ fontWeight: 700, fontSize: "13px", color: COLORS.textMain }}>{student.name}</Typography>
                    <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", mb: 1 }}>{student.email}</Typography>
                    <Chip
                      label={`Joined ${student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "recently"}`}
                      size="small"
                      sx={{ fontSize: "10px" }}
                    />
                  </Paper>
               </Grid>
            ))}
          </Grid>
        </Grid>

        {/* ================= RIGHT RAIL AREA ================= */}
        <Grid size={{ xs: 12, lg: 4 }}>
          
          {/* TEACHER PROFILES REGISTRY */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", bgcolor: COLORS.cardBg, mb: 3, border: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>Teacher Registry</Typography>
                <Button size="small" variant="outlined" startIcon={<Add />} sx={{ textTransform: "none", borderRadius: "6px" }}>Invite</Button>
            </Box>
            
            {teachersLoading ? (
                <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress size={30} /></Box>
            ) : (
                <List disablePadding>
                    {platformTeachers.slice(0, 5).map((teacher, i) => (
                        <ListItem key={teacher._id || i} disablePadding sx={{ mb: 2, "&:last-child": { mb: 0 } }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: alpha(getAccentColor(i + 2), 0.1), color: getAccentColor(i + 2), fontWeight: 700 }}>
                                  {teacher.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={<Typography sx={{ fontWeight: 600, fontSize: "13px", color: COLORS.textMain }}>{teacher.name}</Typography>}
                                secondary={<Typography variant="caption" sx={{ color: COLORS.textSub }}>{teacher.email}</Typography>}
                            />
                            <IconButton size="small"><MoreVert /></IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 2, borderRadius: "10px", bgcolor: COLORS.primary, textTransform: "none", fontWeight: 600 }}>
              View All Faculty
            </Button>
          </Paper>

          {/* INFRASTRUCTURE LOGS */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", bgcolor: "#fff", border: "1px solid #e2e8f0" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: COLORS.textMain }}>Infrastructure Logs</Typography>
            <Stack spacing={2.5}>
                {systemLogs.map((log, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ mt: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: log.color }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: "12px", color: COLORS.textMain }}>{log.title}</Typography>
                            <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", lineHeight: 1.3, mt: 0.25 }}>{log.desc}</Typography>
                            <Typography sx={{ fontSize: "10px", color: COLORS.primary, fontWeight: 700, mt: 0.5, display: "block" }}>{log.time}</Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", bgcolor: "#fff", border: "1px solid #e2e8f0", mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 1.5 }}>
              User Management
            </Typography>
            <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", mb: 2 }}>
              Manage student, teacher, and admin accounts from a dedicated control panel.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={`Students: ${users.filter((u) => u.role === "student").length}`} size="small" />
              <Chip label={`Teachers: ${users.filter((u) => u.role === "teacher").length}`} size="small" />
            </Stack>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/admin/users")}
              sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600 }}
            >
              Open User Management
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}