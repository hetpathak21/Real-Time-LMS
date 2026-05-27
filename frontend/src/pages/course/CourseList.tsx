// import { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Chip,
//   Paper,
//   Typography,
//   Button,
// } from "@mui/material";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import { useNavigate } from "react-router-dom";
// import CourseCard from "../../components/course/CourseCard";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { fetchAllCourses } from "../../features/course/courseThunks";

// const COLORS = {
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
// };

// export default function CourseList() {
//   const dispatch = useAppDispatch();
//   const { courses, loading } = useAppSelector((state) => state.course);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAllCourses());
//   }, [dispatch]);

//   const filteredCourses = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     if (!term) return courses;

//     return courses.filter((course) => {
//       const haystack = [
//         course.title,
//         course.description,
//         course.category,
//         course.level,
//         ...(course.tags || []),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return haystack.includes(term);
//     });
//   }, [courses, search]);

//   return (
//     <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", p: 2 }}>

//       {/* HEADER */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 3,
//           borderRadius: "20px",
//           bgcolor: COLORS.cardBg,
//           border: "1px solid #e2e8f0",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", lg: "row" },
//             justifyContent: "space-between",
//             gap: 2,
//             alignItems: "center",
//           }}
//         >
//           <Box>
//             <Typography variant="h5" fontWeight={800} color={COLORS.textMain}>
//               Course Explorer
//             </Typography>
//             <Typography sx={{ color: COLORS.textSub }}>
//               Search and manage all courses
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//             <Button
//               variant="contained"
//               startIcon={<AddRoundedIcon />}
//               onClick={() => navigate("/teacher/create-course")}
//               sx={{
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 700,
//               }}
//             >
//               Create Course
//             </Button>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 px: 2,
//                 py: 1,
//                 borderRadius: "12px",
//                 bgcolor: "#f8fafc",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <SearchRoundedIcon sx={{ color: "#94a3b8" }} />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search courses..."
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   background: "transparent",
//                   fontSize: 14,
//                 }}
//               />
//             </Box>
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
//           <Chip
//             label={`${filteredCourses.length} results`}
//             sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700 }}
//           />
//           <Chip
//             label={`${courses.length} total courses`}
//             sx={{ bgcolor: "#f8fafc", color: "#334155", fontWeight: 700 }}
//           />
//         </Box>
//       </Paper>

//       {/* LOADING */}
//       {loading ? (
//         <Typography sx={{ color: COLORS.textSub }}>
//           Loading courses...
//         </Typography>
//       ) : courses.length === 0 ? (
//         /* EMPTY STATE */
//         <Paper
//           sx={{
//             p: 5,
//             textAlign: "center",
//             borderRadius: 3,
//             border: "1px dashed #cbd5e1",
//             bgcolor: "#fff",
//           }}
//         >
//           <Typography variant="h6" fontWeight={800}>
//             No courses yet
//           </Typography>

//           <Typography sx={{ color: COLORS.textSub, mt: 1 }}>
//             Create your first course to get started
//           </Typography>

//           <Button
//             variant="contained"
//             startIcon={<AddRoundedIcon />}
//             sx={{ mt: 2, borderRadius: 2 }}
//             onClick={() => navigate("/courses/create")}
//           >
//             Create Course
//           </Button>
//         </Paper>
//       ) : filteredCourses.length === 0 ? (
//         /* NO SEARCH RESULTS */
//         <Paper
//           sx={{
//             p: 5,
//             textAlign: "center",
//             borderRadius: 3,
//             border: "1px dashed #cbd5e1",
//             bgcolor: "#fff",
//           }}
//         >
//           <Typography variant="h6" fontWeight={800}>
//             No matching courses found
//           </Typography>

//           <Typography sx={{ color: COLORS.textSub, mt: 1 }}>
//             Try different keywords
//           </Typography>

//           <Button
//             variant="outlined"
//             sx={{ mt: 2, borderRadius: 2 }}
//             onClick={() => setSearch("")}
//           >
//             Clear Search
//           </Button>
//         </Paper>
//       ) : (
//         /* GRID */
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//               lg: "repeat(4, 1fr)",
//             },
//             gap: 3,
//           }}
//         >
//           {filteredCourses.map((course) => (
//             <CourseCard key={course._id} {...course} />
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  Paper,
  Typography,
  Button,
  CircularProgress,
  alpha,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SparklesIcon from "@mui/icons-material/AutoAwesome"; // Premium asset accent
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/course/CourseCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllCourses } from "../../features/course/courseThunks";
import { clearRecentlyCreatedCourse } from "../../features/course/courseSlice";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#1e293b",
  textSub: "#64748b",
  border: "#e2e8f0",
};

