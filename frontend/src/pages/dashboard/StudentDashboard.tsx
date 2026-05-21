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
  MenuBook,
  School,
  AssignmentTurnedIn,
  AccessTime,
  PlayCircleFilled,
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
  bannerPurple: "#a855f7", 
};

export default function StudentDashboard() {
  return (
    <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* DASHBOARD CONTAINER TITLE */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.textMain }}>
          Student Workspace
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
              background: `linear-gradient(135deg, ${COLORS.bannerPurple} 0%, #7e22ce 100%)`,
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
                Welcome Back, Learner!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                You have completed 3 lessons this week. Keep up the momentum!
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><MenuBook sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Hours Spent</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>42.5 hrs</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><AssignmentTurnedIn sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Certificates</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>3 Earned</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* INNER LAYER SPLIT: ENROLLED COURSES LIST & STUDY HOURS TRACKER */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            
            {/* MY COURSES PROGRESS LIST */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>My Active Courses</Typography>
                <Button size="small" sx={{ color: COLORS.textSub, textTransform: "none", fontSize: "12px" }}>All Courses</Button>
              </Box>
              {[
                { title: "Advanced React & TypeScript", instructor: "Nil Yeager", progress: 75, char: "R", color: "#0ea5e9", btnColor: "#e0f2fe", textColor: "#0369a1" },
                { title: "UI Design Principles", instructor: "Theron Trump", progress: 40, char: "D", color: "#eab308", btnColor: "#fef9c3", textColor: "#713f12" },
                { title: "Database Systems (MongoDB)", instructor: "Tyler Mark", progress: 90, char: "M", color: "#14b8a6", btnColor: "#ccfbf1", textColor: "#115e59" },
                { title: "Node.js Backend Architecture", instructor: "Johen Mark", progress: 15, char: "N", color: "#ec4899", btnColor: "#fce7f3", textColor: "#9d174d" }
              ].map((course, idx) => (
                <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: "12px", mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: COLORS.cardBg }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "65%" }}>
                    <Avatar variant="rounded" sx={{ bgcolor: course.color, width: 38, height: 38, fontWeight: 600, borderRadius: "8px" }}>{course.char}</Avatar>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, fontSize: "13px", noWrap: true }}>{course.title}</Typography>
                      <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", mb: 0.5 }}>By {course.instructor}</Typography>
                      <LinearProgress variant="determinate" value={course.progress} sx={{ height: 4, borderRadius: 2, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: course.color } }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Button size="small" variant="contained" disableElevation startIcon={<PlayCircleFilled sx={{ fontSize: "14px !important" }} />} sx={{ bgcolor: course.btnColor, color: course.textColor, fontWeight: 700, fontSize: "11px", textTransform: "none", borderRadius: "6px", px: 1.2, "&:hover": { bgcolor: course.btnColor } }}>Resume</Button>
                    <IconButton size="small"><MoreVert sx={{ fontSize: 18 }} /></IconButton>
                  </Box>
                </Paper>
              ))}
            </Grid>

            {/* WEEKLY ACTIVITY TRACKER CHIP STATS */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Weekly Study Goals</Typography>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", mb: 2, bgcolor: COLORS.cardBg, height: "135px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Weekly Watchtime</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block" }}>Target: 10 Hours / Week</Typography>
                </Box>
                <Box sx={{ height: 50, display: "flex", alignItems: "flex-end", gap: 1, borderBottom: "1px solid #e2e8f0", pb: 0.5 }}>
                  <Box sx={{ height: "40%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "75%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "20%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "90%", width: "100%", bgcolor: COLORS.primary, borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "50%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                </Box>
              </Paper>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#22c55e", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>8 / 12</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>Tasks Done</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#0ea5e9", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>92%</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>Avg Quiz Score</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* LOWER ROWS: GRADE METRICS & SUMMARY CHARTS */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, mb: 1 }}>Assignment Submissions Trend</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 110, pt: 1 }}>
                  {[40, 65, 50, 85, 100].map((val, i) => (
                    <Box key={i} sx={{ height: `${val}%`, width: "12%", bgcolor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1", COLORS.primary][i], borderRadius: "3px 3px 0 0" }} />
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMain, width: "100%" }}>Overall Attendance</Typography>
                <Box sx={{ position: "relative", width: 90, height: 90, borderRadius: "50%", border: "8px solid #edf2f9", borderLeftColor: COLORS.primary, borderTopColor: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>85%</Typography>
                </Box>
                <Box />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Course Completion Rate</Typography>
                <Typography variant="caption" sx={{ color: "#22c55e", display: "block", mb: 1 }}>4% increase from last week</Typography>
                <Box sx={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px dashed #e2e8f0" }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>[Progress Curve]</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* ================= RIGHT UTILITY COLUMN (3 Cols Wide) ================= */}
        <Grid item xs={12} lg={3}>
          
          {/* QUICK LINKS/CALENDAR SUMMARY MODULE */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3, bgcolor: COLORS.cardBg, textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>
              Have any questions or doubts?
            </Typography>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{ bgcolor: COLORS.primary, color: "#ffffff", borderRadius: "8px", py: 1, fontWeight: 600, textTransform: "none", mb: 2.5 }}
            >
              Open Discussion Forum
            </Button>
            <Grid container spacing={1} sx={{ pt: 1.5, borderTop: "1px solid #edf2f9" }}>
              <Grid item xs={6} sx={{ borderRight: "1px solid #edf2f9" }}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Pending Tasks</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#ef4444" }}>4</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Completed</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#22c55e" }}>18</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* MY INSTRUCTORS DIRECT CHANNEL VIEW */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>My Instructors</Typography>
              <Button size="small" sx={{ color: COLORS.textSub, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            <List disablePadding>
              {[
                { name: "Nil Yeager", desc: "React Advisor", img: "👨‍💻" },
                { name: "Theron Trump", desc: "UI Expert", img: "👩‍💻" },
                { name: "Tyler Mark", desc: "Database Prof.", img: "🧑‍🏫" }
              ].map((ins, i) => (
                <ListItem key={i} disablePadding sx={{ mb: 1.5, "&:last-child": { mb: 0 } }} secondaryAction={<Button size="small" sx={{ color: COLORS.primary, fontSize: "10px", textTransform: "none", fontWeight: 600, borderRadius: "4px" }}>Chat</Button>}>
                  <ListItemAvatar sx={{ minWidth: "36px" }}>
                    <Avatar sx={{ bgcolor: "#f1f5f9", fontSize: "14px", width: 28, height: 28 }}>{ins.img}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "12px", color: COLORS.textMain }}>{ins.name}</Typography>} secondary={<Typography variant="caption" sx={{ color: COLORS.textSub, fontSize: "10px" }}>{ins.desc}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= SECTION 3: BOTTOM PLATFORM PERFORMANCE VIEWS ================= */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        
        {/* DEADLINE WATCH CHANNELS */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Upcoming Deadlines</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { label: "React Assignment 2", value: 80, time: "2 days left", color: "#ef4444" },
              { label: "Database Normalization Quiz", value: 50, time: "5 days left", color: "#eab308" },
              { label: "Tailwind UI Redesign Portfolio", value: 10, time: "12 days left", color: "#22c55e" }
            ].map((row, i) => (
              <Box key={i} sx={{ mb: 2, "&:last-child": { mb: 0 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMain }}>{row.label}</Typography>
                  <Typography variant="caption" sx={{ color: row.color, fontWeight: 500 }}>{row.time}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={row.value} sx={{ height: 6, borderRadius: 3, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: row.color } }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* RECENTLY RELEASED SCHEDULES */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Recent Lessons Released</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { title: "TypeScript Generics Intro", meta: "Course: Advanced React", icon: "💻", color: "#0ea5e9" },
              { title: "Grid vs Flexbox Layouts", meta: "Course: UI Principles", icon: "🎨", color: "#eab308" },
              { title: "Aggregation Pipelines", meta: "Course: MongoDB", icon: "📚", color: "#14b8a6" }
            ].map((lesson, i) => (
              <Paper key={i} elevation={0} sx={{ p: 1.2, mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "12px", "&:last-child": { mb: 0 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar variant="rounded" sx={{ bgcolor: lesson.color, width: 36, height: 36, borderRadius: "8px" }}>{lesson.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "13px", color: COLORS.textMain }}>{lesson.title}</Typography>
                    <Typography variant="caption" sx={{ color: COLORS.textSub }}>{lesson.meta}</Typography>
                  </Box>
                </Box>
                <IconButton size="small"><ChevronRight sx={{ fontSize: 18 }} /></IconButton>
              </Paper>
            ))}
          </Paper>
        </Grid>

        {/* REALTIME SYSTEM STUDENT NOTICE BOARD */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Notice board</Typography>
            <List disablePadding sx={{ flexGrow: 1 }}>
              {[
                { title: "Mid-Term Project Guidelines", time: "Just Now", desc: "Please view your assignment portals for evaluation criteria...", color: "#a855f7" },
                { title: "Server Maintenance Alert", time: "Today", desc: "LMS servers will undergo local updates at 12:00 AM...", color: "#ef4444" },
                { title: "New Evaluation Form Released", time: "17 Dec 2025", desc: "Teachers have updated assignment response criteria sheets...", color: "#14b8a6" }
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