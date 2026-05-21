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
  People,
  MenuBook,
  School,
  GroupAdd,
  Add,
  MoreVert,
  ChevronRight,
  Notifications,
} from "@mui/icons-material";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  bannerGreen: "#3bc0aa",
};

export default function CompleteAdminDashboard() {
  return (
    <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* DASHBOARD CONTAINER TITLE */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.textMain }}>
          Admin Dashboard
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
              background: `linear-gradient(135deg, ${COLORS.bannerGreen} 15%, #29a38f 100%)`,
              color: "#ffffff",
              width: "600px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box sx={{ maxWidth: { md: "70%" } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: "1.8rem" }}>
                Learn With Effectively With Us!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Get 30% off every course on january.
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><School sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Students</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>75,000+</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32 }}><People sx={{ fontSize: 18 }} /></Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>Expert Mentors</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>200+</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* INNER LAYER SPLIT: POPULAR COURSES LIST & ACTIVITY BLOCK */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            
            {/* POPULAR COURSES ELEMENT BOXES */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>Popular Courses</Typography>
                <Button size="small" sx={{ color: COLORS.textSub, textTransform: "none", fontSize: "12px" }}>All Courses</Button>
              </Box>
              {[
                { title: "UI/UX Design", count: "30+ Courses", char: "U", color: "#eab308", btnColor: "#fef9c3", textColor: "#713f12" },
                { title: "Marketing", count: "25+ Courses", char: "M", color: "#ec4899", btnColor: "#fce7f3", textColor: "#9d174d" },
                { title: "Web Dev.", count: "30+ Courses", char: "W", color: "#14b8a6", btnColor: "#ccfbf1", textColor: "#115e59" },
                { title: "Mathematics", count: "50+ Courses", char: "M", color: "#3b82f6", btnColor: "#dbeafe", textColor: "#1e40af" }
              ].map((course, idx) => (
                <Paper key={idx} elevation={0} sx={{ p: 1.2, borderRadius: "12px", mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: COLORS.cardBg }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar variant="rounded" sx={{ bgcolor: course.color, width: 38, height: 38, fontWeight: 600, borderRadius: "8px" }}>{course.char}</Avatar>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, fontSize: "13px" }}>{course.title}</Typography>
                      <Typography variant="caption" sx={{ color: COLORS.textSub }}>{course.count}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Button size="small" disableElevation sx={{ bgcolor: course.btnColor, color: course.textColor, fontWeight: 600, fontSize: "11px", textTransform: "none", borderRadius: "6px", px: 1.2 }}>View Courses</Button>
                    <IconButton size="small"><MoreVert sx={{ fontSize: 18 }} /></IconButton>
                  </Box>
                </Paper>
              ))}
            </Grid>

            {/* MONTHLY PROGRESS CHART BLOCK + DUAL BLOCK GRID SUMMARY STATS */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Current Activity</Typography>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", mb: 2, bgcolor: COLORS.cardBg, height: "135px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Monthly Progress</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block" }}>This is the latest Improvement</Typography>
                </Box>
                <Box sx={{ height: 50, display: "flex", alignItems: "flex-end", gap: 1, borderBottom: "1px solid #e2e8f0", pb: 0.5 }}>
                  <Box sx={{ height: "30%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "45%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "35%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "60%", width: "100%", bgcolor: "#e2e8f0", borderRadius: "3px 3px 0 0" }} />
                  <Box sx={{ height: "80%", width: "100%", bgcolor: COLORS.primary, borderRadius: "3px 3px 0 0" }} />
                </Box>
              </Paper>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#eab308", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>450K+</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>Completed Course</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#ec4899", color: "#ffffff" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>200K+</Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.9, fontSize: "10px" }}>Video Course</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* LOWER ANALYTICS ROW SPLITS (Top 5, Overall Pass, Content Usage) */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain, mb: 1 }}>Top 5 School Performance</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 110 }}>
                  {[90, 75, 70, 60, 50].map((val, i) => (
                    <Box key={i} sx={{ height: `${val}%`, width: "12%", bgcolor: ["#3b82f6", "#a855f7", "#14b8a6", "#f43f5e", "#eab308"][i], borderRadius: "3px 3px 0 0" }} />
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMain, width: "100%" }}>Overall Pass Percentage</Typography>
                <Box sx={{ position: "relative", width: 90, height: 90, borderRadius: "50%", border: "8px solid #a855f7", borderColor: "#3b82f6 #3b82f6 #a855f7 #a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>82%</Typography>
                </Box>
                <Box />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, height: "180px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.textMain }}>Content Usage</Typography>
                <Typography variant="caption" sx={{ color: "#14b8a6", display: "block", mb: 1 }}>12.5% higher than last month</Typography>
                <Box sx={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px dashed #e2e8f0" }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>[Activity Graph]</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* ================= RIGHT UTILITY COLUMN: STACKS ALONGSIDE (3 Cols Wide) ================= */}
        <Grid item xs={12} lg={3}>
          
          {/* QUICK CREATE RESOURCE WIDGET PANEL */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3, bgcolor: COLORS.cardBg, textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>
              Have More knowledge to share?
            </Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              disableElevation
              sx={{ bgcolor: COLORS.primary, color: "#ffffff", borderRadius: "8px", py: 1, fontWeight: 600, textTransform: "none", mb: 2.5 }}
            >
              Create New Course
            </Button>
            <Grid container spacing={1} sx={{ pt: 1.5, borderTop: "1px solid #edf2f9" }}>
              <Grid item xs={6} sx={{ borderRight: "1px solid #edf2f9" }}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Courses in Pro...</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>5</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: COLORS.textSub, display: "block", fontSize: "10px" }}>Forum Discuss...</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textMain }}>25</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* BEST INSTRUCTORS PROFILE VIEW FEED */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: COLORS.cardBg, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Best Instructors</Typography>
              <Button size="small" sx={{ color: COLORS.textSub, textTransform: "none", fontSize: "11px" }}>See All</Button>
            </Box>
            <List disablePadding>
              {[
                { name: "Nil Yeager", desc: "5 Design Course", img: "👨‍💻" },
                { name: "Theron Trump", desc: "5 Design Course", img: "👩‍💻" },
                { name: "Tyler Mark", desc: "5 Design Course", img: "🧑‍🏫" },
                { name: "Johen Mark", desc: "5 Design Course", img: "🧔" }
              ].map((ins, i) => (
                <ListItem key={i} disablePadding sx={{ mb: i === 3 ? 0 : 1.5 }} secondaryAction={<Button size="small" sx={{ bgcolor: "#f1f5f9", color: COLORS.textMain, fontSize: "10px", textTransform: "none", fontWeight: 600, borderRadius: "4px" }}>Courses</Button>}>
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
        {/* COURSE COMPLETION RATIOS MONITOR */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Course completion</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { label: "In Progress", value: 40, user: "117 User", color: "#3b82f6" },
              { label: "Completed", value: 20, user: "74 User", color: "#14b8a6" },
              { label: "Inactive", value: 18, user: "58 User", color: "#eab308" },
              { label: "Expired", value: 7, user: "11 User", color: "#ef4444" }
            ].map((row, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: row.color }}>{row.label}</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textSub }}>{row.user}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={row.value} sx={{ height: 6, borderRadius: 3, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: row.color } }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* UPCOMING LESSONS CHANNELS Schedulers */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain }}>Upcoming Lessons</Typography>
              <Button size="small" sx={{ color: COLORS.primary, textTransform: "none", fontSize: "11px" }}>View All</Button>
            </Box>
            {[
              { title: "Informatic Course", meta: "Nil Yeager, 19 April", icon: "💻", color: "#eab308" },
              { title: "Live Drawing", meta: "Micak Doe, 12 June", icon: "🎨", color: "#0ea5e9" },
              { title: "Contemporary Art", meta: "Peter doe, 27 July", icon: "📚", color: "#ec4899" }
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

        {/* REALTIME SYSTEM NOTICE BOARD BULLETIN */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: COLORS.cardBg, display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: COLORS.textMain, mb: 2 }}>Notice board</Typography>
            <List disablePadding sx={{ flexGrow: 1 }}>
              {[
                { title: "New Teacher", time: "Just Now", desc: "It is a long established fact that a reader will be...", color: "#0ea5e9" },
                { title: "New Fees Structure", time: "Today", desc: "It is a long established fact that a reader will be...", color: "#ec4899" },
                { title: "Updated Syllabus", time: "17 Dec 2020", desc: "It is a long established fact that a reader will be...", color: "#14b8a6" }
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