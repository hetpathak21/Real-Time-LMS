// import { useEffect, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Alert, Box, Button, Chip, Paper, Typography } from "@mui/material";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
// import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
// import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
// import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
// import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { deleteCourseThunk, fetchCourseById } from "../../features/course/courseThunks";
// import {
//   fetchLessonsByCourse,
//   deleteLessonThunk,
// } from "../../features/lesson/lessonThunks";
// import { useAuth } from "../../hooks/useAuth";
// import { ICourse } from "../../types/courseTypes";
// import { showToast } from "../../utils/toast";

// const COLORS = {
//   bgLight: "#f4f7fd",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
// };

// const getCourseTeacherName = (
//   teacherId?: ICourse["teacherId"],
//   instructor?: ICourse["instructor"],
// ) => {
//   if (typeof instructor === "object") return instructor?.name || "Instructor";
//   if (typeof teacherId === "object") return teacherId?.name || "Instructor";
//   if (typeof instructor === "string") return instructor;
//   return "Instructor";
// };

// export default function CourseDetails() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { user, isAuthenticated, isStudent } = useAuth();
//   const { selectedCourse, loading } = useAppSelector((s) => s.course);
//   const { courseLessons, error: lessonError } = useAppSelector((s) => s.lesson);

//   useEffect(() => {
//     if (courseId) {
//       dispatch(fetchCourseById(courseId));
//       dispatch(fetchLessonsByCourse(courseId));
//     }
//   }, [courseId, dispatch]);

//   const lessons = useMemo(
//     () => [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order)),
//     [courseLessons],
//   );

//   const isTeacherOwner =
//     user?.role === "teacher" &&
//     selectedCourse?.teacherId &&
//     user._id ===
//       (typeof selectedCourse.teacherId === "object"
//         ? selectedCourse.teacherId._id
//         : selectedCourse.teacherId);

//   const teacherName = getCourseTeacherName(
//     selectedCourse?.teacherId,
//     selectedCourse?.instructor,
//   );

//   const handleDeleteLesson = async (lessonId: string) => {
//     await dispatch(deleteLessonThunk(lessonId));
//   };

//   const handleDeleteCourse = async (courseId: string) => {
//     try {
//       await dispatch(deleteCourseThunk(courseId)).unwrap();
//       showToast("Course deleted successfully", "success");
//       navigate("/courses");
//     } catch (err: any) {
//       showToast(err || "Failed to delete course", "error");
//     }
//   };

//   if (loading && !selectedCourse) {
//     return (
//       <Typography sx={{ color: COLORS.textSub }}>Loading course...</Typography>
//     );
//   }

//   if (!selectedCourse) {
//     return (
//       <Typography sx={{ color: COLORS.textSub }}>No course found</Typography>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight, p: 3 }}>
//       {/* HERO */}
//       <Paper
//         sx={{
//           borderRadius: 4,
//           overflow: "hidden",
//           mb: 3,
//           border: "1px solid #e2e8f0",
//         }}
//       >
//         <Box
//           sx={{
//             minHeight: 320,
//             position: "relative",
//             background: selectedCourse.thumbnail
//               ? `url(${selectedCourse.thumbnail}) center/cover`
//               : "linear-gradient(135deg,#0ea5e9,#0369a1,#082f49)",
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
//             }}
//           />

//           <Box
//             sx={{
//               position: "relative",
//               zIndex: 1,
//               p: 4,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               minHeight: 320,
//             }}
//           >
//             {/* TOP ACTIONS */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Chip
//                   label={selectedCourse.isPublished ? "Published" : "Draft"}
//                   sx={{ bgcolor: "#fff", fontWeight: 700 }}
//                 />
//                 <Chip label={selectedCourse.category} sx={{ color: "#fff" }} />
//                 <Chip label={selectedCourse.level} sx={{ color: "#fff" }} />
//               </Box>

//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <Button
//                   startIcon={<ArrowBackRoundedIcon />}
//                   onClick={() => navigate("/courses")}
//                   sx={{ color: "#fff" }}
//                 >
//                   Back
//                 </Button>

//                 {isAuthenticated && isStudent && (
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={() => console.log("Enroll course:", courseId)}
//                     sx={{
//                       borderRadius: 2,
//                       textTransform: "none",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Enroll Now
//                   </Button>
//                 )}

//                 {isTeacherOwner && (
//                   <>
//                     <Button
//                       startIcon={<EditRoundedIcon />}
//                       onClick={() => navigate(`/courses/${courseId}/edit`)}
//                       sx={{ bgcolor: "#fff", color: "#000" }}
//                     >
//                       Edit
//                     </Button>

