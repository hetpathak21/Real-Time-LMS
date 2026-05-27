import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchTeachers } from "../../features/auth/authThunks";

import { People, School } from "@mui/icons-material";

export default function CompleteAdminDashboard() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { teachers, teachersLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* HEADER */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary}}
      >
        Admin Dashboard
      </Typography>

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* HERO */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 3,
              background: "linear-gradient(135deg, #1e927e 15%, #18c8ab 100%)",
              color: theme.palette.common.white,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 18, sm: 24 },
              }}
            >
              Learn Effectively With EduNex!
            </Typography>

            <Typography sx={{ fontSize: "17px" }}>
              Get upto 30% off on every course !
            </Typography>

            {/* STATS ROW */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                fontSize: "14px",
              }}
            >
              {[
                { icon: <School />, label: "Students : ", value: "75,000+" },
                { icon: <People />, label: "Mentors : ", value: "200+" },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 34,
                      height: 34,
                    }}
                  >
                    {item.icon}
                  </Avatar>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, fontSize: "17px" }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "15px" }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* POPULAR COURSES */}
          <Paper sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Popular Courses
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                {
                  title: "UI/UX Design",
                  count: "30+ Courses",
                  char: "U",
                  color: "#eab308",
                },
                {
                  title: "Marketing",
                  count: "25+ Courses",
                  char: "M",
                  color: "#ec4899",
                },
                {
                  title: "Web Dev",
                  count: "30+ Courses",
                  char: "W",
                  color: "#14b8a6",
                },
              ].map((course, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 2,
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: course.color }}>
                      {course.char}
                    </Avatar>

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                        {course.title}
                      </Typography>
                      <Typography variant="caption">{course.count}</Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontSize: 15,
                    }}
                  >
                    View
                  </Button>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* TEACHERS */}
          <Paper sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Best Instructors
            </Typography>

            {teachersLoading && (
              <Typography variant="body2">Loading instructors...</Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {teachers?.map((teacher, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                      <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                        {teacher.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Button size="small">Courses</Button>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* COMPLETION */}
          <Paper sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Course Completion
            </Typography>

            {[
              { label: "In Progress", value: 40, color: "#3b82f6" },
              { label: "Completed", value: 20, color: "#14b8a6" },
              { label: "Inactive", value: 18, color: "#eab308" },
            ].map((row, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" sx={{ color: row.color }}>
                    {row.label}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={row.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#f1f5f9",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: row.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
