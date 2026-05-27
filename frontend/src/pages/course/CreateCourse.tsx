import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  createCourseThunk,
  updateCourseThunk,
  fetchCourseById,
} from "../../features/course/courseThunks";

import { showToast } from "../../utils/toast";

const levels = [
  "beginner",
  "intermediate",
  "advanced",
];

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
};

export default function CreateCourse() {
  const { courseId } = useParams();

  const isEditMode = Boolean(courseId);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { selectedCourse, loading } =
    useAppSelector((state) => state.course);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
    tags: "",
    thumbnail: null as File | null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  /**
   * Fetch course
   */
  useEffect(() => {
    if (isEditMode && courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId, isEditMode]);

  /**
   * Fill form
   */
  useEffect(() => {
    if (isEditMode && selectedCourse) {
      setForm({
        title: selectedCourse.title || "",
        description:
          selectedCourse.description || "",
        category:
          selectedCourse.category || "",
        level:
          selectedCourse.level || "beginner",
        price: String(
          selectedCourse.price || ""
        ),
        tags:
          selectedCourse.tags?.join(", ") || "",
        thumbnail: null,
      });
      setThumbnailPreview(selectedCourse.thumbnail || "");
    }
  }, [selectedCourse, isEditMode]);

  useEffect(() => {
    if (!form.thumbnail) {
      if (!isEditMode) {
        setThumbnailPreview("");
      }
      return;
    }

    const objectUrl = URL.createObjectURL(form.thumbnail);
    setThumbnailPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [form.thumbnail, isEditMode]);

  /**
   * Handle text change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle file
   */
  const handleThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  /**
   * Submit
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.level ||
      !form.price
    ) {
      showToast(
        "Please fill all required fields",
        "warning"
      );

      return;
    }

    try {
      const tagsArray = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim() || undefined,
        level: form.level,
        price: Number(form.price),
        tags: tagsArray,
        thumbnail: form.thumbnail,
      };

      /**
       * UPDATE
       */
      if (isEditMode && courseId) {
        await dispatch(
          updateCourseThunk({
            courseId,
            data: payload,
          })
        ).unwrap();

        showToast(
          "Course updated successfully",
          "success"
        );

        navigate(`/courses/${courseId}`);
      }

      /**
       * CREATE
       */
      else {
        const course = await dispatch(
          createCourseThunk(payload)
        ).unwrap();

        showToast(
          "Course created successfully",
          "success"
        );

        navigate(`/courses/${course._id}`);
      }
    } catch (error: any) {
      console.log(error);

      showToast(
        error || "Validation failed",
        "error"
      );
    }
  };

  if (
    isEditMode &&
    loading &&
    !selectedCourse
  ) {
    return (
      <Typography>
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: COLORS.bgLight,
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 3,
          borderRadius: "22px",
          color: "#ffffff",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 58%, #082f49 100%)",
          boxShadow: "0 24px 50px rgba(14, 165, 233, 0.22)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
          }}
        >
          {isEditMode
            ? "Update Course"
            : "Create Course"}
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.84)", lineHeight: 1.7, maxWidth: 720 }}>
          Build a polished course page with a strong title, crisp thumbnail, and details that match the dashboard experience.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: { xs: 3, md: 4 },
              borderRadius: "22px",
              border: "1px solid #e2e8f0",
              bgcolor: COLORS.cardBg,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 0.75 }}>
              Course Information
            </Typography>
            <Typography sx={{ color: COLORS.textSub, mb: 3 }}>
              Fill in the content below to publish a premium-looking course card and detail page.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Course Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                />

                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  fullWidth
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      label="Level"
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    >
                      {levels.map((level) => (
                        <MenuItem
                          key={level}
                          value={level}
                        >
                          {level}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      type="number"
                      label="Price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Tags"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      helperText="Comma separated tags"
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    />
                  </Grid>
                </Grid>

                {form.tags ? (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {form.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          sx={{ fontWeight: 700 }}
                        />
                      ))}
                  </Box>
                ) : null}

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadRoundedIcon />}
                  sx={{
                    borderRadius: "14px",
                    py: 1.3,
                    textTransform: "none",
                    fontWeight: 700,
                    borderStyle: "dashed",
                  }}
                >
                  Upload Thumbnail

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={
                      handleThumbnailChange
                    }
                  />
                </Button>

                {form.thumbnail ? (
                  <Typography variant="body2" sx={{ color: "#0369a1", fontWeight: 700 }}>
                    Selected: {form.thumbnail.name}
                  </Typography>
                ) : null}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    borderRadius: "14px",
                    textTransform: "none",
                    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                    boxShadow: "0 14px 26px rgba(14, 165, 233, 0.24)",
                  }}
                >
                  {loading
                    ? "Please wait..."
                    : isEditMode
                    ? "Update Course"
                    : "Create Course"}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "22px",
                bgcolor: COLORS.cardBg,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 2 }}>
                Preview Highlights
              </Typography>
              <Stack spacing={1.5}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <SchoolRoundedIcon sx={{ color: COLORS.primary }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 700 }}>
                        Level
                      </Typography>
                      <Typography sx={{ color: COLORS.textMain, fontWeight: 700, textTransform: "capitalize" }}>
                        {form.level}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <SellRoundedIcon sx={{ color: "#14b8a6" }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 700 }}>
                        Price
                      </Typography>
                      <Typography sx={{ color: COLORS.textMain, fontWeight: 700 }}>
                        {form.price ? `Rs. ${form.price}` : "Free"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <AutoStoriesRoundedIcon sx={{ color: "#f59e0b" }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: COLORS.textSub, fontWeight: 700 }}>
                        Category
                      </Typography>
                      <Typography sx={{ color: COLORS.textMain, fontWeight: 700 }}>
                        {form.category || "General"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 0,
                overflow: "hidden",
                borderRadius: "22px",
                bgcolor: COLORS.cardBg,
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  height: 220,
                  background: thumbnailPreview
                    ? `url(${thumbnailPreview}) center/cover no-repeat`
                    : "linear-gradient(135deg, #0ea5e9 0%, #0369a1 58%, #082f49 100%)",
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain, mb: 1 }}>
                  {form.title || "Course title preview"}
                </Typography>
                <Typography sx={{ color: COLORS.textSub, lineHeight: 1.7 }}>
                  {form.description || "Your course description will appear here to preview how the detail page feels."}
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
