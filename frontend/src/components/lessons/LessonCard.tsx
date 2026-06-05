// src/components/lessons/LessonCard.tsx
import { Paper, Box, Typography, IconButton, Chip, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { LessonType } from "../../types/lessonTypes";

interface LessonCardProps {
  lesson: {
    _id: string;
    title: string;
    type: LessonType;
    duration: number;
    order: number;
    isPreview: boolean;
  };
  isTeacher: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect: (id: string) => void;
  isActive?: boolean;
}

const TYPE_ICONS = {
  video: <PlayCircleRoundedIcon sx={{ color: "#0ea5e9" }} />,
  pdf: <PictureAsPdfRoundedIcon sx={{ color: "#ef4444" }} />,
  document: <InsertDriveFileRoundedIcon sx={{ color: "#6366f1" }} />,
  text: <ArticleRoundedIcon sx={{ color: "#10b981" }} />,
  link: <LinkRoundedIcon sx={{ color: "#f59e0b" }} />,
};

export default function LessonCard({ lesson, isTeacher, onEdit, onDelete, onSelect, isActive }: LessonCardProps) {
  return (
    <Paper
      elevation={0}
      onClick={() => onSelect(lesson._id)}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid",
        borderColor: isActive ? "#0ea5e9" : "#e2e8f0",
        bgcolor: isActive ? "rgba(14, 165, 233, 0.02)" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", borderColor: "#0ea5e9" },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1, alignItems: "center" }}>
          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#f8fafc", display: "flex", alignItems: "center" }}>
            {TYPE_ICONS[lesson.type]}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8" }}>Node {lesson.order}</Typography>
              {lesson.isPreview && <Chip label="Free Preview" size="small" icon={<VisibilityRoundedIcon />} sx={{ height: 20, fontSize: 10, fontWeight: 700, bgcolor: "#ecfdf5", color: "#047857" }} />}
            </Stack>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mt: 0.25 }}>{lesson.title}</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, color: "#64748b", alignItems: "center" }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{lesson.duration} mins</Typography>
            </Stack>
          </Box>
        </Stack>

        {isTeacher && (
          <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
            <IconButton size="small" onClick={() => onEdit?.(lesson._id)} sx={{ border: "1px solid #e2e8f0", borderRadius: "10px", color: "#64748b" }}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete?.(lesson._id)} sx={{ border: "1px solid #e2e8f0", borderRadius: "10px", color: "#ef4444" }}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
