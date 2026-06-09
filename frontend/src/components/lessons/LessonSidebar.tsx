// src/components/lessons/LessonSidebar.tsx
import { Box, Typography, Stack, Divider, List, ListItemButton, Paper } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { LessonType } from "../../types/lessonTypes";

interface LessonSidebarProps {
  lessons: Array<{ _id: string; title: string; type: LessonType; order: number; isPreview: boolean }>;
  activeLessonId?: string;
  onSelectLesson: (id: string) => void;
}

const SIDE_ICONS = {
  video: <PlayCircleRoundedIcon fontSize="small" />,
  pdf: <PictureAsPdfRoundedIcon fontSize="small" />,
  document: <InsertDriveFileRoundedIcon fontSize="small" />,
  text: <ArticleRoundedIcon fontSize="small" />,
  link: <LinkRoundedIcon fontSize="small" />,
};

export default function LessonSidebar({ lessons, activeLessonId, onSelectLesson }: LessonSidebarProps) {
  return (
    <Paper elevation={0} sx={{ width: "100%", height: "100%", borderRight: "1px solid #e2e8f0", bgcolor: "#ffffff", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a" }}>Course Tracks</Typography>
        <Typography variant="caption" color="textSecondary">{lessons.length} structured syllabus segments</Typography>
      </Box>
      <Divider sx={{ borderColor: "#f1f5f9" }} />
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1.5 }}>
        <List component={Stack} spacing={1}>
          {lessons.map((item) => {
            const isSelected = item._id === activeLessonId;
            return (
              <ListItemButton
                key={item._id}
                onClick={() => onSelectLesson(item._id)}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  gap: 1.5,
                  bgcolor: isSelected ? "rgba(14, 165, 233, 0.06)" : "transparent",
                  color: isSelected ? "#0ea5e9" : "#475569",
                  "& .MuiSvgIcon-root": { color: isSelected ? "#0ea5e9" : "#94a3b8" },
                  "&:hover": { bgcolor: isSelected ? "rgba(14, 165, 233, 0.08)" : "#f8fafc" },
                }}
              >
                {SIDE_ICONS[item.type]}
                <Box sx={{ overflow: "hidden" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 700, opacity: 0.6, fontSize: "0.65rem", textTransform: "uppercase" }}>
                    Segment node {item.order}
                  </Typography>
                  <Typography variant="body2" noWrap sx={{ fontWeight: isSelected ? 700 : 500, mt: 0.25 }}>
                    {item.title}
                  </Typography>
                </Box>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
}
