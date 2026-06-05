// src/components/lessons/LessonForm.tsx
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import {
  lessonSchema,
  LessonFormInput,
  LessonFormValues,
  COLORS,
} from "../../features/lesson/lessonSchema";

interface LessonFormProps {
  initialValues?: Partial<LessonFormValues>;
  onSubmit: (data: FormData | LessonFormValues) => Promise<void>;
  loading: boolean;
}

export default function LessonForm({
  initialValues,
  onSubmit,
  loading,
}: LessonFormProps) {
  const [sourceMode, setSourceMode] = useState<"file" | "url">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LessonFormInput, undefined, LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: initialValues?.title || "",
      type: initialValues?.type || "video",
      duration: initialValues?.duration ?? 0,
      order: initialValues?.order ?? 0,
      isPreview: initialValues?.isPreview ?? false,
      contentUrl: initialValues?.contentUrl || "",
      textContent: initialValues?.textContent || "",
    },
  });
  const selectedType = watch("type");

  useEffect(() => {
    if (initialValues?.contentUrl) {
      setSourceMode("url");
    }
  }, [initialValues]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    setFileError("");
    if (selectedType === "video" && !file.type.startsWith("video/")) {
      setFileError("Invalid asset: Please drop an MP4/WebM video container");
      return;
    }
    if (selectedType === "pdf" && file.type !== "application/pdf") {
      setFileError("Invalid asset: File must be a PDF document");
      return;
    }
    if (
      selectedType === "document" &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setFileError("Invalid asset: Please upload a PDF, DOC, or DOCX file");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      // 50MB Cap Guard
      setFileError(
        "File weight warning: Target payload exceeds 50MB boundary threshold",
      );
      return;
    }
    setSelectedFile(file);
  };

  // Inside src/components/lessons/LessonForm.tsx

  const onFormSubmit = async (values: LessonFormValues) => {
    if (
      (selectedType === "video" || selectedType === "pdf" || selectedType === "document") &&
      sourceMode === "file"
    ) {
      if (!selectedFile && !initialValues?.contentUrl) {
        setFileError(
          "Please anchor a structural display file asset to publish",
        );
        return;
      }

      if (selectedFile) {
        const multipartPayload = new FormData();

        multipartPayload.append("title", values.title);
        multipartPayload.append("type", values.type);
        multipartPayload.append("duration", String(values.duration));
        multipartPayload.append("order", String(values.order));
        multipartPayload.append("isPreview", String(values.isPreview));
        multipartPayload.append("content", selectedFile);

        if (values.textContent) {
          multipartPayload.append("textContent", values.textContent);
        }

        await onSubmit(multipartPayload);
        return;
      }
    }

    if (
      (selectedType === "video" || selectedType === "pdf" || selectedType === "document") &&
      sourceMode === "url"
    ) {
      if (!values.contentUrl?.trim().startsWith("http")) {
        setFileError("Please provide a valid http or https URL");
        return;
      }
    }

    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Stack spacing={3.5}>
        <TextField
          fullWidth
          label="Lesson Structural Title"
          placeholder="e.g., Introduction to State Machine Arrays"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Core Type Classification"
              {...register("type")}
              error={!!errors.type}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            >
              {["video", "pdf", "document", "text", "link"].map((t) => (
                <MenuItem
                  key={t}
                  value={t}
                  sx={{ textTransform: "capitalize" }}
                >
                  {t}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Duration Metrics (Minutes)"
              {...register("duration")}
              error={!!errors.duration}
              helperText={errors.duration?.message}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Curriculum Sort Order Sequence"
              {...register("order")}
              error={!!errors.order}
              helperText={errors.order?.message}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>
        </Grid>

        <Controller
          name="isPreview"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Flag Lesson Available as Free Preview Segment"
            />
          )}
        />

        {selectedType === "text" && (
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Formatted Reading Text Content Markdown Frame"
            placeholder="Write core lesson documents natively here..."
            {...register("textContent")}
            error={!!errors.textContent}
            helperText={errors.textContent?.message}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
        )}

        {(selectedType === "video" || selectedType === "pdf" || selectedType === "document") && (
          <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                size="small"
                variant={sourceMode === "url" ? "contained" : "outlined"}
                onClick={() => setSourceMode("url")}
                sx={{ borderRadius: "8px" }}
              >
                Remote URL Asset
              </Button>
              <Button
                size="small"
                variant={sourceMode === "file" ? "contained" : "outlined"}
                onClick={() => setSourceMode("file")}
                sx={{ borderRadius: "8px" }}
              >
                Local File Upload
              </Button>
            </Stack>

            {sourceMode === "url" ? (
              <TextField
                fullWidth
                label="Resource Deployment Address URL"
                placeholder="https://youtube.com/embed/... or cloud storage bucket link"
                {...register("contentUrl")}
                error={!!errors.contentUrl}
                helperText={errors.contentUrl?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            ) : (
              <Paper
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                sx={{
                  p: 4,
                  border: `2px dashed ${fileError ? "red" : COLORS.primary}`,
                  borderRadius: "16px",
                  textAlign: "center",
                  bgcolor: "rgba(14, 165, 233, 0.01)",
                }}
              >
                <CloudUploadRoundedIcon
                  sx={{ fontSize: 40, color: COLORS.primary, mb: 1 }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Drag asset file here
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block" }}
                >
                  Supported bounds: Max 50MB tracking weight limit
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadRoundedIcon />}
                  sx={{ mt: 2, borderRadius: "10px", textTransform: "none" }}
                >
                  Choose file
                  <input
                    type="file"
                    hidden
                    accept={
                      selectedType === "video"
                        ? "video/*"
                        : selectedType === "pdf"
                          ? "application/pdf"
                          : ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    }
                    onChange={(e) =>
                      e.target.files?.[0] && validateAndSetFile(e.target.files[0])
                    }
                  />
                </Button>
                {selectedFile && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 2,
                      p: 1,
                      bgcolor: "#f1f5f9",
                      borderRadius: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InsertDriveFileRoundedIcon
                      sx={{ color: COLORS.textMain }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {selectedFile.name}
                    </Typography>
                  </Stack>
                )}
                {fileError && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 1, fontWeight: 600, display: "block" }}
                  >
                    {fileError}
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        )}

        {selectedType === "link" && (
          <TextField
            fullWidth
            label="Destination Resource Redirect Address URL"
            placeholder="https://github.com/repository-link"
            {...register("contentUrl")}
            error={!!errors.contentUrl}
            helperText={errors.contentUrl?.message}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.6,
            fontWeight: 700,
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%)`,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Deploy Curriculum Target Node"
          )}
        </Button>
      </Stack>
    </form>
  );
}
