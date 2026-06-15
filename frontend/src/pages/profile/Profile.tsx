import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
  Stack,
  Container,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { changePassword, updateProfile } from "../../features/auth/authThunks";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../../features/auth/authSchemas";

const COLORS = {
  primary: "#0ea5e9",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#2c3e50",
  textSub: "#8a99ad",
  border: "#e2e8f0",
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "theme.palette.error.main",
    borderWidth: 2,
  },
};

export default function Profile() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { user } = useAuth();
  const { loading } = useAppSelector((state) => state.auth);

  // ================= PROFILE FORM =================

  const profileForm = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      avatar: undefined,
    },
    mode: "onBlur",
  });

  const avatarFile = useWatch({
    control: profileForm.control,
    name: "avatar",
  });

  const previewImage = useMemo(() => {
    if (avatarFile?.[0]) {
      return URL.createObjectURL(avatarFile[0]);
    }
    return user?.avatar;
  }, [avatarFile, user?.avatar]);

  // ================= PASSWORD FORM =================
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
    });
  }, [profileForm, user]);

  const handleProfileSubmit = async (form: UpdateProfileFormValues) => {
    try {
      await dispatch(updateProfile(form)).unwrap();
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast(
        typeof error === "string" ? error : "Unable to update profile.",
        "error",
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
        "error",
      );
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* Core Layout Grid System with strict explicit column layouts */}
        <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
          {/* COLUMN 1 (Left Side on Desktop): Dynamic Avatar Identity Card */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "22px",
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack sx={{ alignItems: "center", spacing: 2.5 }}>
                <Avatar
                  src={previewImage}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.primary.main,
                    fontSize: "2.4rem",
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: COLORS.textMain }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography color="text.secondary">{user?.email}</Typography>
                </Box>

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    mt: 2,
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? theme.palette.action.hover
                        : theme.palette.primary.light,

                    color: COLORS.bgLight,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {user?.role}
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* ================= RIGHT PANEL ================= */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Stack spacing={4}>
              {/* -------- PROFILE FORM -------- */}
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 800, mb: 2.5 }}>
                  Personal Information
                </Typography>

                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Full Name"
                      {...profileForm.register("name")}
                      error={!!profileForm.formState.errors.name}
                      helperText={profileForm.formState.errors.name?.message}
                      sx={inputStyles}
                    />

                    <Button
                      component="label"
                      variant="outlined"
                      sx={{ borderRadius: 2, py: 2 }}
                    >
                      Upload Avatar
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        {...profileForm.register("avatar")}
                      />
                    </Button>

                    <Typography
                      variant="caption"
                      sx={{ color: COLORS.textSub }}
                    >
                      JPG, PNG or WEBP • Max 5MB
                    </Typography>

                    {avatarFile?.[0] && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: COLORS.primary,
                          fontWeight: 700,
                          mt: 1,
                          wordBreak: "break-word",
                        }}
                      >
                        Selected: {avatarFile[0].name}
                      </Typography>
                    )}

                    <Box sx={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                          py: 1.5,
                          px: 4,
                          fontWeight: 700,
                          borderRadius: "12px",
                          textTransform: "none",
                          color: "white",
                          background:
                            "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                          boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          "Save Profile Data"
                        )}
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Paper>

              {/* -------- PASSWORD FORM -------- */}
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 800, mb: 2 }}>
                  Security
                </Typography>

                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                >
                  <Stack spacing={2.5}>
                    <TextField
                      label="Current Password"
                      type="password"
                      {...passwordForm.register("oldPassword")}
                      error={!!passwordForm.formState.errors.oldPassword}
                      helperText={
                        passwordForm.formState.errors.oldPassword?.message
                      }
                      sx={inputStyles}
                    />

                    <TextField
                      label="New Password"
                      type="password"
                      {...passwordForm.register("newPassword")}
                      error={!!passwordForm.formState.errors.newPassword}
                      helperText={
                        passwordForm.formState.errors.newPassword?.message
                      }
                      sx={inputStyles}
                    />

                    <Divider />

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        color: COLORS.bgLight,
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
