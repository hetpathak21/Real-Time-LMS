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

// const COLORS = {
//   primary: "#0ea5e9",
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#2c3e50",
//   textSub: "#8a99ad",
//   border: "#e2e8f0",
// };

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
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
          }}
        >
          {/* ================= LEFT PANEL ================= */}
          <Box sx={{ flex: { lg: "0 0 33%" }, width: "100%" }}>
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
                  <Typography sx={{ fontWeight: 700 }} variant="h5">
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

                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {user?.role}
                </Box>
              </Stack>
            </Paper>
          </Box>

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
                        type="file"
                        hidden
                        accept="image/*"
                        {...profileForm.register("avatar")}
                      />
                    </Button>

                    {avatarFile?.[0] && (
                      <Typography variant="caption">
                        Selected: {avatarFile[0].name}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save Profile"
                      )}
                    </Button>
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

                    <Button type="submit" variant="contained">
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
        </Box>
      </Container>
    </Box>
  );
}
