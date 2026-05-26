// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Alert,
//   Box,
//   Button,
//   Chip,
//   Divider,
//   Grid,
//   MenuItem,
//   Paper,
//   Switch,
//   TextField,
//   Typography,
// } from "@mui/material";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
// import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
// import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
// import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
// import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
// import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { fetchCourseById } from "../../features/course/courseThunks";
// import {
//   createLessonThunk,
//   deleteLessonThunk,
//   fetchLessonsByCourse,
// } from "../../features/lesson/lessonThunks";
// import { useAuth } from "../../hooks/useAuth";
// import { LessonType } from "../../types/lessonTypes";
// import { showToast } from "../../utils/toast";
// import { ICourse } from "../../types/courseTypes";

// const COLORS = {
//   primary: "#00a3ff",
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
// };

// const initialLessonForm = {
//   title: "",
//   type: "video" as LessonType,
//   file: null as File | null,
//   contentUrl: "",
//   order: "",
//   duration: "",
//   isPreview: false,
// };

// const lessonTypes: LessonType[] = ["video", "pdf", "text", "link"];

// const getCourseTeacherId = (teacherId?: ICourse["teacherId"]) => {
//   if (typeof teacherId === "object") {
//     return teacherId?._id;
//   }

//   return teacherId;
// };

// const getCourseTeacherName = (
//   teacherId?: ICourse["teacherId"],
//   instructor?: ICourse["instructor"]
// ) => {
//   if (typeof instructor === "object") {
//     return instructor?.name || "Instructor";
//   }

//   if (typeof teacherId === "object") {
//     return teacherId?.name || "Instructor";
//   }

//   if (typeof instructor === "string" && instructor.trim()) {
//     return instructor;
//   }

//   return "Instructor";
// };

// export default function CourseDetails() {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const dispatch = useAppDispatch();
//   const { user } = useAuth();
//   const { selectedCourse, loading } = useAppSelector((state) => state.course);
//   const {
//     courseLessons,
//     loading: lessonLoading,
//     error: lessonError,
//   } = useAppSelector((state) => state.lesson);
//   const [lessonForm, setLessonForm] = useState(initialLessonForm);

//   useEffect(() => {
//     if (courseId) {
//       dispatch(fetchCourseById(courseId));
//       dispatch(fetchLessonsByCourse(courseId));
//     }
//   }, [courseId, dispatch]);

//   const teacherId = getCourseTeacherId(selectedCourse?.teacherId);
//   const isTeacherOwner =
//     user?.role === "teacher" && !!teacherId && user._id === teacherId;

//   const teacherName = getCourseTeacherName(
//     selectedCourse?.teacherId,
//     selectedCourse?.instructor
//   );

//   const lessons = useMemo(
//     () => [...courseLessons].sort((a, b) => Number(a.order) - Number(b.order)),
//     [courseLessons]
//   );

//   const handleCreateLesson = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!courseId) {
//       return;
//     }

//     if (!lessonForm.title.trim()) {
//       showToast("Lesson title is required", "warning");
//       return;
//     }

//     if (lessonForm.file && lessonForm.isPreview) {
//       showToast(
//         "Preview lessons with uploaded files are not supported by current backend validation. Use a content URL or turn preview off.",
//         "warning"
//       );
//       return;
//     }

//     try {
//       await dispatch(
//         createLessonThunk({
//           courseId,
//           data: {
//             title: lessonForm.title.trim(),
//             type: lessonForm.type,
//             content: lessonForm.file,
//             contentUrl: lessonForm.contentUrl.trim() || undefined,
//             order: lessonForm.order ? Number(lessonForm.order) : undefined,
//             duration: lessonForm.duration ? Number(lessonForm.duration) : undefined,
//             isPreview: lessonForm.isPreview,
//           },
//         })
//       ).unwrap();

//       showToast("Lesson created successfully", "success");
//       setLessonForm(initialLessonForm);
//     } catch (err: any) {
//       showToast(err || "Failed to create lesson", "error");
//     }
//   };

//   const handleDeleteLesson = async (lessonId: string) => {
//     try {
//       await dispatch(deleteLessonThunk(lessonId)).unwrap();
//       showToast("Lesson deleted successfully", "success");
//     } catch (err: any) {
//       showToast(err || "Failed to delete lesson", "error");
//     }
//   };

