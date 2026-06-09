import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { LessonType } from "../../types/lessonTypes";

interface LessonPlayerProps {
  lessonId: string;
  type: LessonType;
  contentUrl?: string;
  textContent?: string;
  fileName?: string;
  title: string;
}

const hasHttpUrl = (url?: string) => Boolean(url && /^https?:\/\//i.test(url));

const getVideoEmbedUrl = (url: string) => {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/,
  );
  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return url;
};

const getPdfViewerUrl = (url: string) =>
  `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;

const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getDownloadUrl = (lessonId: string) =>
  `${apiBaseUrl}/lesson/${lessonId}/download`;

const getFileLabel = (title: string, fileName?: string) =>
  fileName?.trim() || `${title.trim() || "lesson-file"}`;

function MissingContent({ type }: { type: LessonType }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <ReportProblemRoundedIcon sx={{ color: "#f59e0b", fontSize: 42, mb: 1 }} />
      <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
        No {type} content is attached
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
        Upload a supported file or add a valid URL before publishing this lesson.
      </Typography>
    </Paper>
  );
}

export default function LessonPlayer({
  lessonId,
  type,
  contentUrl,
  textContent,
  fileName,
  title,
}: LessonPlayerProps) {
  if (type === "text") {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
            color: "#334155",
            fontSize: "1.05rem",
          }}
        >
          {textContent || contentUrl || "No reading content has been added."}
        </Typography>
      </Paper>
    );
  }

  if (!hasHttpUrl(contentUrl)) {
    return <MissingContent type={type} />;
  }

  if (type === "video") {
    const embedUrl = getVideoEmbedUrl(contentUrl!);
    const isHostedVideo = embedUrl === contentUrl;

    return (
      <Box
        sx={{
          width: "100%",
          position: "relative",
          pt: "56.25%",
          bgcolor: "#000",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        {isHostedVideo ? (
          <Box
            component="video"
            src={contentUrl}
            controls
            controlsList="nodownload"
            preload="metadata"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Box
            component="iframe"
            src={embedUrl}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}
      </Box>
    );
  }

  if (type === "pdf" || type === "document") {
    const isPdf = type === "pdf" || fileName?.toLowerCase().endsWith(".pdf");
    return (
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ color: "#475569", fontWeight: 700 }}>
          {getFileLabel(title, fileName)}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            height: { xs: "65vh", md: "75vh" },
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            bgcolor: "#fff",
          }}
        >
          <Box
            component="iframe"
            src={getPdfViewerUrl(contentUrl!)}
            title={title}
            sx={{ width: "100%", height: "100%", border: 0 }}
          />
        </Paper>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            component="a"
            href={getDownloadUrl(lessonId)}
            variant="outlined"
            startIcon={<CloudDownloadRoundedIcon />}
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700 }}
          >
            Download {isPdf ? "PDF" : "document"}
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        textAlign: "center",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
        External lesson resource
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 3, color: "#64748b", wordBreak: "break-all" }}
      >
        {contentUrl}
      </Typography>
      <Button
        component="a"
        href={contentUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        endIcon={<OpenInNewRoundedIcon />}
        sx={{ borderRadius: "10px", px: 4, py: 1.25, textTransform: "none" }}
      >
        Open lesson
      </Button>
    </Paper>
  );
}
