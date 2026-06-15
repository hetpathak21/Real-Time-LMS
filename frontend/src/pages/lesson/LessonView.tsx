// src/pages/lessons/LessonView.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchLessonsByCourse,
  fetchLessonById,
} from "../../features/lesson/lessonThunks";
import LessonSidebar from "../../components/lessons/LessonSidebar";
import LessonPlayer from "../../components/lessons/LessonPlayer";
import LessonSkeleton from "../../components/lessons/LessonSkeleton";
import { selectCourseLessons, selectLessonLoading, selectSelectedLesson } from "../../features/lesson/lessonSelectors";

export default function LessonView() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [mobileOpen, setMobileOpen] = useState(false);
  //const { lessons, selectedLesson, loading } = useAppSelector((state) => state.lessons);
  // Replace line 285 with this:
  const lessons = useAppSelector(selectCourseLessons);
  const selectedLesson = useAppSelector(selectSelectedLesson);
  const loading = useAppSelector(selectLessonLoading);
  const resolvedCourseId = useMemo(() => {
    if (courseId) return courseId;
    if (!selectedLesson?.courseId) return undefined;
    return typeof selectedLesson.courseId === "object"
      ? selectedLesson.courseId._id
      : selectedLesson.courseId;
  }, [courseId, selectedLesson?.courseId]);

  console.log(selectedLesson);
  
  useEffect(() => {
    if (resolvedCourseId) dispatch(fetchLessonsByCourse(resolvedCourseId));
  }, [resolvedCourseId, dispatch]);

  useEffect(() => {
    if (lessonId) dispatch(fetchLessonById(lessonId));
  }, [lessonId, dispatch]);

  const handleLessonSelection = (targetId: string) => {
    navigate(`/lesson/${targetId}`);
    if (isMobile) setMobileOpen(false);
  };

  if (loading && !selectedLesson) {
    return (
      <Box sx={{ p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <LessonSkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* PERSISTENT SIDEBAR VIEW (Desktop Profile Layouts) */}
      {!isMobile && (
        <Box
          sx={{
            width: "320px",
            minWidth: "320px",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <LessonSidebar
            lessons={lessons}
            activeLessonId={lessonId}
            onSelectLesson={handleLessonSelection}
          />
        </Box>
      )}

      {/* OVERLAY NAVIGATION TRACKS DRAWER (Responsive Mobile/Tablet Breaks) */}
      <Drawer
        aria-label="Curriculum tracking overlay container"
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "290px" },
        }}
      >
        <LessonSidebar
          lessons={lessons}
          activeLessonId={lessonId}
          onSelectLesson={handleLessonSelection}
        />
      </Drawer>

      {/* CORE FRAME PLAYER APPLICATION WORKSPACE */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isMobile && (
          <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 2, color: "#475569" }}
                aria-label="Toggle navigation map"
              >
                <MenuRoundedIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontWeight: 700, color: "#1e293b" }}
              >
                {selectedLesson?.title || "Classroom Reader Viewport"}
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ p: { xs: 2.5, md: 5 }, flexGrow: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Box
              onClick={() => navigate(`/course/${resolvedCourseId || ""}`)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "#0ea5e9",
                cursor: "pointer",
                mb: 2,
                "&:hover .back-label": { textDecoration: "underline" },
              }}
            >
              <ArrowBackIosNewRoundedIcon
                sx={{ fontSize: 12, fontWeight: 800 }}
              />
              <Typography className="back-label" variant="subtitle2" sx={{ fontWeight: 700 }}>
                Back to course
              </Typography>
            </Box>
            {!isMobile && (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                {selectedLesson?.title}
              </Typography>
            )}
          </Box>

          {selectedLesson ? (
            <LessonPlayer
              lessonId={selectedLesson._id}
              type={selectedLesson.type}
              contentUrl={selectedLesson.contentUrl}
              textContent={selectedLesson.textContent}
              fileName={selectedLesson.fileName}
              title={selectedLesson.title}
            />
          ) : (
            <Box sx={{ p: 5, textAlign: "center", color: "#64748b" }}>
              Please select an structural lesson track node to initialize
              viewports.
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