// Premium high-performance layout keyframe animations
const pageReveal = {
  "@keyframes pageReveal": {
    "0%": { opacity: 0, transform: "translateY(12px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  animation: "pageReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
};

const cardStagger = {
  "@keyframes cardStagger": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  animation: "cardStagger 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards",
};

export default function CourseList() {
  const dispatch = useAppDispatch();
  const { courses, loading, recentlyCreatedCourseId } = useAppSelector(
    (state) => state.course,
  );
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (
      !recentlyCreatedCourseId ||
      !courses.some((course) => course._id === recentlyCreatedCourseId)
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(clearRecentlyCreatedCourse());
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [courses, dispatch, recentlyCreatedCourseId]);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return courses;

    return courses.filter((course) => {
      const haystack = [
        course.title,
        course.description,
        course.category,
        course.level,
        ...(course.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [courses, search]);

  return (
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
        p: { xs: 2 },
        ...pageReveal,
      }}
    >
      {/* ================= PREMIUM HEADER CONTROL CENTER ================= */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: "24px",
          bgcolor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(30, 41, 59, 0.04)",
          // Subtle background mesh glow accentuating the premium brand look
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "250px",
            height: "100%",
            background: `radial-gradient(circle at top right, ${alpha(COLORS.primary, 0.07)}, transparent 70%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: 3,
            alignItems: { xs: "flex-start", lg: "center" },
          }}
        >
          {/* Left Side: Branding, Dynamic Workspace Context & Live Pulse Indicator */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5 }}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: alpha(COLORS.primary, 0.08),
                borderRadius: "18px",
                color: COLORS.primary,
                display: "flex",
                boxShadow: `0 8px 16px ${alpha(COLORS.primary, 0.06)}`,
                border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
              }}
            >
              <SparklesIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color={COLORS.textMain}
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  Course Explorer
                </Typography>

                {/* Meaningful Real-time Status Indicator Badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.25,
                    py: 0.4,
                    borderRadius: "20px",
                    bgcolor: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.15)",
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#22c55e",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(0.9)", opacity: 0.6 },
                        "50%": { transform: "scale(1.3)", opacity: 1 },
                        "100%": { transform: "scale(0.9)", opacity: 0.6 },
                      },
                      animation: "pulse 2s infinite ease-in-out",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#166534",
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      fontSize: "0.68rem",
                    }}
                  >
                    Published Courses
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textSub,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  maxWidth: 460,
                }}
              >
                Search, monitor, and deploy educational materials systematically
                across your student channels.
              </Typography>
            </Box>
          </Box>

          {/* Right Side: High-End Glassmorphic Controls Layer */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              width: { xs: "100%", lg: "auto" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.25,
                borderRadius: "16px",
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
                flexGrow: { xs: 1, lg: 0 },
                width: { lg: 340 },
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:focus-within": {
                  bgcolor: "#ffffff",
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 0 4px ${alpha(COLORS.primary, 0.15)}`,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by text index, categories, tags..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                  fontWeight: 550,
                  color: COLORS.textMain,
                  width: "100%",
                }}
              />
            </Box>

            <Button
              variant="contained"
              disableElevation
              startIcon={<AddRoundedIcon />}
              onClick={() => navigate("/teacher/create-course")}
              sx={{
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                px: 3.5,
                py: 1.4,
                bgcolor: COLORS.primary,
                boxShadow: `0 4px 12px ${alpha(COLORS.primary, 0.15)}`,
                transition: "all 0.25s ease",
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  bgcolor: "#0092e4",
                  boxShadow: `0 6px 20px ${alpha(COLORS.primary, 0.35)}`,
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Create Course
            </Button>
          </Box>
        </Box>

        {/* Downward Metadata Segment: High-Fidelity Numeric Data Counter Blocks */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            mt: 3.5,
            pt: 3,
            borderTop: `1px solid #f1f5f9`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: COLORS.textMain,
                fontSize: "1.4rem",
                lineHeight: 1,
              }}
            >
              {filteredCourses.length}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontSize: "0.72rem",
              }}
            >
              Active Query Matches
            </Typography>
          </Box>

          <Box
            sx={{
              width: "1px",
              height: "24px",
              bgcolor: "#e2e8f0",
              display: { xs: "none", sm: "block" },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: COLORS.textMain,
                fontSize: "1.4rem",
                lineHeight: 1,
              }}
            >
              {courses.length}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.textSub,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontSize: "0.72rem",
              }}
            >
              Global Curriculums Managed
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/* ================= DATA CONSUMPTION BLOCK ================= */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 6,
            justifyContent: "center",
          }}
        >
          <CircularProgress size={20} sx={{ color: COLORS.primary }} />
          <Typography
            variant="body2"
            sx={{ color: COLORS.textSub, fontWeight: 600 }}
          >
            Fetching content...
          </Typography>
        </Box>
      ) : courses.length === 0 ? (
        /* INSTANCE: ABSOLUTE EMPTY GRID */
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "24px",
            border: `2px dashed ${COLORS.border}`,
            bgcolor: "transparent",
            ...cardStagger,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={800}
            color={COLORS.textMain}
          >
            No courses listed yet
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: COLORS.textSub, mt: 0.5, mb: 2.5 }}
          >
            Create your master profile and configure your first lesson track.
          </Typography>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddRoundedIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: COLORS.primary,
            }}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </Button>
        </Paper>
      ) : filteredCourses.length === 0 ? (
        /* INSTANCE: EXCLUSION CRITERIA MATCH */
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "24px",
            border: `1px solid ${COLORS.border}`,
            bgcolor: COLORS.cardBg,
            ...cardStagger,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={800}
            color={COLORS.textMain}
          >
            No results match your search parameters
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: COLORS.textSub, mt: 0.5, mb: 2 }}
          >
            Verify alternative keywords or reset filtering syntax constraints.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              borderColor: COLORS.border,
              color: COLORS.textMain,
            }}
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
        </Paper>
      ) : (
        /* PRECISE PRESERVED GRID MECHANICS WITH CASCADE ENTRY STYLING */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            ...cardStagger,
          }}
        >
          {filteredCourses.map((course) => (
            <Box
              key={course._id}
              sx={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CourseCard {...course} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
