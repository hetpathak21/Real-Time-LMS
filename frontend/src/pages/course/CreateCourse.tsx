// import { useState } from "react";
// import { Box, Paper, Typography, TextField, Button } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../app/hooks"
// import { createCourseThunk } from "../../features/course/courseThunks"
// import { showToast } from "../../utils/toast";

// export default function CreateCourse() {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((state) => state.course);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     description: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.title || !form.category || !form.description) {
//       showToast("Please fill all fields", "warning");
//       return;
//     }

//     try {
//       await dispatch(createCourseThunk(form)).unwrap();
//       showToast("Course created successfully", "success");

//       setForm({ title: "", category: "", description: "" });
//     } catch (err: any) {
//       showToast(err || "Failed to create course", "error");
//     }
//   };

//   return (
//     <Box>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 700 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//           Create Course
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Course Title"
//             margin="normal"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />

//           <TextField
//             fullWidth
//             label="Category"
//             margin="normal"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           />

//           <TextField
//             fullWidth
//             multiline
//             rows={5}
//             label="Description"
//             margin="normal"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Create Course"}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCourseThunk,
  updateCourseThunk,
  fetchCourseById,
} from "../../features/course/courseThunks";

import { showToast } from "../../utils/toast";

export default function CourseFormPage() {
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedCourse, loading } = useAppSelector(
    (state) => state.course
  );

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  /**
   * Fetch course only in edit mode
   */
  useEffect(() => {
    if (isEditMode && courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, isEditMode, dispatch]);

  /**
   * Fill form when course is loaded (edit mode)
   */
  useEffect(() => {
    if (isEditMode && selectedCourse) {
      setForm({
        title: selectedCourse.title || "",
        category: selectedCourse.category || "",
        description: selectedCourse.description || "",
      });
    }
  }, [selectedCourse, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.description) {
      showToast("Please fill all fields", "warning");
      return;
    }

    try {
      if (isEditMode && courseId) {
        // UPDATE COURSE
        await dispatch(
          updateCourseThunk({
            courseId,
            data: form,
          })
        ).unwrap();

        showToast("Course updated successfully", "success");
        navigate(`/courses/${courseId}`);
      } else {
        // CREATE COURSE
        const course = await dispatch(
          createCourseThunk(form)
        ).unwrap();

        showToast("Course created successfully", "success");
        navigate(`/courses/${course._id}`);
      }

      // reset form after create
      if (!isEditMode) {
        setForm({
          title: "",
          category: "",
          description: "",
        });
      }
    } catch (err: any) {
      showToast(err || "Something went wrong", "error");
    }
  };

  if (isEditMode && loading && !selectedCourse) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 700 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {isEditMode ? "Edit Course" : "Create Course"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Course Title"
            margin="normal"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Description"
            margin="normal"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isEditMode
              ? "Update Course"
              : "Create Course"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}