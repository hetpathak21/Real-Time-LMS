import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import {
  changePassword,
  updateProfile,
} from "../../features/auth/authThunks";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../../features/auth/authSchemas";

const errorFieldStyles = {
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "error.main",
    borderWidth: 2,
  },
};

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { loading } = useAppSelector((state) => state.auth);

  const profileForm = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      avatar: user?.avatar || "",
    },
    mode: "onBlur",
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    profileForm.reset({
      name: user?.name || "",
      avatar: user?.avatar || "",
    });
  }, [profileForm, user]);

  const handleProfileSubmit = async (form: UpdateProfileFormValues) => {
    try {
      await dispatch(updateProfile(form)).unwrap();
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast(
        typeof error === "string" ? error : "Unable to update profile.",
        "error"
      );
    }
  };

  const handlePasswordSubmit = async (form: ChangePasswordFormValues) => {
    try {
      await dispatch(changePassword(form)).unwrap();
      passwordForm.reset();
      showToast("Password changed successfully", "success");
    } catch (error) {
      showToast(
        typeof error === "string" ? error : "Unable to change password.",
        "error"
      );
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: "2rem",
                  bgcolor: "#0ea5e9",
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {user?.name}
              </Typography>
              <Typography sx={{ color: "#64748b", mt: 0.5 }}>
                {user?.email}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 99,
                  bgcolor: "#e0f2fe",
                  color: "#0369a1",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                {user?.role}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Profile Settings
            </Typography>
            <Typography sx={{ color: "#64748b", mb: 3 }}>
              Update your basic account details with the same validation style as login and signup.
            </Typography>

            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} noValidate>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                {...profileForm.register("name")}
                error={!!profileForm.formState.errors.name}
                helperText={profileForm.formState.errors.name?.message}
                slotProps={{ formHelperText: { sx: { color: "error.main", ml: 0 } } }}
                sx={errorFieldStyles}
              />

              <TextField
                fullWidth
                label="Avatar URL"
                margin="normal"
                {...profileForm.register("avatar")}
                error={!!profileForm.formState.errors.avatar}
                helperText={profileForm.formState.errors.avatar?.message || "Optional"}
                slotProps={{ formHelperText: { sx: { color: profileForm.formState.errors.avatar ? "error.main" : "#64748b", ml: 0 } } }}
                sx={errorFieldStyles}
              />

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ mt: 2, minWidth: 180 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Save Profile"}
              </Button>
            </form>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Change Password
            </Typography>
            <Typography sx={{ color: "#64748b", mb: 3 }}>
              Use the same password rules already enforced in the backend and auth forms.
            </Typography>

            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} noValidate>
              <TextField
                fullWidth
                type="password"
                label="Old Password"
                margin="normal"
                {...passwordForm.register("oldPassword")}
                error={!!passwordForm.formState.errors.oldPassword}
                helperText={passwordForm.formState.errors.oldPassword?.message}
                slotProps={{ formHelperText: { sx: { color: "error.main", ml: 0 } } }}
                sx={errorFieldStyles}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                margin="normal"
                {...passwordForm.register("newPassword")}
                error={!!passwordForm.formState.errors.newPassword}
                helperText={passwordForm.formState.errors.newPassword?.message}
                slotProps={{ formHelperText: { sx: { color: "error.main", ml: 0 } } }}
                sx={errorFieldStyles}
              />

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ minWidth: 220 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Update Password"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
