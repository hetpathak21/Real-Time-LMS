import { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import CourseCreatedAnimation from "../components/course/CourseCreatedAnimation";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { dismissCourseCreatedAnimation } from "../features/course/courseSlice";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const courseCreationAnimation = useAppSelector(
    (state) => state.course.courseCreationAnimation,
  );
  const handleAnimationComplete = useCallback(() => {
    dispatch(dismissCourseCreatedAnimation());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Prevent navbar overlap */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Kept at layout level so the success animation survives page navigation. */}
      <CourseCreatedAnimation
        open={Boolean(courseCreationAnimation)}
        courseTitle={courseCreationAnimation?.title}
        onComplete={handleAnimationComplete}
      />
    </Box>
  );
}