//   if (loading && !selectedCourse) {
//     return <Typography sx={{ color: COLORS.textSub }}>Loading course...</Typography>;
//   }

//   if (!selectedCourse) {
//     return <Typography sx={{ color: COLORS.textSub }}>No course found</Typography>;
//   }

//   return (
//     <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh" }}>
//       <Paper
//         elevation={0}
//         sx={{
//           mb: 3,
//           overflow: "hidden",
//           borderRadius: "24px",
//           border: "1px solid #dbeafe",
//           background: "#ffffff",
//           boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
//         }}
//       >
//         <Box
//           sx={{
//             minHeight: { xs: 280, md: 380 },
//             position: "relative",
//             background: selectedCourse.thumbnail
//               ? `url(${selectedCourse.thumbnail}) center/cover no-repeat`
//               : "linear-gradient(135deg, #0ea5e9 0%, #0369a1 58%, #082f49 100%)",
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.82) 100%)",
//             }}
//           />

//           <Box
//             sx={{
//               position: "relative",
//               zIndex: 1,
//               p: { xs: 3, md: 4 },
//               minHeight: { xs: 280, md: 380 },
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 gap: 2,
//                 flexWrap: "wrap",
//               }}
//             >
//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Chip
//                   label={selectedCourse.isPublished ? "Published" : "Draft"}
//                   sx={{
//                     bgcolor: selectedCourse.isPublished ? "#dcfce7" : "rgba(255,255,255,0.18)",
//                     color: selectedCourse.isPublished ? "#166534" : "#ffffff",
//                     fontWeight: 700,
//                   }}
//                 />
//                 {selectedCourse.category ? (
//                   <Chip
//                     label={selectedCourse.category}
//                     sx={{
//                       bgcolor: "rgba(255,255,255,0.14)",
//                       color: "#ffffff",
//                       fontWeight: 700,
//                       border: "1px solid rgba(255,255,255,0.18)",
//                     }}
//                   />
//                 ) : null}
//                 {selectedCourse.level ? (
//                   <Chip
//                     label={selectedCourse.level}
//                     sx={{
//                       bgcolor: "rgba(255,255,255,0.14)",
//                       color: "#ffffff",
//                       fontWeight: 700,
//                       textTransform: "capitalize",
//                       border: "1px solid rgba(255,255,255,0.18)",
//                     }}
//                   />
//                 ) : null}
//               </Box>

//               <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
//                 <Button
//                   variant="outlined"
//                   startIcon={<ArrowBackRoundedIcon />}
//                   onClick={() => navigate("/courses")}
//                   sx={{
//                     color: "#ffffff",
//                     borderColor: "rgba(255,255,255,0.38)",
//                     borderRadius: "14px",
//                     textTransform: "none",
//                     fontWeight: 700,
//                   }}
//                 >
//                   Back
//                 </Button>

//                 {isTeacherOwner ? (
//                   <Button
//                     variant="contained"
//                     startIcon={<EditRoundedIcon />}
//                     onClick={() => navigate(`/courses/${courseId}/edit`)}
//                     sx={{
//                       borderRadius: "14px",
//                       textTransform: "none",
//                       fontWeight: 700,
//                       bgcolor: "#ffffff",
//                       color: "#0f172a",
//                     }}
//                   >
//                     Edit Course
//                   </Button>
//                 ) : null}
//               </Box>
//             </Box>

//             <Box sx={{ maxWidth: 760 }}>
//               <Typography
//                 variant="h3"
//                 sx={{
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   letterSpacing: "-0.04em",
//                   lineHeight: 1.1,
//                   mb: 1.5,
//                   fontSize: { xs: "2rem", md: "3rem" },
//                 }}
//               >
//                 {selectedCourse.title}
//               </Typography>

