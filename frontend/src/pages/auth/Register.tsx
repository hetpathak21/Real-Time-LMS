import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/authThunks";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../features/auth/authSchemas";
import { getDashboardPathByRole } from "../../features/auth/authHelpers";

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

const errorFieldStyles = {
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "error.main",
    borderWidth: 2,
  },
};

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardPathByRole(user.role), { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const onSubmit = async (form: RegisterFormValues) => {
    try {
      const result = await dispatch(registerUser(form)).unwrap();
      showToast("Registration successful", "success");
      navigate(getDashboardPathByRole(result.user.role), { replace: true });
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : "Unable to register. Please try again.";
      showToast(message, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 380 }}>
        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              formHelperText: {
                sx: { color: "error.main", ml: 0 },
              },
            }}
            sx={errorFieldStyles}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              formHelperText: {
                sx: { color: "error.main", ml: 0 },
              },
            }}
            sx={errorFieldStyles}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              formHelperText: {
                sx: { color: "error.main", ml: 0 },
              },
            }}
            sx={errorFieldStyles}
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
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
