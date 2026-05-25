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
} from "@mui/material";

import {
  People,
  CheckCircleOutlined,
  RateReview,
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
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* TITLE */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: COLORS.textMain }}
        >
          Teacher Command Center
        </Typography>
      </Box>

      {/* MAIN LAYOUT (REPLACES GRID) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "3fr 1fr" },
          gap: 3,
        }}
      >
        {/* ================= LEFT SECTION ================= */}
        <Box>
          {/* HERO */}
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
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, fontSize: "1.8rem" }}
              >
                Hello, Instructor!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                You have 14 pending assignments that require evaluation today.
              </Typography>

              <Box sx={{ display: "flex", gap: 4 }}>
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
                      480 Students
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
                      Avg Passing Rate
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      94.2%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* INNER GRID (COURSES + INBOX) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mb: 3,
            }}
          >
            {/* COURSES */}
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  My Active Courses
                </Typography>
                <Button
                  size="small"
                  sx={{ textTransform: "none", color: COLORS.textSub }}
                >
                  Manage All
                </Button>
              </Box>

              {[
                {
                  title: "UI/UX Design Masterclass",
                  students: "142 Students",
                  progress: 65,
                  char: "U",
                  color: "#eab308",
                  btnColor: "#fef9c3",
                  textColor: "#713f12",
                },
                {
                  title: "React Fundamentals",
                  students: "98 Students",
                  progress: 80,
                  char: "R",
                  color: "#3b82f6",
                  btnColor: "#dbeafe",
                  textColor: "#1e40af",
                },
                {
                  title: "Node.js Patterns",
                  students: "120 Students",
                  progress: 45,
                  char: "N",
                  color: "#ec4899",
                  btnColor: "#fce7f3",
                  textColor: "#9d174d",
                },
                {
                  title: "MERN Capstone",
                  students: "120 Students",
                  progress: 20,
                  char: "M",
                  color: "#14b8a6",
                  btnColor: "#ccfbf1",
                  textColor: "#115e59",
                },
              ].map((course, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: course.color }}>
                      {course.char}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                        {course.title}
                      </Typography>
                      <Typography variant="caption">
                        {course.students}
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Paper>
              ))}
            </Box>

            {/* INBOX */}
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>
                Evaluation Inbox
              </Typography>

              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2">Weekly Metrics</Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  {[1, 2, 3, 4].map((_, i) => (
                    <Box
                      key={i}
                      sx={{ flex: 1, height: 40, bgcolor: "#e2e8f0" }}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* ================= RIGHT SIDEBAR ================= */}
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Quick Actions
            </Typography>

            <Button fullWidth variant="contained" startIcon={<RateReview />}>
              Add Assignment
            </Button>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Recent Submissions
            </Typography>

            <List>
              {["Khushbu", "Micaiah", "Peter"].map((name, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>{name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