//               <Typography
//                 sx={{
//                   color: "rgba(255,255,255,0.84)",
//                   lineHeight: 1.8,
//                   mb: 3,
//                   maxWidth: 680,
//                 }}
//               >
//                 {selectedCourse.description}
//               </Typography>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" },
//                   gap: 1.5,
//                 }}
//               >
//                 <Paper elevation={0} sx={{ p: 1.75, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.12)", color: "#ffffff" }}>
//                   <Typography variant="caption" sx={{ opacity: 0.78, fontWeight: 700 }}>
//                     Instructor
//                   </Typography>
//                   <Typography sx={{ fontWeight: 700 }}>{teacherName}</Typography>
//                 </Paper>
//                 <Paper elevation={0} sx={{ p: 1.75, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.12)", color: "#ffffff" }}>
//                   <Typography variant="caption" sx={{ opacity: 0.78, fontWeight: 700 }}>
//                     Lessons
//                   </Typography>
//                   <Typography sx={{ fontWeight: 700 }}>{lessons.length}</Typography>
//                 </Paper>
//                 <Paper elevation={0} sx={{ p: 1.75, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.12)", color: "#ffffff" }}>
//                   <Typography variant="caption" sx={{ opacity: 0.78, fontWeight: 700 }}>
//                     Enrolled
//                   </Typography>
//                   <Typography sx={{ fontWeight: 700 }}>{selectedCourse.enrollmentCount || 0}</Typography>
//                 </Paper>
//                 <Paper elevation={0} sx={{ p: 1.75, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.12)", color: "#ffffff" }}>
//                   <Typography variant="caption" sx={{ opacity: 0.78, fontWeight: 700 }}>
//                     Price
//                   </Typography>
//                   <Typography sx={{ fontWeight: 700 }}>
//                     {selectedCourse.price ? `Rs. ${selectedCourse.price}` : "Free"}
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>

//     <Box
//   sx={{
//     display: "grid",
//     gridTemplateColumns: {
//       xs: "1fr",
//       lg: "2fr 1fr",
//     },
//     gap: 3,
//   }}
// >
//         <Grid size={{ xs: 12, lg: 8 }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 2.5, md: 3 },
//               borderRadius: "22px",
//               bgcolor: COLORS.cardBg,
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: { sm: "center" },
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 1.5,
//                 mb: 2.5,
//               }}
//             >
//               <Box>
//                 <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.textMain }}>
//                   Course Curriculum
//                 </Typography>
//                 <Typography sx={{ color: COLORS.textSub, mt: 0.5 }}>
//                   Structured modules for this learning journey.
//                 </Typography>
//               </Box>

//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Chip
//                   icon={<AutoStoriesRoundedIcon />}
//                   label={`${lessons.length} lessons`}
//                   sx={{ bgcolor: "#eff6ff", color: "#0369a1", fontWeight: 700 }}
//                 />
//                 <Chip
//                   icon={<SchoolRoundedIcon />}
//                   label={`${selectedCourse.enrollmentCount || 0} learners`}
//                   sx={{ bgcolor: "#f8fafc", color: "#334155", fontWeight: 700 }}
//                 />
//               </Box>
//             </Box>

//             {lessonError ? (
//               <Alert severity="error" sx={{ mb: 2.5, borderRadius: "14px" }}>
//                 {lessonError}
//               </Alert>
//             ) : null}

//             {lessonLoading && lessons.length === 0 ? (
//               <Typography sx={{ color: COLORS.textSub }}>Loading lessons...</Typography>
//             ) : lessons.length === 0 ? (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,
//                   textAlign: "center",
//                   borderRadius: "18px",
//                   bgcolor: "#f8fafc",
//                   border: "1px dashed #cbd5e1",
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 1 }}>
//                   No lessons added yet
//                 </Typography>
//                 <Typography sx={{ color: COLORS.textSub }}>
//                   {isTeacherOwner
//                     ? "Use the right-side panel to create the first lesson for this course."
//                     : "This course does not have visible lesson content yet."}
//                 </Typography>
//               </Paper>
//             ) : (
//               <Box sx={{ display: "grid", gap: 2 }}>
//                 {lessons.map((lesson, index) => (
//                   <Paper
//                     key={lesson._id}
//                     elevation={0}
//                     sx={{
//                       p: 2.25,
//                       borderRadius: "18px",
//                       border: "1px solid #e2e8f0",
//                       bgcolor: "#ffffff",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       "&:hover": {
//                         transform: "translateY(-3px)",
//                         boxShadow: "0 16px 36px rgba(15, 23, 42, 0.07)",
//                       },
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         gap: 2,
//                         flexDirection: { xs: "column", md: "row" },
//                       }}
//                     >
//                       <Box sx={{ display: "flex", gap: 1.5 }}>
//                         <Box
//                           sx={{
//                             width: 48,
//                             height: 48,
//                             borderRadius: "14px",
//                             bgcolor: "#e0f2fe",
//                             color: "#0284c7",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontWeight: 800,
//                             flexShrink: 0,
//                           }}
//                         >
//                           {index + 1}
//                         </Box>

