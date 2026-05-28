import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCourseThunk,
  updateCourseThunk,
  fetchCourseById,
} from "../../features/course/courseThunks";

import { showToast } from "../../utils/toast";
import { courseSchema } from "../../features/course/courseSchema";

const levels = ["beginner", "intermediate", "advanced"];

const COLORS = {
  primary: "#0ea5e9",
  primaryHover: "#0284c7",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  border: "#e2e8f0",
};

export default function CreateCourse() {
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedCourse, loading } = useAppSelector((state) => state.course);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialForm = {
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
    tags: "",
    thumbnail: null as File | null,
  };

  const [form, setForm] = useState(initialForm);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (isEditMode && courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !selectedCourse || initializedRef.current) return;

    setForm({
      title: selectedCourse.title || "",
      description: selectedCourse.description || "",
      category: selectedCourse.category || "",
      level: selectedCourse.level || "beginner",
      price: String(selectedCourse.price || ""),
      tags: selectedCourse.tags?.join(", ") || "",
      thumbnail: null,
    });

    initializedRef.current = true;
  }, [selectedCourse, isEditMode]);

  const thumbnailPreview = useMemo(() => {
    if (form.thumbnail) return URL.createObjectURL(form.thumbnail);
    if (isEditMode && selectedCourse?.thumbnail)
      return selectedCourse.thumbnail;
    return "";
  }, [form.thumbnail, isEditMode, selectedCourse]);

  useEffect(() => {
    let url: string | null = null;

    if (form.thumbnail) {
      url = URL.createObjectURL(form.thumbnail);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [form.thumbnail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.level ||
      !form.price
    ) {
      showToast("Please fill all required fields!", "warning");
      return;
    }

    try {
      courseSchema.parse(form);
      setErrors({});

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim() || undefined,
        level: form.level,
        price: Number(form.price),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        thumbnail: form.thumbnail,
      };

      if (isEditMode && courseId) {
        await dispatch(updateCourseThunk({ courseId, data: payload })).unwrap();

        showToast("Course updated successfully", "success");
        navigate(`/courses/${courseId}`);
        return;
      }

      const course = await dispatch(createCourseThunk(payload)).unwrap();

      showToast("Course created successfully", "success");
      navigate(`/courses/${course._id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      showToast(message, "error");
    }
  };

  if (isEditMode && loading && !selectedCourse) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: "22px",
          color: "#fff",
          background:
            "linear-gradient(135deg, #0ea5e9 0%, #0369a1 58%, #082f49 100%)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {isEditMode ? "Update Course" : "Create Course"}
        </Typography>
        <Typography sx={{ opacity: 0.85 }}>
          Build a polished course with details and thumbnail
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="title"
                  value={form.title}
                  error={!!errors.title}
                  onChange={handleChange}
                  label="Title"
                  fullWidth
                />

                <TextField
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      label="Category"
                      fullWidth
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      label="Level"
                      fullWidth
                    >
                      {levels.map((l) => (
                        <MenuItem key={l} value={l}>
                          {l}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <TextField
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  label="Price"
                  type="number"
                  fullWidth
                />

                <TextField
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  label="Tags"
                  helperText="Comma separated"
                  fullWidth
                />

                <Button
                  component="label"
                  startIcon={<CloudUploadRoundedIcon />}
                  variant="outlined"
                >
                  Upload Thumbnail
                  <input hidden type="file" onChange={handleThumbnailChange} />
                </Button>

                {form.thumbnail && (
                  <Typography>Selected: {form.thumbnail.name}</Typography>
                )}

                <Button type="submit" variant="contained">
                  {isEditMode ? "Update" : "Create"}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700 }}>Preview</Typography>

              <Box
                sx={{
                  height: 200,
                  mt: 2,
                  background: thumbnailPreview
                    ? `url(${thumbnailPreview}) center/cover`
                    : COLORS.primary,
                  borderRadius: 2,
                }}
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
