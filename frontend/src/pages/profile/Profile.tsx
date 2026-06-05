// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { useAuth } from "../../hooks/useAuth";
// import { showToast } from "../../utils/toast";
// import { changePassword, updateProfile } from "../../features/auth/authThunks";
// import {
//   changePasswordSchema,
//   type ChangePasswordFormValues,
//   updateProfileSchema,
//   type UpdateProfileFormValues,
// } from "../../features/auth/authSchemas";

// const errorFieldStyles = {
//   "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
//     borderColor: "error.main",
//     borderWidth: 2,
//   },
// };

// export default function Profile() {
//   const dispatch = useAppDispatch();
//   const { user } = useAuth();
//   const { loading } = useAppSelector((state) => state.auth);

//   const profileForm = useForm<UpdateProfileFormValues>({
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues: {
//       name: user?.name || "",
//       avatar: user?.avatar || "",
//     },
//     mode: "onBlur",
//   });

//   const passwordForm = useForm<ChangePasswordFormValues>({
//     resolver: zodResolver(changePasswordSchema),
//     defaultValues: {
//       oldPassword: "",
//       newPassword: "",
//     },
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     profileForm.reset({
//       name: user?.name || "",
//       avatar: user?.avatar || "",
//     });
//   }, [profileForm, user]);

//   const handleProfileSubmit = async (form: UpdateProfileFormValues) => {
//     try {
//       await dispatch(updateProfile(form)).unwrap();
//       showToast("Profile updated successfully", "success");
//     } catch (error) {
//       showToast(
//         typeof error === "string" ? error : "Unable to update profile.",
//         "error",
//       );
//     }
//   };

//   const handlePasswordSubmit = async (form: ChangePasswordFormValues) => {
//     try {
//       await dispatch(changePassword(form)).unwrap();
//       passwordForm.reset();
//       showToast("Password changed successfully", "success");
//     } catch (error) {
//       showToast(
//         typeof error === "string" ? error : "Unable to change password.",
//         "error",
//       );
//     }
//   };

//   return (
//     <Box>
//       <Grid container spacing={3}>
//         <Grid size={{ xs: 12, lg: 4 }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               border: "1px solid #e2e8f0",
//               height: "100%",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}
//             >
//               <Avatar
//                 src={user?.avatar}
//                 sx={{
//                   width: 96,
//                   height: 96,
//                   fontSize: "2rem",
//                   bgcolor: "#0ea5e9",
//                   mb: 2,
//                 }}
//               >
//                 {user?.name?.charAt(0).toUpperCase()}
//               </Avatar>

//               <Typography variant="h5" sx={{ fontWeight: 800 }}>
//                 {user?.name}
//               </Typography>
//               <Typography sx={{ color: "#64748b", mt: 0.5 }}>
//                 {user?.email}
//               </Typography>

//               <Box
//                 sx={{
//                   mt: 2,
//                   px: 1.5,
//                   py: 0.75,
//                   borderRadius: 99,
//                   bgcolor: "#e0f2fe",
//                   color: "#0369a1",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   fontSize: 12,
//                 }}
//               >
//                 {user?.role}
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid size={{ xs: 12, lg: 8 }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               border: "1px solid #e2e8f0",
//               mb: 3,
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
//               Update Profile
//             </Typography>

//             <form
//               onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
//               noValidate
//             >
//               <TextField
//                 fullWidth
//                 label="Name"
//                 margin="normal"
//                 {...profileForm.register("name")}
//                 error={!!profileForm.formState.errors.name}
//                 helperText={profileForm.formState.errors.name?.message}
//                 slotProps={{
//                   formHelperText: { sx: { color: "error.main", ml: 0 } },
//                 }}
//                 sx={errorFieldStyles}
//               />

//               <TextField
//                 fullWidth
//                 label="Avatar URL"
//                 margin="normal"
//                 {...profileForm.register("avatar")}
//                 error={!!profileForm.formState.errors.avatar}
//                 helperText={
//                   profileForm.formState.errors.avatar?.message || "Optional"
//                 }
//                 slotProps={{
//                   formHelperText: {
//                     sx: {
//                       color: profileForm.formState.errors.avatar
//                         ? "error.main"
//                         : "#64748b",
//                       ml: 0,
//                     },
//                   },
//                 }}
//                 sx={errorFieldStyles}
//               />

//               <Button
//                 variant="contained"
//                 type="submit"
//                 disabled={loading}
//                 sx={{ mt: 2, minWidth: 180 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={22} color="inherit" />
//                 ) : (
//                   "Save Profile"
//                 )}
//               </Button>
//             </form>
//           </Paper>

//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
//               Change Password
//             </Typography>
//             <Typography sx={{ color: "#64748b", mb: 3 }}>
//               Use the same password rules as used in registration and login
//               forms.
//             </Typography>

//             <form
//               onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
//               noValidate
//             >
//               <TextField
//                 fullWidth
//                 type="password"
//                 label="Old Password"
//                 margin="normal"
//                 {...passwordForm.register("oldPassword")}
//                 error={!!passwordForm.formState.errors.oldPassword}
//                 helperText={passwordForm.formState.errors.oldPassword?.message}
//                 slotProps={{
//                   formHelperText: { sx: { color: "error.main", ml: 0 } },
//                 }}
//                 sx={errorFieldStyles}
//               />

//               <TextField
//                 fullWidth
//                 type="password"
//                 label="New Password"
//                 margin="normal"
//                 {...passwordForm.register("newPassword")}
//                 error={!!passwordForm.formState.errors.newPassword}
//                 helperText={passwordForm.formState.errors.newPassword?.message}
//                 slotProps={{
//                   formHelperText: { sx: { color: "error.main", ml: 0 } },
//                 }}
//                 sx={errorFieldStyles}
//               />

//               <Divider sx={{ my: 2 }} />

//               <Button
//                 variant="contained"
//                 type="submit"
//                 disabled={loading}
//                 sx={{ minWidth: 220 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={22} color="inherit" />
//                 ) : (
//                   "Update Password"
//                 )}
//               </Button>
//             </form>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    },
    mode: "onBlur",
  });

  const avatarFile = profileForm.watch("avatar");

  const previewImage = avatarFile?.[0]
    ? URL.createObjectURL(avatarFile[0])
    : user?.avatar;

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
      sx={{ bgcolor: COLORS.bgLight, minHeight: "100vh", py: { xs: 4, md: 6 } }}
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
                border: `1px solid ${COLORS.border}`,
                bgcolor: COLORS.cardBg,
                boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
              }}
            >
              <Stack alignItems="center" spacing={2.5}>
                <Avatar
                  src={previewImage || user?.avatar}
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: "2.5rem",
                    bgcolor: COLORS.primary,
                    boxShadow: "0 8px 24px rgba(14, 165, 233, 0.2)",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: COLORS.textMain }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSub, mt: 0.5 }}
                  >
                    {user?.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    py: 1,
                    borderRadius: "12px",
                    bgcolor: "#e0f2fe",
                    color: "#0369a1",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: 12,
                    letterSpacing: "0.5px",
                  }}
                >
                  {user?.role}
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* COLUMN 2 (Right Side on Desktop): Form Actions */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {/* Profile Editor Sheet */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "22px",
                  border: `1px solid ${COLORS.border}`,
                  bgcolor: COLORS.cardBg,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: COLORS.textMain }}
                  >
                    Personal Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                    Manage your display identity handles and global avatar
                    metrics.
                  </Typography>
                </Box>

                <form
                  onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                  noValidate
                >
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="Your name"
                      {...profileForm.register("name")}
                      error={!!profileForm.formState.errors.name}
                      helperText={profileForm.formState.errors.name?.message}
                      slotProps={{
                        formHelperText: { sx: { color: "error.main", ml: 0 } },
                      }}
                      sx={inputStyles}
                    />

                    <Box>
                      <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        sx={{
                          borderRadius: "16px",
                          py: 2,
                          borderStyle: "dashed",
                          borderWidth: "2px",
                          textTransform: "none",
                          fontWeight: 700,
                          color: COLORS.textMain,
                          borderColor: COLORS.border,
                          bgcolor: "#f8fafc",

                          "&:hover": {
                            bgcolor: "#f1f5f9",
                            borderColor: COLORS.primary,
                          },
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <Typography fontWeight={700}>
                            Upload Profile Picture
                          </Typography>

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
                                textAlign: "center",
                              }}
                            >
                              Selected: {avatarFile[0].name}
                            </Typography>
                          )}
                        </Stack>

                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          {...profileForm.register("avatar")}
                        />
                      </Button>
                    </Box>
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
                          color:"white",
                          background:
                            "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                          boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          "Save Profiling Data"
                        )}
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Paper>

              {/* Password Vector Sheet */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "22px",
                  border: `1px solid ${COLORS.border}`,
                  bgcolor: COLORS.cardBg,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: COLORS.textMain }}
                  >
                    Security Infrastructure
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.textSub }}>
                    Keep security tight. Use unique symbols, numbers, and
                    capital characters.
                  </Typography>
                </Box>

                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  noValidate
                >
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      placeholder="Enter current password"
                      {...passwordForm.register("oldPassword")}
                      error={!!passwordForm.formState.errors.oldPassword}
                      helperText={
                        passwordForm.formState.errors.oldPassword?.message
                      }
                      slotProps={{
                        formHelperText: { sx: { color: "error.main", ml: 0 } },
                      }}
                      sx={inputStyles}
                    />

                    <TextField
                      fullWidth
                      type="password"
                      label="New Password Token"
                      placeholder="Enter new password token"
                      {...passwordForm.register("newPassword")}
                      error={!!passwordForm.formState.errors.newPassword}
                      helperText={
                        passwordForm.formState.errors.newPassword?.message
                      }
                      slotProps={{
                        formHelperText: { sx: { color: "error.main", ml: 0 } },
                      }}
                      sx={inputStyles}
                    />

                    <Divider sx={{ borderColor: COLORS.border, my: 1 }} />

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
                          background:
                            "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                          boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          "Commit Security Updates"
                        )}
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
