import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchLessonById } from "../../features/lesson/lessonThunks";

export default function LessonView() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();
  const { selectedLesson, loading, error } = useAppSelector(
    (state) => state.lesson
  );

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLessonById(lessonId));
    }
  }, [dispatch, lessonId]);

  if (loading) {
    return <Typography>Loading lesson...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!selectedLesson) {
    return <Typography>No lesson found</Typography>;
  }

  const courseId =
    typeof selectedLesson.courseId === "object"
      ? selectedLesson.courseId._id
      : selectedLesson.courseId;

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {selectedLesson.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={selectedLesson.type.toUpperCase()} size="small" />
              <Chip
                label={selectedLesson.isPreview ? "Preview" : "Locked to enrolled"}
                size="small"
                color={selectedLesson.isPreview ? "success" : "default"}
                variant={selectedLesson.isPreview ? "filled" : "outlined"}
              />
            </Stack>
          </Box>

          <Button variant="outlined" onClick={() => navigate(`/course/${courseId}`)}>
            Back To Course
          </Button>
        </Stack>

        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Lesson order: {selectedLesson.order}
          {selectedLesson.duration ? ` | ${selectedLesson.duration} min` : ""}
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: "#f8fafc" }}>
          {selectedLesson.contentUrl ? (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Lesson Content
              </Typography>
              <Typography sx={{ mb: 2, wordBreak: "break-all" }}>
                {selectedLesson.contentUrl}
              </Typography>
              <Button
                variant="contained"
                component="a"
                href={selectedLesson.contentUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Content
              </Button>
            </>
          ) : (
            <Typography color="text.secondary">
              No lesson content URL was added for this lesson yet.
            </Typography>
          )}
        </Paper>
      </Paper>
    </Box>
  );
}
