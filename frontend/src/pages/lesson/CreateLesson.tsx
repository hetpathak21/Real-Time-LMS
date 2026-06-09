// import { useState } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Paper,
//   TextField,
//   Typography,
//   Switch,
//   Divider,
//   Chip,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAppDispatch } from "../../app/hooks";
// import { createLessonThunk } from "../../features/lesson/lessonThunks";
// import { LessonType } from "../../types/lessonTypes";
// import { showToast } from "../../utils/toast";

// const lessonTypes: LessonType[] = ["video", "pdf", "text", "link"];

// export default function CreateLesson() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [contentMode, setContentMode] = useState<"url" | "file">("url");

//   const [form, setForm] = useState({
//     title: "",
//     type: "video" as LessonType,
//     contentUrl: "",
//     order: "",
//     duration: "",
//     isPreview: false,
//     file: null as File | null,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!courseId) return;

//     // ✅ validation
//     if (!form.title.trim()) {
//       showToast("Title is required", "warning");
//       return;
//     }

//     if (contentMode === "url" && !form.contentUrl.trim()) {
//       showToast("Please enter content URL", "warning");
//       return;
//     }

//     if (contentMode === "file" && !form.file) {
//       showToast("Please upload a file", "warning");
//       return;
//     }

//     try {
//       await dispatch(
//         createLessonThunk({
//           courseId,
//           data: {
//             title: form.title,
//             type: form.type,
//             content: contentMode === "file" ? form.file : undefined,
//             contentUrl: contentMode === "url" ? form.contentUrl : undefined,
//             order: form.order ? Number(form.order) : undefined,
//             duration: form.duration ? Number(form.duration) : undefined,
//             isPreview: form.isPreview,
//           },
//         })
//       ).unwrap();

//       showToast("Lesson created successfully", "success");
//       navigate(`/courses/${courseId}`);
//     } catch (err: any) {
//       showToast(err || "Failed to create lesson", "error");
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f4f7fd", p: 3 }}>
//       <Paper
//         sx={{
//           maxWidth: 650,
//           mx: "auto",
//           p: 4,
//           borderRadius: 4,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Typography variant="h5" fontWeight={800} mb={1}>
//           Create New Lesson
//         </Typography>

//         <Typography sx={{ color: "#64748b", mb: 2 }}>
//           Build structured content for your course
//         </Typography>

//         {/* Content Mode Switch */}
//         <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//           <Chip
//             label="URL"
//             clickable
//             color={contentMode === "url" ? "primary" : "default"}
//             onClick={() => setContentMode("url")}
//           />
//           <Chip
//             label="Upload File"
//             clickable
//             color={contentMode === "file" ? "primary" : "default"}
//             onClick={() => setContentMode("file")}
//           />
//         </Box>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: "grid", gap: 2 }}
//         >
//           {/* Title */}
//           <TextField
//             label="Lesson Title"
//             value={form.title}
//             onChange={(e) =>
//               setForm({ ...form, title: e.target.value })
//             }
//             fullWidth
//           />

//           {/* Type */}
//           <TextField
//             select
//             label="Lesson Type"
//             value={form.type}
//             onChange={(e) =>
//               setForm({ ...form, type: e.target.value as LessonType })
//             }
//           >
//             {lessonTypes.map((t) => (
//               <MenuItem key={t} value={t}>
//                 {t.toUpperCase()}
//               </MenuItem>
//             ))}
//           </TextField>

//           {/* URL MODE */}
//           {contentMode === "url" && (
//             <TextField
//               label="Content URL (YouTube / PDF / Link)"
//               value={form.contentUrl}
//               onChange={(e) =>
//                 setForm({ ...form, contentUrl: e.target.value })
//               }
//               helperText="Paste external link (video, PDF, docs, etc.)"
//               fullWidth
//             />
//           )}

//           {/* FILE MODE */}
//           {contentMode === "file" && (
//             <Button variant="outlined" component="label">
//               Upload File
//               <input
//                 hidden
//                 type="file"
//                 accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.avi,.mkv,.pdf,.doc,.docx"
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     file: e.target.files?.[0] || null,
//                   })
//                 }
//               />
//             </Button>
//           )}

//           {/* Order + Duration */}
//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
//             <TextField
//               label="Order"
//               type="number"
//               value={form.order}
//               onChange={(e) =>
//                 setForm({ ...form, order: e.target.value })
//               }
//             />

//             <TextField
//               label="Duration (mins)"
//               type="number"
//               value={form.duration}
//               onChange={(e) =>
//                 setForm({ ...form, duration: e.target.value })
//               }
//             />
//           </Box>

//           {/* Preview toggle */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               p: 2,
//               bgcolor: "#f8fafc",
//               borderRadius: 2,
//             }}
//           >
//             <Typography fontWeight={600}>Preview Lesson</Typography>
//             <Switch
//               checked={form.isPreview}
//               onChange={(e) =>
//                 setForm({ ...form, isPreview: e.target.checked })
//               }
//             />
//           </Box>

//           <Divider />

//           {/* Actions */}
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               borderRadius: 2,
//               fontWeight: 700,
//               textTransform: "none",
//               py: 1.2,
//             }}
//           >
//             Create Lesson
//           </Button>

//           <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


// src/pages/lessons/CreateLesson.tsx
import { Box, Container, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createLessonThunk } from "../../features/lesson/lessonThunks";
import LessonForm from "../../components/lessons/LessonForm";
import { showToast } from "../../utils/toast";
import { LessonFormValues } from "../../features/lesson/lessonSchema";

export default function CreateLesson() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.lesson);

  const handleFormSubmit = async (payload: FormData | LessonFormValues) => {
    try {
      if (!courseId) return;
      await dispatch(createLessonThunk({ courseId, data: payload })).unwrap();
      showToast("Lesson integrated into course timeline", "success");
      navigate(`/course/${courseId}`);
    } catch (err) {
      showToast(
        typeof err === "string" ? err : "Failed to commit node mapping parameters",
        "error",
      );
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 5 }, borderRadius: "24px", border: "1px solid #e2e8f0" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>Append New Curricular Node</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>Map resource deployment boundaries directly to your standard course blueprint catalog track.</Typography>
          </Box>
          <LessonForm onSubmit={handleFormSubmit} loading={loading} />
        </Paper>
      </Container>
    </Box>
  );
}