//                         <Box>
//                           <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
//                             <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
//                               {lesson.title}
//                             </Typography>
//                             <Chip
//                               label={lesson.type.toUpperCase()}
//                               size="small"
//                               sx={{ bgcolor: "#f8fafc", color: "#334155", fontWeight: 700 }}
//                             />
//                             {lesson.isPreview ? (
//                               <Chip
//                                 label="Preview"
//                                 size="small"
//                                 sx={{ bgcolor: "#dcfce7", color: "#166534", fontWeight: 700 }}
//                               />
//                             ) : null}
//                           </Box>

//                           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", color: COLORS.textSub }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//                               <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
//                               <Typography variant="body2">
//                                 {lesson.duration ? `${lesson.duration} mins` : "No duration"}
//                               </Typography>
//                             </Box>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//                               <PlayCircleRoundedIcon sx={{ fontSize: 18 }} />
//                               <Typography variant="body2">
//                                 {lesson.contentUrl ? "Content attached" : "No content URL"}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </Box>
//                       </Box>

//                       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
//                         <Button
//                           variant="contained"
//                           onClick={() => navigate(`/lesson/${lesson._id}`)}
//                           sx={{
//                             borderRadius: "12px",
//                             textTransform: "none",
//                             fontWeight: 700,
//                             background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
//                           }}
//                         >
//                           Open Lesson
//                         </Button>

//                         {isTeacherOwner ? (
//                           <Button
//                             color="error"
//                             variant="outlined"
//                             startIcon={<DeleteOutlineRoundedIcon />}
//                             onClick={() => handleDeleteLesson(lesson._id)}
//                             sx={{
//                               borderRadius: "12px",
//                               textTransform: "none",
//                               fontWeight: 700,
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         ) : null}
//                       </Box>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         <Grid size={{ xs: 12, lg: 4 }}>
//           <Box sx={{ display: "grid", gap: 3 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: "22px",
//                 bgcolor: "#ffffff",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 0.75 }}>
//                 Course Snapshot
//               </Typography>
//               <Typography sx={{ color: COLORS.textSub, mb: 2.5 }}>
//                 A quick summary in the same visual system as the dashboard.
//               </Typography>

//               <Box sx={{ display: "grid", gap: 1.5 }}>
//                 <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
//                   <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 700 }}>
//                     Tags
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
//                     {(selectedCourse.tags && selectedCourse.tags.length > 0
//                       ? selectedCourse.tags
//                       : ["General"]).map((tag) => (
//                       <Chip key={tag} label={tag} size="small" sx={{ fontWeight: 700 }} />
//                     ))}
//                   </Box>
//                 </Paper>

//                 <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
//                   <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 700 }}>
//                     Learning Level
//                   </Typography>
//                   <Typography sx={{ color: "#0f172a", fontWeight: 700, textTransform: "capitalize", mt: 0.5 }}>
//                     {selectedCourse.level || "Beginner"}
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Paper>

//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: "22px",
//                 bgcolor: "#ffffff",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 0.75 }}>
//                 {isTeacherOwner ? "Create Lesson" : "Course Access"}
//               </Typography>
//               <Typography sx={{ color: COLORS.textSub, mb: 2.5 }}>
//                 {isTeacherOwner
//                   ? "Add a new lesson module without changing the backend contract."
//                   : "You can open and continue with available lessons from the curriculum list."}
//               </Typography>

