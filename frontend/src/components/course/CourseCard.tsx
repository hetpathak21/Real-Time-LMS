import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { ICourse } from "../../types/courseTypes";
import { IUser } from "../../types/userTypes";

type CourseCardProps = ICourse & {
  isHighlighted?: boolean;
};


const ACCENTS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#6366f1"];

const getAccent = (courseId: string) => {
  const total = courseId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENTS[total % ACCENTS.length];
};

const getTeacherName = (teacherId?: IUser | string, instructor?: IUser | string) => {
  if (typeof instructor === "object") return instructor?.name || "Instructor";
  if (typeof teacherId === "object") return teacherId?.name || "Instructor";
  return typeof instructor === "string" && instructor.trim() ? instructor : "Expert Instructor";
};

export default function CourseCard(props: CourseCardProps) {
  const { _id, description, thumbnail, category, level, teacherId, instructor, isPublished, enrollmentCount } = props;
  const navigate = useNavigate();
  const theme = useTheme();

  const accent = getAccent(_id);
  const teacherName = getTeacherName(teacherId, instructor);

  return (
    <Card
      onClick={() => navigate(`/course/${_id}`)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        overflow: "hidden",
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 6px 18px rgba(0,0,0,0.4)"
            : "0 6px 18px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 18px 40px rgba(0,0,0,0.5)"
              : "0 18px 40px rgba(14, 165, 233, 0.18)",
          cursor: "pointer",
        },
      }}
    >
      {/* --- Visual Header --- */}
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
        {/* Floating Badges */}
        <Stack 
         sx = {{
          direction:"row",
          justifyContent: "space-between",
          position: "absolute", top: 116, left: 6, right: 6, zIndex: 2 }}
        >
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(15,23,42,0.9)"
                    : "rgba(255,255,255,0.9)",

                color: theme.palette.text.primary,
                fontWeight: 700,
              }}
            />
          )}
          <Chip
            label={isPublished ? "Published" : "Draft"}
            size="small"
            sx={{
              bgcolor: isPublished
                ? "#dcfce7"
                : theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.6)",

              color: isPublished ? "#166534" : "#fff",
              fontWeight: 700,
              fontSize: "0.65rem",
              px: 0.5,
            }}
          />
        </Stack>

        <Box
          className="course-thumbnail-img"
          sx={{
            width: "100%",
            height: "100%",
            transition: "transform 0.8s ease",
            backgroundImage: thumbnail ? `url(${thumbnail})` : `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        
        {/* Dark subtle vignette for text readability */}
        <Box 
          className="course-overlay"
          sx={{ 
            position: "absolute", inset: 0, 
            background: `linear-gradient(to top, ${alpha("#000", 0.4)}, transparent)`, 
            opacity: 0, transition: "opacity 0.3s" 
          }} 
        />
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            sx={{
              flex: 1,
              p: 1.5,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : "#f8fafc",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Level
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {level || "Beginner"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 1.5,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : "#f8fafc",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Learners
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {" "}
              {enrollmentCount || 0}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {description}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Instructor : <strong>{teacherName}</strong>
        </Typography>

        {/* BUTTON FIXED INSIDE CARD CONTENT */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/course/${_id}`)}
          sx={{
            mt: "auto",
            borderRadius: 2,
            alignSelf: "flex-start",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          <AutoStoriesRoundedIcon sx={{ mr: 1 }} />
          Open
        </Button>
      </CardContent>
      </Card>
  );
}