//                     <Button
//                       size="small"
//                       variant="text"
//                       color="error"
//                       startIcon={<DeleteOutlineRoundedIcon />}
//                       onClick={() => handleDeleteCourse(selectedCourse._id)}
//                       sx={{
//                         color: "#ef4444",
//                         "&:hover": {
//                           bgcolor: "rgba(239, 68, 68, 0.08)",
//                         },
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </>
//                 )}
//               </Box>
//             </Box>

//             {/* TITLE */}
//             <Box>
//               <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800 }}>
//                 {selectedCourse.title}
//               </Typography>

//               <Typography sx={{ color: "#ddd", mt: 1, maxWidth: 700 }}>
//                 {selectedCourse.description}
//               </Typography>
//             </Box>

//             {/* META */}
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(4,1fr)",
//                 gap: 2,
//               }}
//             >
//               <Paper
//                 sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
//               >
//                 Instructor: {teacherName}
//               </Paper>
//               <Paper
//                 sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
//               >
//                 Lessons: {lessons.length}
//               </Paper>
//               <Paper
//                 sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
//               >
//                 Enrolled: {selectedCourse.enrollmentCount || 0}
//               </Paper>
//               <Paper
//                 sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
//               >
//                 Price:{" "}
//                 {selectedCourse.price ? `Rs.${selectedCourse.price}` : "Free"}
//               </Paper>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>

//       {/* MAIN LAYOUT */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
//           gap: 3,
//         }}
//       >
//         {/* LESSON LIST */}
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography fontWeight={800}>Course Lessons</Typography>

//             <Chip
//               icon={<AutoStoriesRoundedIcon />}
//               label={`${lessons.length} lessons`}
//             />
//           </Box>

//           {lessonError && <Alert severity="error">{lessonError}</Alert>}

//           {lessons.length === 0 ? (
//             <Typography sx={{ color: "#64748b" }}>No lessons yet</Typography>
//           ) : (
//             <Box sx={{ display: "grid", gap: 2 }}>
//               {lessons.map((lesson, i) => (
//                 <Paper
//                   key={lesson._id}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <Box>
//                     <Typography fontWeight={700}>
//                       {i + 1}. {lesson.title}
//                     </Typography>

//                     <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                       <Chip size="small" label={lesson.type} />
//                       {lesson.isPreview && (
//                         <Chip size="small" label="Preview" color="success" />
//                       )}
//                     </Box>
//                   </Box>

//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Button
//                       onClick={() => navigate(`/lesson/${lesson._id}`)}
//                       variant="contained"
//                       size="small"
//                     >
//                       Open
//                     </Button>

//                     {isTeacherOwner && (
//                       <Button
//                         onClick={() => handleDeleteLesson(lesson._id)}
//                         color="error"
//                         size="small"
//                       >
//                         Delete
//                       </Button>
//                     )}
//                   </Box>
//                 </Paper>
//               ))}
//             </Box>
//           )}
//         </Paper>

//         {/* SIDEBAR */}
//         <Box sx={{ display: "grid", gap: 2 }}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography fontWeight={800}>Course Snapshot</Typography>

//             <Box sx={{ mt: 2 }}>
//               <Typography>Level: {selectedCourse.level}</Typography>
//               <Typography>Category: {selectedCourse.category}</Typography>
//             </Box>
//           </Paper>

//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography fontWeight={800}>Manage</Typography>

//             {isTeacherOwner ? (
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 2 }}
//                 onClick={() => navigate(`/courses/${courseId}/lessons/create`)}
//               >
//                 + Create Lesson
//               </Button>
//             ) : (
//               <Typography sx={{ color: "#64748b", mt: 2 }}>
//                 Only instructor can manage lessons
//               </Typography>
//             )}
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



//----v2

import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Chip, Paper, Typography, alpha, Stack, Divider } from "@mui/material";

// Performance direct path imports to avoid Vite pre-bundling warnings
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCourseThunk, fetchCourseById } from "../../features/course/courseThunks";
import { fetchLessonsByCourse, deleteLessonThunk } from "../../features/lesson/lessonThunks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";
import { showToast } from "../../utils/toast";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#1e293b",
  textSub: "#64748b",
  border: "#e2e8f0",
};

