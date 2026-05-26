// import { useEffect, useMemo, useState } from "react";
// import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
// import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
// import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import { useNavigate } from "react-router-dom";
// import CourseCard from "../../components/course/CourseCard";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { fetchAllCourses } from "../../features/course/courseThunks";

// const COLORS = {
//   primary: "#00a3ff",
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
//   bannerBlue: "#0ea5e9",
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

//     if (!term) {
//       return courses;
//     }

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

//   const uniqueCategories = new Set(
//     courses.map((course) => course.category?.trim()).filter(Boolean),
//   ).size;

//   return (
//     <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
//       {/* <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 3, md: 4 },
//           mb: 3,
//           borderRadius: "22px",
//           color: "#ffffff",
//           background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 60%, #082f49 100%)",
//           boxShadow: "0 24px 50px rgba(14, 165, 233, 0.22)",
//         }}
//       >
//         <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
//           Discover Premium Courses
//         </Typography>
//         <Typography
//           sx={{
//             maxWidth: 700,
//             color: "rgba(255,255,255,0.86)",
//             lineHeight: 1.7,
//             mb: 3,
//           }}
//         >
//           Browse polished learning paths with better visuals, richer previews, and the same dashboard rhythm used across the platform.
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
//             gap: 2,
//           }}
//         >
//           <Paper elevation={0} sx={{ p: 2, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
//               <SchoolRoundedIcon />
//               <Box>
//                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
//                   Published Courses
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 800 }}>
//                   {courses.filter((course) => course.isPublished).length}
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>

//           <Paper elevation={0} sx={{ p: 2, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
//               <AutoStoriesRoundedIcon />
//               <Box>
//                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
//                   Course Library
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 800 }}>
//                   {courses.length}
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>

//           <Paper elevation={0} sx={{ p: 2, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
//               <LocalOfferRoundedIcon />
//               <Box>
//                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
//                   Categories
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 800 }}>
//                   {uniqueCategories}
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Box>
//       </Paper> */}

//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, md: 3 },
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
//             alignItems: { lg: "center" },
//           }}
//         >
//           <Box>
//             <Typography
//               variant="h5"
//               sx={{ fontWeight: 800, color: COLORS.textMain }}
//             >
//               Course Explorer
//             </Typography>
//             <Typography sx={{ color: COLORS.textSub, mt: 0.5 }}>
//               Search across course names, descriptions, levels, tags, and
//               categories.
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               width: { xs: "100%", lg: 360 },
//               display: "flex",
//               alignItems: "center",
//               gap: 1.25,
//               px: 1.75,
//               py: 1.25,
//               borderRadius: "14px",
//               bgcolor: "#f8fafc",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <SearchRoundedIcon sx={{ color: "#94a3b8" }} />
//             <Box
//               component="input"
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search courses, categories, or tags"
//               sx={{
//                 width: "100%",
//                 border: "none",
//                 outline: "none",
//                 bgcolor: "transparent",
//                 color: "#0f172a",
//                 fontSize: 14,
//                 "&::placeholder": {
//                   color: "#94a3b8",
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
//           <Chip
//             label={`${filteredCourses.length} results`}
//             sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700 }}
//           />
//           <Chip
//             label={`${courses.filter((course) => course.thumbnail).length} with thumbnails`}
//             sx={{ bgcolor: "#f8fafc", color: "#334155", fontWeight: 700 }}
//           />
//         </Box>
//       </Paper>

//       {loading ? (
//         <Typography sx={{ color: COLORS.textSub }}>
//           Loading courses...
//         </Typography>
//       ) : filteredCourses.length === 0 ? (
//         <Paper
//           elevation={0}
//           sx={{
//             p: 5,
//             borderRadius: "20px",
//             textAlign: "center",
//             border: "1px dashed #cbd5e1",
//             bgcolor: "#ffffff",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 800, color: COLORS.textMain, mb: 1 }}
//           >
//             No matching courses found
//           </Typography>
//           <Typography sx={{ color: COLORS.textSub }}>
//             Try a different search term to explore the course library.
//           </Typography>
//         </Paper>
//       ) : (
//         // <Grid container spacing={3}>
//         //   {filteredCourses.map((course) => (
//         //     <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4 as any} key={course._id}>
//         //       <CourseCard {...course} />
//         //     </Grid>
//         //   ))}
//         // </Grid>
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
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/course/CourseCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllCourses } from "../../features/course/courseThunks";

const COLORS = {
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
};

export default function CourseList() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.course);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

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
    <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", p: 2 }}>

      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "20px",
          bgcolor: COLORS.cardBg,
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} color={COLORS.textMain}>
              Course Explorer
            </Typography>
            <Typography sx={{ color: COLORS.textSub }}>
              Search and manage all courses
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => navigate("/teacher/create-course")}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Create Course
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "12px",
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <SearchRoundedIcon sx={{ color: "#94a3b8" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Chip
            label={`${filteredCourses.length} results`}
            sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700 }}
          />
          <Chip
            label={`${courses.length} total courses`}
            sx={{ bgcolor: "#f8fafc", color: "#334155", fontWeight: 700 }}
          />
        </Box>
      </Paper>

      {/* LOADING */}
      {loading ? (
        <Typography sx={{ color: COLORS.textSub }}>
          Loading courses...
        </Typography>
      ) : courses.length === 0 ? (
        /* EMPTY STATE */
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #cbd5e1",
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            No courses yet
          </Typography>

          <Typography sx={{ color: COLORS.textSub, mt: 1 }}>
            Create your first course to get started
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </Button>
        </Paper>
      ) : filteredCourses.length === 0 ? (
        /* NO SEARCH RESULTS */
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #cbd5e1",
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            No matching courses found
          </Typography>

          <Typography sx={{ color: COLORS.textSub, mt: 1 }}>
            Try different keywords
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
        </Paper>
      ) : (
        /* GRID */
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
          }}
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </Box>
      )}
    </Box>
  );
}