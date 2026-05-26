import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/auth/authThunks";
import {
  loginSchema,
  type LoginFormValues,
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

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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

  const onSubmit = async (form: LoginFormValues) => {
    try {
      const result = await dispatch(loginUser(form)).unwrap();
      showToast("Login successful", "success");
      navigate(getDashboardPathByRole(result.user.role), { replace: true });
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : "Unable to login. Please try again.";
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
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register">
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
