import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchLessonById } from "../../features/lesson/lessonThunks";



export default function LessonView() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();

  const { selectedLesson, loading, error } = useAppSelector(
    (state) => state.lesson,
  );

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLessonById(lessonId));
    }
  }, [dispatch, lessonId]);

  const getPreviewUrl = (url: string) => {
    if (selectedLesson.type === "pdf") {
      return url.replace("/upload/", "/upload/fl_inline/");
    }

    return url;
  };

  const getDownloadUrl = (url: string) => {
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Loading lesson...</Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (!selectedLesson) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography>No lesson found</Typography>
      </Paper>
    );
  }

  const courseId =
    typeof selectedLesson.courseId === "object"
      ? selectedLesson.courseId._id
      : selectedLesson.courseId;

  const lessonType = selectedLesson.type;

  const renderLessonContent = () => {
    if (!selectedLesson.contentUrl) {
      return (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <AutoStoriesRoundedIcon sx={{ fontSize: 56, color: "text.disabled", mb: 1 }} />
          <Typography sx={{ fontWeight: 700 }}>No content added yet</Typography>
          <Typography color="text.secondary">
            This lesson does not have any uploaded content.
          </Typography>
        </Box>
      );
    }

    if (lessonType === "video") {
      return (
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <PlayCircleRoundedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Video Lesson
            </Typography>
          </Stack>

          <Box
            component="video"
            src={selectedLesson.contentUrl}
            controls
            controlsList="nodownload"
            sx={{
              width: "100%",
              maxHeight: "68vh",
              borderRadius: 3,
              bgcolor: "#020617",
              boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
            }}
          />
        </Box>
      );
    }

    if (lessonType === "pdf") {
      const previewUrl = getPreviewUrl(selectedLesson.contentUrl);
      const downloadUrl = getDownloadUrl(selectedLesson.contentUrl);

      return (
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <DescriptionRoundedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              PDF Preview
            </Typography>
          </Stack>

          <Box
            component="iframe"
            src={previewUrl}
            title={selectedLesson.title}
            sx={{
              width: "100%",
              height: { xs: 500, md: 680 },
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              bgcolor: "#ffffff",
            }}
          />

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="a"
              href={downloadUrl}
              download
            >
              Download PDF
            </Button>
          </Stack>
        </Box>
      );
    }

    if (lessonType === "link") {
      return (
        <Box sx={{ textAlign: "center", py: 7 }}>
          <LinkRoundedIcon sx={{ fontSize: 56, color: "primary.main", mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            External Lesson Link
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, wordBreak: "break-all" }}>
            {selectedLesson.contentUrl}
          </Typography>
          <Button
            variant="contained"
            endIcon={<OpenInNewRoundedIcon />}
            component="a"
            href={selectedLesson.contentUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Lesson
          </Button>
        </Box>
      );
    }

    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: "#f8fafc" }}>
        <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
          {selectedLesson.contentUrl}
        </Typography>
      </Paper>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          boxShadow: "0 16px 45px rgba(15, 23, 42, 0.06)",
          bgcolor: "#ffffff",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(`/course/${courseId}`)}
              sx={{ mb: 1.5, textTransform: "none" }}
            >
              Back to Course
            </Button>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {selectedLesson.title}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={selectedLesson.type.toUpperCase()} color="primary" size="small" />
              <Chip label={`Lesson ${selectedLesson.order}`} size="small" variant="outlined" />
              {selectedLesson.duration ? (
                <Chip label={`${selectedLesson.duration} min`} size="small" variant="outlined" />
              ) : null}
              <Chip
                label={selectedLesson.isPreview ? "Preview Available" : "Enrolled Students Only"}
                size="small"
                color={selectedLesson.isPreview ? "success" : "default"}
                variant={selectedLesson.isPreview ? "filled" : "outlined"}
              />
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: "#f8fafc",
            borderColor: "#e2e8f0",
          }}
        >
          {renderLessonContent()}
        </Paper>
      </Paper>
    </Box>
  );
}