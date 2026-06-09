// import { Box, Button, Card, CardContent, Chip, Typography, alpha } from "@mui/material";
// import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
// import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
// import LayerIcon from "@mui/icons-material/LayersRounded"; 
// import GroupIcon from "@mui/icons-material/GroupOutlined"; 
// import { useNavigate } from "react-router-dom";
// import { ICourse } from "../../types/courseTypes";

// type CourseCardProps = ICourse;

// const COLORS = {
//   primary: "#00a3ff",
//   textMain: "#1e293b",
//   textSub: "#64748b",
//   border: "#e2e8f0",
//   cardBg: "#ffffff",
// };

// const ACCENTS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#6366f1"];

// const getAccent = (courseId: string) => {
//   const total = courseId
//     .split("")
//     .reduce((sum, char) => sum + char.charCodeAt(0), 0);
//   return ACCENTS[total % ACCENTS.length];
// };

// const getTeacherName = (
//   teacherId?: ICourse["teacherId"],
//   instructor?: ICourse["instructor"]
// ) => {
//   if (typeof instructor === "object") return instructor?.name || "Instructor";
//   if (typeof teacherId === "object") return teacherId?.name || "Instructor";
//   if (typeof instructor === "string" && instructor.trim()) return instructor;
//   return "Instructor";
// };

// const getThumbnailFallback = (accent: string) =>
//   `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)`;

// export default function CourseCard({
//   _id,
//   title,
//   description,
//   thumbnail,
//   category,
//   level,
//   teacherId,
//   instructor,
//   isPublished,
//   enrollmentCount,
// }: CourseCardProps) {
//   const navigate = useNavigate();
//   const accent = getAccent(_id);
//   const teacherName = getTeacherName(teacherId, instructor);

//   return (
//     <Card
//       onClick={() => navigate(`/course/${_id}`)}
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         borderRadius: "20px",
//         overflow: "hidden",
//         bgcolor: COLORS.cardBg,
//         border: `1px solid ${COLORS.border}`,
//         boxShadow: "0 4px 20px rgba(30, 41, 59, 0.03)",
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         "&:hover": {
//           transform: "translateY(-6px)",
//           boxShadow: `0 20px 32px ${alpha(COLORS.textMain, 0.08)}`,
//           borderColor: alpha(COLORS.primary, 0.3),
//           cursor: "pointer",
//           "& .course-thumbnail-img": {
//             transform: "scale(1.05)",
//           },
//           "& .course-action-btn": {
//             bgcolor: COLORS.primary,
//             color: "#ffffff",
//           }
//         },
//       }}
//     >
//       {/* ================= THUMBNAIL WRAPPER (Cleaned of Absolute Overlays) ================= */}
//       <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", bgcolor: "#0f172a" }}>
//         <Box
//           className="course-thumbnail-img"
//           sx={{
//             width: "100%",
//             height: "100%",
//             transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
//             backgroundImage: thumbnail ? `url(${thumbnail})` : getThumbnailFallback(accent),
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//           }}
//         />
//       </Box>
//        {/* Top Row Badges - Clean inline flex positioning directly inside content layer */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",mx:"2" }}>
//           {category ? (
//             <Chip
//               label={category}
//               size="small"
//               sx={{
//                 height: 24,
//                 bgcolor: "#f1f5f9",
//                 color: COLORS.textMain,
//                 fontWeight: 700,
//                 fontSize: "0.72rem",
//                 borderRadius: "8px",
//                 border: "1px solid rgba(0, 0, 0, 0.04)"
//               }}
//             />
//           ) : <Box />}
          
//           <Chip
//             label={isPublished ? "Published" : "Draft"}
//             size="small"
//             sx={{
//               height: 24,
//               bgcolor: isPublished ? "#dcfce7" : "#f1f5f9",
//               color: isPublished ? "#15803d" : COLORS.textSub,
//               fontWeight: 700,
//               fontSize: "0.72rem",
//               borderRadius: "8px",
//               border: `1px solid ${isPublished ? "rgba(34,197,94,0.2)" : "rgba(100,116,139,0.1)"}`,
//               textTransform: "uppercase",
//               letterSpacing: 0.5
//             }}
//           />
//         </Box>

//       {/* ================= CONTENT ARCHITECTURE ================= */}
//       <CardContent
//         sx={{
//           p: 2.5,
//           pt: 2.5,
//           display: "flex",
//           flexDirection: "column",
//           flexGrow: 1,
//           "&:last-child": { pb: 2.5 }
//         }}
//       >

//         {/* Title Header Block */}
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontWeight: 800, 
//             color: COLORS.textMain, 
//             lineHeight: 1.35, 
//             mb: 1,
//             fontSize: "1.05rem",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             height: "2.7rem" 
//           }}
//         >
//           {title}
//         </Typography>

//         {/* Instructor Inline Row */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
//           <Box sx={{ display: "flex", p: 0.5, bgcolor: "#f8fafc", borderRadius: "50%", border: `1px solid ${COLORS.border}` }}>
//             <PersonOutlineRoundedIcon sx={{ fontSize: 14, color: COLORS.textSub }} />
//           </Box>
//           <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 600 }}>
//             {teacherName}
//           </Typography>
//         </Box>

//         {/* Metric Counter Blocks Grid split */}
//         <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
//           <Box sx={{ flex: 1, p: 1.25, bgcolor: "#f8fafc", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, color: COLORS.textSub }}>
//               <LayerIcon sx={{ fontSize: 13 }} />
//               <Typography variant="caption" sx={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>Level</Typography>
//             </Box>
//             <Typography sx={{ fontWeight: 800, color: COLORS.textMain, fontSize: "0.85rem" }}>
//               {level || "Beginner"}
//             </Typography>
//           </Box>

//           <Box sx={{ flex: 1, p: 1.25, bgcolor: "#f8fafc", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, color: COLORS.textSub }}>
//               <GroupIcon sx={{ fontSize: 13 }} />
//               <Typography variant="caption" sx={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>Learners</Typography>
//             </Box>
//             <Typography sx={{ fontWeight: 800, color: COLORS.textMain, fontSize: "0.85rem" }}>
//               {enrollmentCount || 0}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Truncated Inline Summary Description Block */}
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: COLORS.textSub, 
//             lineHeight: 1.5,
//             mb: 3,
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             fontSize: "0.825rem",
//             height: "2.45rem"
//           }}
//         >
//           {description}
//         </Typography>

//         {/* Active Navigation Action Trigger Button */}
//         <Button
//           className="course-action-btn"
//           variant="outlined"
//           fullWidth
//           sx={{
//             mt: "auto",
//             py: 1.25,
//             borderRadius: "12px",
//             textTransform: "none",
//             fontWeight: 700,
//             fontSize: "0.85rem",
//             color: COLORS.textMain,
//             borderColor: COLORS.border,
//             transition: "all 0.2s ease",
//             "&:hover": {
//               borderColor: COLORS.primary,
//               bgcolor: COLORS.primary,
//               color: "#ffffff"
//             }
//           }}
//         >
//           <AutoStoriesRoundedIcon sx={{ mr: 1, fontSize: 16 }} />
//           View Course
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }


//--------------------v2

import { Box, Button, Card, CardContent, Chip, Typography, alpha, Stack } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import LayerIcon from "@mui/icons-material/LayersRounded";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../types/courseTypes";

type CourseCardProps = ICourse & {
  isHighlighted?: boolean;
};

const COLORS = {
  primary: "#00a3ff",
  textMain: "#0f172a",
  textSub: "#64748b",
  border: "#e2e8f0",
  cardBg: "#ffffff",
};

const ACCENTS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#6366f1"];

const getAccent = (courseId: string) => {
  const total = courseId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENTS[total % ACCENTS.length];
};

const getTeacherName = (
  teacherId?: ICourse["teacherId"],
  instructor?: ICourse["instructor"]
) => {
  if (typeof instructor === "object") return instructor?.name || "Instructor";
  if (typeof teacherId === "object") return teacherId?.name || "Instructor";
  return typeof instructor === "string" && instructor.trim() ? instructor : "Expert Instructor";
};

export default function CourseCard(props: CourseCardProps) {
  const { _id, title, thumbnail, category, level, teacherId, instructor, isPublished, enrollmentCount } = props;
  const navigate = useNavigate();
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
        bgcolor: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: `0 30px 60px -12px ${alpha(accent, 0.15)}, 0 18px 36px -18px ${alpha("#000", 0.2)}`,
          borderColor: alpha(accent, 0.4),
          "& .course-thumbnail-img": { transform: "scale(1.1)" },
          "& .course-overlay": { opacity: 1 },
          "& .course-action-btn": { transform: "translateX(4px)" }
        },
      }}
    >
      {/* --- Visual Header --- */}
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
        {/* Floating Badges */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          sx={{ position: "absolute", top: 116, left: 6, right: 6, zIndex: 2 }}
        >
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
                color: COLORS.textMain,
                fontWeight: 800,
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            />
          )}
          <Chip
            label={isPublished ? "Published" : "Draft"}
            size="small"
            sx={{
              bgcolor: isPublished ? alpha("#22c55e", 0.9) : "rgba(15, 23, 42, 0.8)",
              color: "#fff",
              backdropFilter: "blur(4px)",
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

      {/* --- Content Architecture --- */}
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Title & Instructor */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, color: COLORS.textMain, mb: 1, 
              fontSize: "1.15rem", lineHeight: 1.3,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              overflow: "hidden", minHeight: "2.9rem"
            }}
          >
            {title}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ display: "flex", p: "4px", borderRadius: "8px", bgcolor: alpha(accent, 0.08) }}>
              <PersonOutlineRoundedIcon sx={{ fontSize: 14, color: accent }} />
            </Box>
            <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 600, fontSize: "0.75rem" }}>
              {teacherName}
            </Typography>
          </Stack>
        </Box>

        {/* Dynamic Metrics */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: COLORS.textSub, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 0.5 }}>
              Difficulty
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <LayerIcon sx={{ fontSize: 14, color: COLORS.textMain }} />
              <Typography sx={{ fontWeight: 700, color: COLORS.textMain, fontSize: "0.85rem" }}>{level || "Beginner"}</Typography>
            </Stack>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: COLORS.textSub, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 0.5 }}>
              Enrolled
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <GroupIcon sx={{ fontSize: 14, color: COLORS.textMain }} />
              <Typography sx={{ fontWeight: 700, color: COLORS.textMain, fontSize: "0.85rem" }}>{enrollmentCount?.toLocaleString() || 0}</Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Footer Action */}
        <Box sx={{ mt: "auto", pt: 2, borderTop: `1px dashed ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
           <Button
            className="course-action-btn"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
            sx={{
              p: 0,
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.9rem",
              color: accent,
              transition: "transform 0.3s ease",
              "&:hover": { bgcolor: "transparent", color: accent }
            }}
          >
            Explore Syllabus
          </Button>
          
          <Box sx={{ width: 32, height: 32, borderRadius: "10px", bgcolor: alpha(accent, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
             <AutoStoriesRoundedIcon sx={{ fontSize: 16, color: accent }} />
          </Box>
        </Box>
      </CardContent>
      </Card>
  );
}
