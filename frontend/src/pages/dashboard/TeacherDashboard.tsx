import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import {
  Assignment,
  MenuBook,
  People,
  CheckCircleOutlined,
  RateReview,
  ChevronRight,
  Notifications,
  MoreVert,
} from "@mui/icons-material";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  bannerBlue: "#0ea5e9",
};

export default function TeacherDashboard() {
  return (
    <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* DASHBOARD CONTAINER TITLE */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.textMain }}>
          Teacher Command Center
        </Typography>
      </Box>

      {/* MASTER GRID STRUCTURE: LEFT SIDE MAIN SYSTEM VS RIGHT FIXED SIDEBAR */}
      <Grid container spacing={3}>
        
        {/* ================= LEFT MAIN WORKSPACE AREA (9 Cols Wide) ================= */}
        <Grid item xs={12} lg={9}>
          
          {/* HERO BANNER SECTION */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${COLORS.bannerBlue} 0%, #0369a1 100%)`,
              color: "#ffffff",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box sx={{ maxWidth: { md: "70%" } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: "1.8rem" }}>
                Hello, Instructor!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                You have 14 pending assignments that require evaluation today.
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><People sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Total Enrolled</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>480 Students</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><CheckCircleOutlined sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Avg Passing Rate</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>94.2%</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* INNER LAYER SPLIT: COURSE OVERVIEWS & EVALUATION QUEUE */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            
            {/* MY LIVE COURSES LIST */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>My Active Courses</Typography>
                <Button size="small" sx={{ color: COLORS.textSub, textTransform: "none", fontSize: "12px" }}>Manage All</Button>
              </Box>
              {[
                { title: "UI/UX Design Masterclass", students: "142 Students", progress: 65, char: "U", color: "#eab308", btnColor: "#fef9c3", textColor: "#713f12" },
                { title: "React Fundamentals", students: "98 Students", progress: 80, char: "R", color: "#3b82f6", btnColor: "#dbeafe", textColor: "#1e40af" },
                { title: "Advanced Node.js Patterns", students: "120 Students", progress: 45, char: "N", color: "#ec4899", btnColor: "#fce7f3", textColor: "#9d174d" },
                { title: "MERN Stack Capstone Project", students: "120 Students", progress: 20, char: "M", color: "#14b8a6", btnColor: "#ccfbf1", textColor: "#115e59" }
              ].map((course, idx) => (
                <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: "12px", mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: COLORS.cardBg }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "65%" }}>
                    <Avatar variant="rounded" sx={{ bgcolor: course.color, width: 38, height: 38, fontWeight: 600, borderRadius: "8px" }}>{course.char}</Avatar>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, fontSize: "13px" }}>{course.title}</Typography>
                      <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", mb: 0.5 }}>{course.students}</Typography>
                      <LinearProgress variant="determinate" value={course.progress} sx={{ height: 4, borderRadius: 2, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: course.color } }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Button size="small" disableElevation sx={{ bgcolor: course.btnColor, color: course.textColor, fontWeight: 600, fontSize: "11px", textTransform: "none", borderRadius: "6px", px: 1.2 }}>View Details</Button>
                    <IconButton size="small"><MoreVert sx={{ fontSize: 18 }} /></IconButton>
                  </Box>
                </Paper>
              ))}
            </Grid>

            {/* REAL-TIME EVALUATION INBOX QUEUE */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Evaluation Pending Inbox</Typography>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", mb: 2, bgcolor: COLORS.cardBg, height: "135px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Weekly Grading Metrics</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block" }}>Target: Keep turnaround time under 24 hrs</Typography>
                </Box>
                <Box sx={{ height: 50, display: "flex", alignItems: "flex-end", gap: 1, borderBottom: "1px solid #e2e8f0", pb: 0.5 }}>
                  <Box sx={{ height: "70%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "50%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "90%", width: "100%", bgcolor: COLORS.primary, borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "40%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "25%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                </Box>
              </Paper>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#ef4444", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>14 Submissions</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>Needs Review</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#22c55e", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>48 Graded</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>This Week</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* LOWER ROWS: GRADE HIGHLIGHT STATS & TREND CARDS */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, mb: 1 }}>Average Score Spectrum per Course</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 110, pt: 1 }}>
                  {[85, 92, 68, 74, 88].map((val, i) => (
                    <Box key={i} sx={{ height: `${val}%`, width: "12%", bgcolor: ["#3b82f6", "#14b8a6", "#eab308", "#ec4899", "#a855f7"][i], borderRadius: "3px 3px 0 0" }} />
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMain, width: "100%" }}>Course Engagement</Typography>
                <Box sx={{ position: "relative", width: 90, height: 90, borderRadius: "50%", border: "8px solid #edf2f9", borderRightColor: COLORS.primary, borderTopColor: COLORS.primary, borderBottomColor: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>78%</Typography>
                </Box>
                <Box />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Student Dropouts</Typography>
                <Typography variant="caption" sx={{ color: "#ef4444", display: "block", mb: 1 }}>-1.2% downward change</Typography>
                <Box sx={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px dashed #e2e8f0" }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>[Retention Stability]</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* ================= RIGHT UTILITY COLUMN (3 Cols Wide) ================= */}
        <Grid item xs={12} lg={3}>
          
          {/* QUICK LINKS SECTION CARD PANEL */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3, bgcolor: COLORS.cardBg, textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>
              Ready to construct new materials?
            </Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<RateReview />}
              disableElevation
              sx={{ bgcolor: COLORS.primary, color: "#ffffff", borderRadius: "8px", py: 1, fontWeight: 600, textTransform: "none", mb: 2.5 }}
            >
              Add New Assignment
            </Button>
            <Grid container spacing={1} sx={{ pt: 1.5, borderTop: "1px solid #edf2f9" }}>
              <Grid item xs={6} sx={{ borderRight: "1px solid #edf2f9" }}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Active Exams</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>2</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Quizzes Built</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>12</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* ACTIVE ASSIGNMENT STATUS STACK BOXES */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Recent Submissions</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>Review Queue</Button>
            </Box>
            <List disablePadding>
              {[
                { name: "Khushbu Parmar", desc: "React Hooks Lifecycle", img: "👩‍💻" },
                { name: "Micaiah Doe", desc: "Tailwind Grid CSS Layout", img: "👨‍💻" },
                { name: "Peter Doe", desc: "Aggregation pipeline Schema", img: "🧔" }
              ].map((student, i) => (
                <ListItem key={i} disablePadding sx={{ mb: 1.5, "&:last-child": { mb: 0 } }} secondaryAction={<Button size="small" variant="text" sx={{ color: "#0ea5e9", fontSize: "10px", textTransform: "none", fontWeight: 700, bgcolor: "#e0f2fe", px: 1 }}>Grade</Button>}>
                  <ListItemAvatar sx={{ minWidth: "36px" }}>
                    <Avatar sx={{ bgcolor: "#f1f5f9", fontSize: "14px", width: 28, height: 28 }}>{student.img}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "12px", color: COLORS.textMain }}>{student.name}</Typography>} secondary={<Typography variant="caption" sx={{ color: COLORS.textSub, fontSize: "10px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "90px" }}>{student.desc}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= SECTION 3: BOTTOM PLATFORM PERFORMANCE VIEWS ================= */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        
        {/* COMPILATION AND FEEDBACK MATRIX METRICS */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Course Enrollment Ratios</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { label: "UI/UX Design Masterclass", value: 75, user: "142 Active", color: "#eab308" },
              { label: "React Fundamentals", value: 50, user: "98 Active", color: "#3b82f6" },
              { label: "Advanced Node.js Patterns", value: 60, user: "120 Active", color: "#ec4899" },
              { label: "MERN Stack Capstone", value: 30, user: "120 Active", color: "#14b8a6" }
            ].map((row, i) => (
              <Box key={i} sx={{ mb: 2, "&:last-child": { mb: 0 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMain }}>{row.label}</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub }}>{row.user}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={row.value} sx={{ height: 6, borderRadius: 3, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: row.color } }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* ASSIGNMENT CHANNELS SUBMISSION TIMELINES */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Upcoming Assignment Deadlines</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { title: "React Context API Form", meta: "Due: May 24, 2026", icon: "💻", color: "#3b82f6" },
              { title: "Wireframe High-Fidelity Prototype", meta: "Due: May 28, 2026", icon: "🎨", color: "#eab308" },
              { title: "MongoDB Index Optimizations", meta: "Due: June 02, 2026", icon: "📚", color: "#14b8a6" }
            ].map((assignment, i) => (
              <Paper key={i} elevation={0} sx={{ p: 1.2, mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "12px", "&:last-child": { mb: 0 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar variant="rounded" sx={{ bgcolor: assignment.color, width: 36, height: 36, borderRadius: "8px" }}>{assignment.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "13px", color: COLORS.textMain }}>{assignment.title}</Typography>
                    <Typography variant="caption" sx={{ color: COLORS.textSub }}>{assignment.meta}</Typography>
                  </Box>
                </Box>
                <IconButton size="small"><ChevronRight sx={{ fontSize: 18 }} /></IconButton>
              </Paper>
            ))}
          </Paper>
        </Grid>

        {/* SYSTEM BULLETINS FOR INSTRUCTORS */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Teacher Notice board</Typography>
            <List disablePadding sx={{ flexGrow: 1 }}>
              {[
                { title: "End Semester Report Submission", time: "Just Now", desc: "Please upload your internal evaluated project report spreadsheets...", color: "#0ea5e9" },
                { title: "New Evaluation Form Criteria", time: "Yesterday", desc: "The admin panel updated rubric rules for internship reviews...", color: "#14b8a6" },
                { title: "LMS Server Deployment Updates", time: "18 Dec 2025", desc: "File server uploading capabilities are optimized...", color: "#ef4444" }
              ].map((notice, i) => (
                <ListItem key={i} disablePadding sx={{ alignItems: "flex-start", mb: 2 }}>
                  <ListItemAvatar sx={{ minWidth: 42 }}>
                    <Avatar variant="rounded" sx={{ bgcolor: `${notice.color}15`, color: notice.color, width: 32, height: 32, borderRadius: "6px" }}><Notifications sx={{ fontSize: 16 }} /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "13px", color: COLORS.textMain }}>{notice.title}</Typography>
                        <Typography variant="caption" sx={{ color: COLORS.textSub, fontSize: "10px" }}>{notice.time}</Typography>
                      </Box>
                    }
                    secondary={<Typography variant="caption" sx={{ color: COLORS.textSub, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.desc}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
            <Button fullWidth size="small" sx={{ mt: 1, bgcolor: "#edf5ff", color: COLORS.primary, textTransform: "none", fontWeight: 600, borderRadius: "8px", py: 1 }}>View all</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}