//               {isTeacherOwner ? (
//                 <Box component="form" onSubmit={handleCreateLesson}>
//                   <Box sx={{ display: "grid", gap: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Lesson title"
//                       value={lessonForm.title}
//                       onChange={(event) =>
//                         setLessonForm((prev) => ({
//                           ...prev,
//                           title: event.target.value,
//                         }))
//                       }
//                       sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
//                     />

//                     <TextField
//                       fullWidth
//                       select
//                       label="Lesson type"
//                       value={lessonForm.type}
//                       onChange={(event) =>
//                         setLessonForm((prev) => ({
//                           ...prev,
//                           type: event.target.value as LessonType,
//                         }))
//                       }
//                       sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
//                     >
//                       {lessonTypes.map((type) => (
//                         <MenuItem key={type} value={type}>
//                           {type.toUpperCase()}
//                         </MenuItem>
//                       ))}
//                     </TextField>

//                     <TextField
//                       fullWidth
//                       label="Content URL"
//                       value={lessonForm.contentUrl}
//                       onChange={(event) =>
//                         setLessonForm((prev) => ({
//                           ...prev,
//                           contentUrl: event.target.value,
//                         }))
//                       }
//                       helperText="Optional for hosted videos, docs, or external links."
//                       sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
//                     />

//                     <Button
//                       variant="outlined"
//                       component="label"
//                       startIcon={<UploadFileRoundedIcon />}
//                       sx={{
//                         borderRadius: "14px",
//                         py: 1.3,
//                         textTransform: "none",
//                         fontWeight: 700,
//                         borderStyle: "dashed",
//                       }}
//                     >
//                       Upload Lesson File
//                       <input
//                         hidden
//                         type="file"
//                         accept="video/*,.pdf,.doc,.docx,.ppt,.pptx"
//                         onChange={(event) => {
//                           const file = event.target.files?.[0] || null;

//                           setLessonForm((prev) => ({
//                             ...prev,
//                             file,
//                           }));
//                         }}
//                       />
//                     </Button>

//                     {lessonForm.file ? (
//                       <Typography variant="caption" sx={{ color: "#0369a1", fontWeight: 700 }}>
//                         Selected file: {lessonForm.file.name}
//                       </Typography>
//                     ) : null}

//                     <Grid container spacing={2}>
//                       <Grid size={{ xs: 6 }}>
//                         <TextField
//                           fullWidth
//                           label="Order"
//                           type="number"
//                           value={lessonForm.order}
//                           onChange={(event) =>
//                             setLessonForm((prev) => ({
//                               ...prev,
//                               order: event.target.value,
//                             }))
//                           }
//                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
//                         />
//                       </Grid>

//                       <Grid size={{ xs: 6 }}>
//                         <TextField
//                           fullWidth
//                           label="Duration"
//                           type="number"
//                           value={lessonForm.duration}
//                           onChange={(event) =>
//                             setLessonForm((prev) => ({
//                               ...prev,
//                               duration: event.target.value,
//                             }))
//                           }
//                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
//                         />
//                       </Grid>
//                     </Grid>

//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 1.5,
//                         borderRadius: "16px",
//                         bgcolor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box>
//                         <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
//                           Preview lesson
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: COLORS.textSub }}>
//                           Preview works cleanly with URL-based content today.
//                         </Typography>
//                       </Box>
//                       <Switch
//                         checked={lessonForm.isPreview}
//                         onChange={(event) =>
//                           setLessonForm((prev) => ({
//                             ...prev,
//                             isPreview: event.target.checked,
//                           }))
//                         }
//                       />
//                     </Paper>

//                     <Divider />

//                     <Button
//                       type="submit"
//                       variant="contained"
//                       fullWidth
//                       sx={{
//                         borderRadius: "14px",
//                         py: 1.3,
//                         textTransform: "none",
//                         fontWeight: 700,
//                         background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
//                         boxShadow: "0 14px 26px rgba(14, 165, 233, 0.24)",
//                       }}
//                     >
//                       Add Lesson
//                     </Button>
//                   </Box>
//                 </Box>
//               ) : (
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: "18px",
//                     bgcolor: "#f8fafc",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <Typography sx={{ color: COLORS.textSub, lineHeight: 1.7 }}>
//                     Students can open visible lessons from the curriculum list on the left. Teachers who own the course can manage lessons from this panel.
//                   </Typography>
//                 </Paper>
//               )}
//             </Paper>
//           </Box>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Chip, Paper, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCourseById } from "../../features/course/courseThunks";
import {
  fetchLessonsByCourse,
  deleteLessonThunk,
} from "../../features/lesson/lessonThunks";
import { useAuth } from "../../hooks/useAuth";
import { ICourse } from "../../types/courseTypes";

