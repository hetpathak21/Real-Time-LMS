// src/pages/lessons/EditLesson.tsx
import { useEffect } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchLessonById, updateLessonThunk } from "../../features/lesson/lessonThunks";
import LessonForm from "../../components/lessons/LessonForm";
import LessonSkeleton from "../../components/lessons/LessonSkeleton";
import { showToast } from "../../utils/toast";
import { LessonFormValues } from "../../features/lesson/lessonSchema";
import { ICourse } from "../../types/courseTypes";

export default function EditLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedLesson, loading } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (lessonId) dispatch(fetchLessonById(lessonId));
  }, [lessonId, dispatch]);

  const handleFormSubmit = async (payload: FormData | LessonFormValues) => {
    try {
      if (!lessonId) return;
      const updatedLesson = await dispatch(updateLessonThunk({ lessonId, data: payload })).unwrap();
      const courseId =
        typeof updatedLesson.courseId === "object"
          ? (updatedLesson.courseId as Pick<ICourse, "_id">)._id
          : updatedLesson.courseId;
      showToast("Structural node modifications synced successfully", "success");
      navigate(`/course/${courseId}`);
    } catch (err) {
      showToast(
        typeof err === "string" ? err : "Failed to sync system asset structural fields",
        "error",
      );
    }
  };

  if (loading && !selectedLesson) return <Container maxWidth="md" sx={{ py: 6 }}><LessonSkeleton /></Container>;

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 5 }, borderRadius: "24px", border: "1px solid #e2e8f0" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>Modify Structural Node</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>Amend core configuration keys. Leaving media uploads blank preserves your currently anchored files.</Typography>
          </Box>
          <LessonForm initialValues={selectedLesson || undefined} onSubmit={handleFormSubmit} loading={loading} />
        </Paper>
      </Container>
    </Box>
  );
}
