import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";

import { AssignmentTurnedIn, AccessTime } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchTeachers } from "../../features/auth/authThunks";

// const COLORS = {
//   primary: "#00a3ff",
//   primaryLight: "#e0f2fe",
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#1e293b",
//   textSub: "#64748b",
//   border: "#e2e8f0",
//   purple: "#9124f7",
// };

const activeCourses = [
  {
    title: "Advanced React & TypeScript",
    instructor: "Nil Yeager",
    progress: 75,
    char: "R",
    color: "#0ea5e9",
  },
  {
    title: "UI Design Principles",
    instructor: "James Martin",
    progress: 40,
    char: "D",
    color: "#eab308",
  },
  {
    title: "Node.js Backend Architecture",
    instructor: "David Frank",
    progress: 15,
    char: "N",
    color: "#ec4899",
  },
];

const dashboardStats = [
  {
    title: "Hours Spent",
    value: "42.5 hrs",
    icon: <AccessTime sx={{ fontSize: 18 }} />,
  },
  {
    title: "Certificates",
    value: "3 Earned",
    icon: <AssignmentTurnedIn sx={{ fontSize: 18 }} />,
  },
];

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { teachers, teachersLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "150vh",
        minWidth: "81vw",
        bgcolor: theme.palette.background.default,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 4 },
        mt: -6.8,
        ml: -4
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 28 }}>
            Student Workspace
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Track courses, assignments and progress.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/courses")}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            "&hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Continue Learning
        </Button>
      </Box>

      {/* ================= MAIN GRID ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "3fr 1fr" },
          gap: 3,
        }}
      >
        {/* ================= LEFT SECTION ================= */}
        <Box>
          {/* HERO */}
          <Paper
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 3,
              color: theme.palette.common.white,
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(135deg, #770cea, #8b4df6)`,
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                gap: 3,
                alignItems: "center",
              }}
            >
              {/* HERO TEXT */}
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 27 }}>
                  Welcome Back, Learner!
                </Typography>

                <Typography sx={{ mt: 1, mb: 2, opacity: 0.9 }}>
                  You completed 3 lessons this week and submitted 2 assignments.
                </Typography>
              </Box>

              {/* STATS */}
              <Box sx={{ display: "grid", gap: 2 }}>
                {dashboardStats.map((item, i) => (
                  <Paper
                    key={i}
                    sx={{
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.12)",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
                      {item.icon}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* ACTIVE COURSES */}
          <Box sx={{ display: "grid", gap: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>
                Active Courses
              </Typography>

              <Box sx={{ display: "grid", gap: 2 }}>
                {activeCourses.map((c, i) => (
                  <Paper
                    key={i}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ bgcolor: c.color }}>{c.char}</Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {c.title}
                      </Typography>

                      <Typography variant="caption">{c.instructor}</Typography>

                      <LinearProgress
                        value={c.progress}
                        variant="determinate"
                        sx={{
                          mt: 1,
                          height: 7,
                          borderRadius: 5,
                          bgcolor: theme.palette.action.disabledBackground,
                        }}
                      />
                    </Box>

                    <Button variant="contained" size="small">
                      Resume
                    </Button>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>

        <Paper sx={{ p: 2.5, borderRadius: 3, height: "fit-content" }}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            My Instructors
          </Typography>

          {teachersLoading && (
            <Typography variant="body2">Loading instructors...</Typography>
          )}

          <Box sx={{ display: "grid", gap: 2 }}>
            {teachers?.map((teacher, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  pb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "#15cabd",
                    }}
                  >
                    {teacher.name?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      {teacher.name}
                    </Typography>
                  </Box>
                </Box>

                <Button size="small">Chat</Button>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