// Premium micro-stagger screen entry animations
const fadeInUp = {
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(16px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
};

const getCourseTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"]
) => {
  if (typeof instructor === "object") return instructor?.name || "Instructor";
  if (typeof teacherId === "object") return teacherId?.name || "Instructor";
  if (typeof instructor === "string") return instructor;
  return "Instructor";
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isStudent } = useAuth();
  const { selectedCourse, loading } = useAppSelector((s) => s.course);
  const { courseLessons, error: lessonError } = useAppSelector((s) => s.lesson);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchLessonsByCourse(courseId));
    }
  }, [courseId, dispatch]);

  const lessons = useMemo(
    () => [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order)),
    [courseLessons]
  );

  const isTeacherOwner =
    user?.role === "teacher" &&
    selectedCourse?.teacherId &&
    user._id ===
      (typeof selectedCourse.teacherId === "object"
        ? selectedCourse.teacherId._id
        : selectedCourse.teacherId);

  const teacherName = getCourseTeacherName(
    selectedCourse?.teacherId,
    selectedCourse?.instructor
  );

  const handleDeleteLesson = async (lessonId: string) => {
    await dispatch(deleteLessonThunk(lessonId));
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await dispatch(deleteCourseThunk(courseId)).unwrap();
      showToast("Course deleted successfully", "success");
      navigate("/courses");
    } catch (err: any) {
      showToast(err || "Failed to delete course", "error");
    }
  };

  if (loading && !selectedCourse) {
    return (
      <Box sx={{ display: "flex", p: 6, justifyContent: "center", bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
        <Typography sx={{ color: COLORS.textSub, fontWeight: 600 }}>Syncing course configuration...</Typography>
      </Box>
    );
  }

  if (!selectedCourse) {
    return (
      <Box sx={{ display: "flex", p: 6, justifyContent: "center", bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
        <Typography sx={{ color: COLORS.textSub, fontWeight: 600 }}>Requested curriculum parameters not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight, p: { xs: 2, md: 4 }, ...fadeInUp }}>
      
      {/* ================= CINEMATIC HERO BANNER ================= */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          mb: 4,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 10px 30px rgba(30, 41, 59, 0.04)",
        }}
      >
        <Box
          sx={{
            minHeight: { xs: 400, md: 360 },
            position: "relative",
            backgroundImage: selectedCourse.thumbnail
              ? `url(${selectedCourse.thumbnail})`
              : "linear-gradient(135deg, #770cea, #00a3ff, #0f172a)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Strict contrast density gradient lens overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%)",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: 400, md: 360 },
            }}
          >
            {/* Top Bar Actions Layer */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={selectedCourse.isPublished ? "Live" : "Draft"}
                  size="small"
                  sx={{
                    bgcolor: selectedCourse.isPublished ? "#dcfce7" : "#f1f5f9",
                    color: selectedCourse.isPublished ? "#15803d" : COLORS.textSub,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                />
                <Chip label={selectedCourse.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }} />
                <Chip label={selectedCourse.level} size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }} />
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => navigate("/courses")}
                  sx={{ color: "#fff", textTransform: "none", fontWeight: 600 }}
                >
                  Back
                </Button>

                {isAuthenticated && isStudent && (
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => console.log("Enroll course:", courseId)}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 3,
                      bgcolor: COLORS.primary,
                      "&:hover": { bgcolor: "#0092e4" },
                    }}
                  >
                    Enroll Now
                  </Button>
                )}

                {isTeacherOwner && (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      disableElevation
                      startIcon={<EditRoundedIcon />}
                      onClick={() => navigate(`/courses/${courseId}/edit`)}
                      sx={{ bgcolor: "#ffffff", color: COLORS.textMain, fontWeight: 700, borderRadius: "12px", textTransform: "none", "&:hover": { bgcolor: "#f1f5f9" } }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="text"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => handleDeleteCourse(selectedCourse._id)}
                      sx={{ color: "#f87171", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "rgba(248, 113, 113, 0.08)" } }}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>

            {/* Title & Description Stack */}
            <Box sx={{ my: { xs: 3, md: 0 } }}>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800, letterSpacing: "-0.02em", mb: 1, fontSize: { xs: "2rem", md: "2.75rem" } }}>
                {selectedCourse.title}
              </Typography>
              <Typography sx={{ color: "rgba(241, 245, 249, 0.8)", maxWidth: 720, lineHeight: 1.5, fontSize: "0.95rem" }}>
                {selectedCourse.description}
              </Typography>
            </Box>

            {/* High-Contrast Integrated Snap Counters Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                gap: 2,
                mt: 1,
              }}
            >
              {[
                { label: "Instructor", val: teacherName, icon: <SchoolRoundedIcon sx={{ fontSize: 18 }} /> },
                { label: "Total Lessons", val: `${lessons.length} Chapters`, icon: <AutoStoriesRoundedIcon sx={{ fontSize: 18 }} /> },
                { label: "Learners Enrolled", val: selectedCourse.enrollmentCount || 0, icon: <AccessTimeRoundedIcon sx={{ fontSize: 18 }} /> },
                { label: "Program Value", val: selectedCourse.price ? `Rs. ${selectedCourse.price}` : "Free Track", icon: <LocalAtmRoundedIcon sx={{ fontSize: 18 }} /> },
              ].map((metric, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.75,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ color: COLORS.primary, display: "flex" }}>{metric.icon}</Box>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.6, textTransform: "uppercase", fontWeight: 700, fontSize: "0.65rem", letterSpacing: 0.5 }}>
                      {metric.label}
                    </Typography>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
                      {metric.val}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ================= GRID CONTENT WORKSPACE ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2.2fr 0.8fr" },
          gap: 3,
        }}
      >
        {/* Left Hand: Core Curriculum Chapters Block */}
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: "20px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.cardBg }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight={800} color={COLORS.textMain}>
              Course Outline
            </Typography>
            <Chip
              icon={<AutoStoriesRoundedIcon sx={{ fontSize: "14px !important", color: `${COLORS.primary} !important` }} />}
              label={`${lessons.length} Modules`}
              sx={{ fontWeight: 700, bgcolor: alpha(COLORS.primary, 0.08), color: COLORS.primary }}
            />
          </Box>

          {lessonError && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>{lessonError}</Alert>}

          {lessons.length === 0 ? (
            <Box sx={{ py: 6, textAlign: "center", border: `2px dashed ${COLORS.border}`, borderRadius: "16px" }}>
              <Typography sx={{ color: COLORS.textSub, fontWeight: 500 }}>No lecture modules compiled for this track yet.</Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {lessons.map((lesson, i) => (
                <Paper
                  key={lesson._id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: `1px solid ${COLORS.border}`,
                    bgcolor: "#f8fafc",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "#ffffff",
                      borderColor: alpha(COLORS.primary, 0.3),
                      boxShadow: "0 6px 16px rgba(0,0,0,0.02)",
                    },
                  }}
                >
                  <Box>
                    <Typography fontWeight={700} color={COLORS.textMain} sx={{ fontSize: "0.95rem" }}>
                      {String(i + 1).padStart(2, "0")}. {lesson.title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip size="small" label={lesson.type} sx={{ fontWeight: 600, height: 20, fontSize: "0.7rem", bgcolor: COLORS.border }} />
                      {lesson.isPreview && (
                        <Chip size="small" label="Free Preview" color="success" variant="outlined" sx={{ fontWeight: 700, height: 20, fontSize: "0.7rem" }} />
                      )}
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Button
                      onClick={() => navigate(`/lesson/${lesson._id}`)}
                      variant="contained"
                      disableElevation
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 700,
                        bgcolor: alpha(COLORS.primary, 0.1),
                        color: COLORS.primary,
                        "&:hover": { bgcolor: COLORS.primary, color: "#fff" },
                      }}
                    >
                      Open
                    </Button>

                    {isTeacherOwner && (
                      <Button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        color="error"
                        size="small"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        Delete
                      </Button>
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Right Hand: Context Control Action Sidebar */}
        <Stack spacing={3}>
          {/* Classification Context Meta Snapshot */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.cardBg }}>
            <Typography fontWeight={800} color={COLORS.textMain} sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <InfoOutlinedIcon sx={{ fontSize: 18, color: COLORS.primary }} />
              Classification
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color={COLORS.textSub} fontWeight={500}>Target Level:</Typography>
                <Typography variant="body2" color={COLORS.textMain} fontWeight={700}>{selectedCourse.level || "Beginner"}</Typography>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color={COLORS.textSub} fontWeight={500}>Category Tag:</Typography>
                <Typography variant="body2" color={COLORS.textMain} fontWeight={700}>{selectedCourse.category}</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Infrastructure Operations Terminal Box */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: `1px solid ${COLORS.border}`, bgcolor: COLORS.cardBg }}>
            <Typography fontWeight={800} color={COLORS.textMain} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SecurityRoundedIcon sx={{ fontSize: 18, color: isTeacherOwner ? "#22c55e" : COLORS.textSub }} />
              Operations Panel
            </Typography>

            {isTeacherOwner ? (
              <Button
                fullWidth
                variant="contained"
                disableElevation
                startIcon={<AddRoundedIcon />}
                onClick={() => navigate(`/courses/${courseId}/lessons/create`)}
                sx={{
                  py: 1.25,
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  bgcolor: COLORS.primary,
                  color:"white",
                  "&:hover": { bgcolor: "#0092e4" },
                }}
              >
                Create Lesson
              </Button>
            ) : (
              <Typography variant="body2" sx={{ color: COLORS.textSub, fontWeight: 500, lineHeight: 1.4 }}>
                Write privileges locked. Only assigned profile coordinators can deploy modules to this directory.
              </Typography>
            )}
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
