import { useState } from "react";

import { Box, Paper, Typography, TextField, Button } from "@mui/material";

import { showToast } from "../../utils/toast";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.description) {
      showToast("Please fill all fields", "warning");
      return;
    }

    showToast("Course created successfully", "success");
  };

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 2,
            sm: 4,
          },
          borderRadius: 3,
          maxWidth: 700,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
          }}
        >
          Create Course
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Course Title"
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Description"
            margin="normal"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Create Course
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
