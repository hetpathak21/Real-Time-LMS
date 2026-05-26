import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../types/courseTypes";

type CourseCardProps = ICourse;

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
}: CourseCardProps) {
  const navigate = useNavigate();
  const accent = getAccent(_id);
  const teacherName = getTeacherName(teacherId, instructor);

  return (
    // <Card
    //   sx={{
    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     borderRadius: "16px",
    //     overflow: "hidden",
    //     border: "1px solid #e2e8f0",
    //     boxShadow: "0 8px 20px rgba(15, 23, 42, 0.06)",
    //     transition: "0.2s ease",
    //     "&:hover": {
    //       transform: "translateY(-4px)",
    //       boxShadow: "0 16px 30px rgba(14, 165, 233, 0.12)",
    //     },
    //   }}
    // >
    //   <Box
    //     sx={{
    //       position: "relative",
    //       height: 300,
    //       background: thumbnail
    //         ? `url(${thumbnail}) center/cover no-repeat`
    //         : getThumbnailFallback(accent),
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         inset: 0,
    //         background: thumbnail
    //           ? "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.55) 100%)"
    //           : "linear-gradient(135deg, rgba(14,165,233,0.25) 0%, rgba(2,132,199,0.85) 100%)",
    //       }}
    //     />
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         top: 16,
    //         left: 16,
    //         display: "flex",
    //         gap: 1,
    //         flexWrap: "wrap",
    //       }}
    //     >
    //       {category ? (
    //         <Chip
    //           label={category}
    //           size="small"
    //           sx={{
    //             bgcolor: "rgba(255,255,255,0.9)",
    //             color: "#0f172a",
    //             fontWeight: 700,
    //           }}
    //         />
    //       ) : null}
    //       <Chip
    //         label={isPublished ? "Published" : "Draft"}
    //         size="small"
    //         sx={{
    //           bgcolor: isPublished ? "#dcfce7" : "rgba(15,23,42,0.66)",
    //           color: isPublished ? "#166534" : "#ffffff",
    //           fontWeight: 700,
    //         }}
    //       />
    //     </Box>

    //     <Box
    //       sx={{
    //         position: "absolute",
    //         left: 18,
    //         right: 18,
    //         bottom: 16,
    //         color: "#ffffff",
    //       }}
    //     >
    //       <Typography
    //         variant="h6"
    //         sx={{
    //           fontWeight: 800,
    //           lineHeight: 1.2,
    //           mb: 0.75,
    //           display: "-webkit-box",
    //           WebkitLineClamp: 2,
    //           WebkitBoxOrient: "vertical",
    //           overflow: "hidden",
    //         }}
    //       >
    //         {title}
    //       </Typography>

    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           gap: 0.75,
    //           color: "rgba(255,255,255,0.88)",
    //         }}
    //       >
    //         <PersonOutlineRoundedIcon sx={{ fontSize: 16 }} />
    //         <Typography variant="caption" sx={{ fontWeight: 600 }}>
    //           {teacherName}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Box>

    //   <CardContent
    //     sx={{
    //       p: 2.5,
    //       display: "flex",
    //       flexDirection: "column",
    //       flexGrow: 1,
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "grid",
    //         gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    //         gap: 1.25,
    //         mb: 2,
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           p: 1.25,
    //           borderRadius: "16px",
    //           bgcolor: "#f8fafc",
    //           border: "1px solid #e2e8f0",
    //         }}
    //       >
    //         <Typography
    //           variant="caption"
    //           sx={{ color: "#64748b", fontWeight: 700 }}
    //         >
    //           Level
    //         </Typography>
    //         <Typography
    //           sx={{
    //             color: "#0f172a",
    //             fontWeight: 700,
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           {level || "Beginner"}
    //         </Typography>
    //       </Box>

    //       <Box
    //         sx={{
    //           p: 1.25,
    //           borderRadius: "16px",
    //           bgcolor: "#f8fafc",
    //           border: "1px solid #e2e8f0",
    //         }}
    //       >
    //         <Typography
    //           variant="caption"
    //           sx={{ color: "#64748b", fontWeight: 700 }}
    //         >
    //           Learners
    //         </Typography>
    //         <Typography sx={{ color: "#0f172a", fontWeight: 700 }}>
    //           {enrollmentCount || 0}
    //         </Typography>
    //       </Box>
    //     </Box>

    //     <Typography
    //       variant="body2"
    //       sx={{
    //         color: "#64748b",
    //         lineHeight: 1.7,
    //         mb: 2.5,
    //         display: "-webkit-box",
    //         WebkitLineClamp: 3,
    //         WebkitBoxOrient: "vertical",
    //         overflow: "hidden",
    //         minHeight: 72,
    //       }}
    //     >
    //       {description}
    //     </Typography>

    //     <Box sx={{ mt: "auto", display: "flex", gap: 1.25 }}>
    //       <Button
    //         fullWidth
    //         variant="contained"
    //         startIcon={<PlayArrowRoundedIcon />}
    //         onClick={() => navigate(`/course/${_id}`)}
    //         sx={{
    //           borderRadius: "14px",
    //           textTransform: "none",
    //           fontWeight: 700,
    //           py: 1.1,
    //           background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    //           boxShadow: "0 12px 24px rgba(14, 165, 233, 0.24)",
    //         }}
    //       >
    //         View Course
    //       </Button>

    //       <Button
    //         variant="outlined"
    //         onClick={() => navigate(`/course/${_id}`)}
    //         sx={{
    //           minWidth: 48,
    //           borderRadius: "14px",
    //           borderColor: "#cbd5e1",
    //           color: "#0f172a",
    //         }}
    //       >
    //         <AutoStoriesRoundedIcon />
    //       </Button>
    //     </Box>
    //   </CardContent>
    // </Card>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
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
        {/* DARK OVERLAY */}
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

        {/* TITLE AREA */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 16,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
          >
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
        {/* INFO ROW */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1, p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Level
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              {level || "Beginner"}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Learners
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              {enrollmentCount || 0}
            </Typography>
          </Box>
        </Box>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PlayArrowRoundedIcon />}
            onClick={() => navigate(`/course/${_id}`)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            View
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(`/course/${_id}`)}
            sx={{
              minWidth: 48,
              borderRadius: 2,
            }}
          >
            <AutoStoriesRoundedIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
