import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ICourse } from "../../types/courseTypes";

type CourseCardProps = ICourse & {
  isHighlighted?: boolean;
};

const ACCENTS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#6366f1"];

const getAccent = (courseId: string) => {
  const total = courseId
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return ACCENTS[total % ACCENTS.length];
};

const getTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"],
) => {
  if (typeof instructor === "object") {
    return instructor?.name || "Instructor";
  }

  if (typeof teacherId === "object") {
    return teacherId?.name || "Instructor";
  }

  if (typeof instructor === "string" && instructor.trim()) {
    return instructor;
  }

  return "Instructor";
};

const getThumbnailFallback = (accent: string) =>
  `linear-gradient(135deg, ${accent} 0%, #082f49 100%)`;

export default function CourseCard({
  _id,
  title,
  description,
  thumbnail,
  category,
  level,
  teacherId,
  instructor,
  isPublished,
  enrollmentCount,
  isHighlighted = false,
}: CourseCardProps) {
  const navigate = useNavigate();
  const accent = getAccent(_id);
  const teacherName = getTeacherName(teacherId, instructor);

  return (
    <motion.div
      initial={isHighlighted ? { y: 16, scale: 0.96 } : false}
      animate={
        isHighlighted
          ? {
              y: [16, -4, 0],
              scale: [0.96, 1.03, 1],
            }
          : undefined
      }
      transition={{ duration: 1.35, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          border: isHighlighted ? "1px solid #38bdf8" : "1px solid #e2e8f0",
          boxShadow: isHighlighted
            ? "0 22px 52px rgba(14, 165, 233, 0.22)"
            : "0 6px 18px rgba(15, 23, 42, 0.06)",
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 18px 40px rgba(14, 165, 233, 0.18)",
            cursor: "pointer",
          },
        }}
      >
      {/* IMAGE SECTION */}
      <Box
        sx={{
          position: "relative",
          height: 220,
          background: thumbnail
            ? `url(${thumbnail}) center/cover no-repeat`
            : getThumbnailFallback(accent),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: thumbnail
              ? "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.65))"
              : "linear-gradient(135deg, rgba(14,165,233,0.4), rgba(2,132,199,0.9))",
          }}
        />

        {/* TOP CHIPS */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                fontWeight: 700,
              }}
            />
          )}

          <Chip
            label={isPublished ? "Published" : "Draft"}
            size="small"
            sx={{
              bgcolor: isPublished ? "#dcfce7" : "rgba(0,0,0,0.6)",
              color: isPublished ? "#166534" : "#fff",
              fontWeight: 700,
            }}
          />
        </Box>

        {/* TITLE */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            color: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PersonOutlineRoundedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{teacherName}</Typography>
          </Box>
        </Box>
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
          <Box sx={{ flex: 1, p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Typography variant="caption">Level</Typography>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {level || "Beginner"}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Typography variant="caption">Learners</Typography>
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

        <Typography variant="body2" sx={{ color: "#64748b" }}>
          {description}
        </Typography>

        <Typography variant="body2">
          Instructor: <strong>{teacherName}</strong>
        </Typography>

        {/* BUTTON FIXED INSIDE CARD CONTENT */}
        <Button
          variant="outlined"
          onClick={() => navigate(`/course/${_id}`)}
          sx={{
            mt: "auto",
            borderRadius: 2,
            alignSelf: "flex-start",
          }}
        >
          <AutoStoriesRoundedIcon sx={{ mr: 1 }} />
          Open
        </Button>
      </CardContent>
      </Card>
    </motion.div>
  );
}
