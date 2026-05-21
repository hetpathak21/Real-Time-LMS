import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/authThunks";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

import { showToast } from "../../utils/toast";

export default function Register() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      showToast("All fields are required", "warning");
      return;
    }

    await dispatch(registerUser(form));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 380,
          borderRadius: 4,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
