import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";

import { People, School } from "@mui/icons-material";

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
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* HEADER */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, color: COLORS.textMain }}
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
              color: "#fff",
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

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* INSTRUCTORS */}
          <Paper sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Best Instructors
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                {
                  name: "Nil Yeager",
                  desc: "Backend Dev.",
                  char: "N",
                  color: "#d83232",
                },
                {
                  name: "James Martin",
                  desc: "UI/UX Designer",
                  char: "J",
                  color: "#7325c1",
                },
                {
                  name: "David Frank",
                  desc: "Sales Manager",
                  char: "D",
                  color: "#15cabd",
                },
              ].map((ins, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: ins.color }}>
                      {ins.char}
                    </Avatar>

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                        {ins.name}
                      </Typography>
                      <Typography variant="caption">{ins.desc}</Typography>
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