const COLORS = {
  bgLight: "#f4f7fd",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
};

const getCourseTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"],
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
    [courseLessons],
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
    selectedCourse?.instructor,
  );

  const handleDeleteLesson = async (lessonId: string) => {
    await dispatch(deleteLessonThunk(lessonId));
  };

  if (loading && !selectedCourse) {
    return (
      <Typography sx={{ color: COLORS.textSub }}>Loading course...</Typography>
    );
  }

  if (!selectedCourse) {
    return (
      <Typography sx={{ color: COLORS.textSub }}>No course found</Typography>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight, p: 3 }}>
      {/* HERO */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 3,
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            minHeight: 320,
            position: "relative",
            background: selectedCourse.thumbnail
              ? `url(${selectedCourse.thumbnail}) center/cover`
              : "linear-gradient(135deg,#0ea5e9,#0369a1,#082f49)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 320,
            }}
          >
            {/* TOP ACTIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label={selectedCourse.isPublished ? "Published" : "Draft"}
                  sx={{ bgcolor: "#fff", fontWeight: 700 }}
                />
                <Chip label={selectedCourse.category} sx={{ color: "#fff" }} />
                <Chip label={selectedCourse.level} sx={{ color: "#fff" }} />
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => navigate("/courses")}
                  sx={{ color: "#fff" }}
                >
                  Back
                </Button>

                {isAuthenticated && isStudent && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => console.log("Enroll course:", _id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Enroll Now
                  </Button>
                )}

                {isTeacherOwner && (
                  <Button
                    startIcon={<EditRoundedIcon />}
                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                    sx={{ bgcolor: "#fff", color: "#000" }}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </Box>

            {/* TITLE */}
            <Box>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800 }}>
                {selectedCourse.title}
              </Typography>

              <Typography sx={{ color: "#ddd", mt: 1, maxWidth: 700 }}>
                {selectedCourse.description}
              </Typography>
            </Box>

            {/* META */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 2,
              }}
            >
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Instructor: {teacherName}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Lessons: {lessons.length}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Enrolled: {selectedCourse.enrollmentCount || 0}
              </Paper>
              <Paper
                sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Price:{" "}
                {selectedCourse.price ? `Rs.${selectedCourse.price}` : "Free"}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* MAIN LAYOUT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* LESSON LIST */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography fontWeight={800}>Course Lessons</Typography>

            <Chip
              icon={<AutoStoriesRoundedIcon />}
              label={`${lessons.length} lessons`}
            />
          </Box>

          {lessonError && <Alert severity="error">{lessonError}</Alert>}

          {lessons.length === 0 ? (
            <Typography sx={{ color: "#64748b" }}>No lessons yet</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {lessons.map((lesson, i) => (
                <Paper
                  key={lesson._id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Box>
                    <Typography fontWeight={700}>
                      {i + 1}. {lesson.title}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Chip size="small" label={lesson.type} />
                      {lesson.isPreview && (
                        <Chip size="small" label="Preview" color="success" />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      onClick={() => navigate(`/lesson/${lesson._id}`)}
                      variant="contained"
                      size="small"
                    >
                      Open
                    </Button>

                    {isTeacherOwner && (
                      <Button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>

        {/* SIDEBAR */}
        <Box sx={{ display: "grid", gap: 2 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={800}>Course Snapshot</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography>Level: {selectedCourse.level}</Typography>
              <Typography>Category: {selectedCourse.category}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={800}>Manage</Typography>

            {isTeacherOwner ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/courses/${courseId}/lessons/create`)}
              >
                + Create Lesson
              </Button>
            ) : (
              <Typography sx={{ color: "#64748b", mt: 2 }}>
                Only instructor can manage lessons
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
