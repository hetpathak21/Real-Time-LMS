import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCourseById } from "../../features/course/courseThunks";
import {
  createLessonThunk,
  deleteLessonThunk,
  fetchLessonsByCourse,
} from "../../features/lesson/lessonThunks";
import { useAuth } from "../../hooks/useAuth";
import { LessonType } from "../../types/lessonTypes";
import { showToast } from "../../utils/toast";

const initialLessonForm = {
  title: "",
  type: "video" as LessonType,
  file: null as File | null,
  order: "",
  duration: "",
  isPreview: false,
};

export default function CourseDetails() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { selectedCourse, loading } = useAppSelector((state) => state.course);
  const {
    courseLessons,
    loading: lessonLoading,
    error: lessonError,
  } = useAppSelector((state) => state.lesson);
  const [lessonForm, setLessonForm] = useState(initialLessonForm);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchLessonsByCourse(courseId));
    }
  }, [courseId, dispatch]);

  const teacherId =
    typeof selectedCourse?.teacherId === "object"
      ? selectedCourse.teacherId?._id
      : selectedCourse?.teacherId;
  const isTeacherOwner =
    user?.role === "teacher" && !!teacherId && user._id === teacherId;

  const lessons = useMemo(
    () => [...courseLessons].sort((a, b) => a.order - b.order),
    [courseLessons],
  );

  const handleCreateLesson = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseId) {
      return;
    }

    if (!lessonForm.title.trim()) {
      showToast("Lesson title is required", "warning");
      return;
    }

    try {
      await dispatch(
        createLessonThunk({
          courseId,
          data: {
            title: lessonForm.title.trim(),
            type: lessonForm.type,
            contentUrl: lessonForm.contentUrl.trim() || undefined,
            order: lessonForm.order ? Number(lessonForm.order) : undefined,
            duration: lessonForm.duration
              ? Number(lessonForm.duration)
              : undefined,
            isPreview: lessonForm.isPreview,
          },
        }),
      ).unwrap();

      showToast("Lesson created successfully", "success");
      setLessonForm(initialLessonForm);
    } catch (err: any) {
      showToast(err || "Failed to create lesson", "error");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await dispatch(deleteLessonThunk(lessonId)).unwrap();
      showToast("Lesson deleted successfully", "success");
    } catch (err: any) {
      showToast(err || "Failed to delete lesson", "error");
    }
  };

  if (loading && !selectedCourse) return <Typography>Loading...</Typography>;
  if (!selectedCourse) return <Typography>No course found</Typography>;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {selectedCourse.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {selectedCourse.category ? (
                    <Chip label={selectedCourse.category} size="small" />
                  ) : null}
                  <Chip
                    label={selectedCourse.isPublished ? "Published" : "Draft"}
                    size="small"
                    color={selectedCourse.isPublished ? "success" : "default"}
                    variant={selectedCourse.isPublished ? "filled" : "outlined"}
                  />
                </Stack>
              </Box>

              <Stack 
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                width="60%"
              >
                {isTeacherOwner && (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                     style={{width:"100px" , height:"50px" }}
                  >
                    Edit Course
                  </Button>
                )}

                <Button variant="outlined" onClick={() => navigate("/courses")} style={{width:"100px" , height:"50px" }}>
                  Back To Courses
                </Button>
              </Stack>  
            </Stack>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              {selectedCourse.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 3 }}
            >
              <Paper variant="outlined" sx={{ p: 2, flex: 1, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Lessons
                </Typography>
                <Typography>{lessons.length}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, flex: 1, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Enrolled Students
                </Typography>
                <Typography>{selectedCourse.enrollmentCount || 0}</Typography>
              </Paper>
            </Stack>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Course Lessons
            </Typography>

            {lessonError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {lessonError}
              </Alert>
            ) : null}

            {lessonLoading && lessons.length === 0 ? (
              <Typography>Loading lessons...</Typography>
            ) : lessons.length === 0 ? (
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, bgcolor: "#f8fafc" }}
              >
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  No lessons added yet
                </Typography>
                <Typography color="text.secondary">
                  {isTeacherOwner
                    ? "Create the first lesson from the panel on the right."
                    : "This course does not have lesson content yet."}
                </Typography>
              </Paper>
            ) : (
              <List disablePadding>
                {lessons.map((lesson) => (
                  <Paper
                    key={lesson._id}
                    variant="outlined"
                    sx={{ p: 2, borderRadius: 3, mb: 2 }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <ListItem
                        disableGutters
                        sx={{ p: 0, alignItems: "flex-start" }}
                      >
                        <ListItemText
                          primary={
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mb: 1, flexWrap: "wrap" }}
                            >
                              <Typography sx={{ fontWeight: 700 }}>
                                {lesson.order}. {lesson.title}
                              </Typography>
                              <Chip
                                label={lesson.type.toUpperCase()}
                                size="small"
                              />
                              {lesson.isPreview ? (
                                <Chip
                                  label="Preview"
                                  size="small"
                                  color="success"
                                />
                              ) : null}
                            </Stack>
                          }
                          secondary={
                            <Typography color="text.secondary">
                              {lesson.duration
                                ? `${lesson.duration} min`
                                : "No duration set"}
                              {lesson.contentUrl
                                ? " | Content attached"
                                : " | No content URL"}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/lesson/${lesson._id}`)}
                           style={{width:"40px" , height:"40px" }}
                        >
                          Open
                        </Button>
                        {isTeacherOwner ? (
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleDeleteLesson(lesson._id)}
                          >
                            Delete
                          </Button>
                        ) : null}
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {isTeacherOwner ? "Create Lesson" : "Course Access"}
            </Typography>

            {isTeacherOwner ? (
              <Box component="form" onSubmit={handleCreateLesson}>
                <TextField
                  fullWidth
                  label="Lesson Title"
                  value={lessonForm.title}
                  onChange={(event) =>
                    setLessonForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  select
                  label="Type"
                  value={lessonForm.type}
                  onChange={(event) =>
                    setLessonForm((prev) => ({
                      ...prev,
                      type: event.target.value as LessonType,
                    }))
                  }
                  margin="normal"
                >
                  {["video", "text", "pdf", "link"].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Upload Lesson File
                  <input
                    hidden
                    type="file"
                    accept="video/*,.pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;

                      setLessonForm((prev) => ({
                        ...prev,
                        file,
                      }));
                    }}
                  />
                </Button>

                {lessonForm.file && (
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Selected File: {lessonForm.file.name}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Order"
                  type="number"
                  value={lessonForm.order}
                  onChange={(event) =>
                    setLessonForm((prev) => ({
                      ...prev,
                      order: event.target.value,
                    }))
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  type="number"
                  value={lessonForm.duration}
                  onChange={(event) =>
                    setLessonForm((prev) => ({
                      ...prev,
                      duration: event.target.value,
                    }))
                  }
                  margin="normal"
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1, mb: 2, alignItems: "center" }}
                >
                  <Typography>Preview lesson</Typography>
                  <Switch
                    checked={lessonForm.isPreview}
                    onChange={(event) =>
                      setLessonForm((prev) => ({
                        ...prev,
                        isPreview: event.target.checked,
                      }))
                    }
                  />
                </Stack>

                <Button type="submit" fullWidth variant="contained">
                  Add Lesson
                </Button>
              </Box>
            ) : (
              <Typography color="text.secondary">
                Students can open available lessons from the list. Teachers who
                own the course can add or remove lessons here.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
