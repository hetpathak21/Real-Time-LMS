// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { loginUser } from "../../features/auth/authThunks";
// import {
//   loginSchema,
//   type LoginFormValues,
// } from "../../features/auth/authSchemas";
// import { getDashboardPathByRole } from "../../features/auth/authHelpers";
// import {
//   Box,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   CircularProgress,
//   Link,
// } from "@mui/material";

// import { showToast } from "../../utils/toast";

// const errorFieldStyles = {
//   "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
//     borderColor: "error.main",
//     borderWidth: 2,
//   },
// };

// export default function Login() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, isAuthenticated, user } = useAppSelector(
//     (state) => state.auth,
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       navigate(getDashboardPathByRole(user.role), { replace: true });
//     }
//   }, [isAuthenticated, navigate, user]);

//   const onSubmit = async (form: LoginFormValues) => {
//     try {
//       const result = await dispatch(loginUser(form)).unwrap();
//       showToast("Login successful", "success");
//       navigate(getDashboardPathByRole(result.user.role), { replace: true });
//     } catch (error) {
//       const message =
//         typeof error === "string"
//           ? error
//           : "Unable to login. Please try again.";
//       showToast(message, "error");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           width: 380,
//           borderRadius: 4,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 600,
//           }}
//         >
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <TextField
//             fullWidth
//             label="Email"
//             margin="normal"
//             {...register("email")}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             slotProps={{
//               formHelperText: {
//                 sx: { color: "error.main", ml: 0 },
//               },
//             }}
//             sx={errorFieldStyles}
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             margin="normal"
//             {...register("password")}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             slotProps={{
//               formHelperText: {
//                 sx: { color: "error.main", ml: 0 },
//               },
//             }}
//             sx={errorFieldStyles}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             type="submit"
//             disabled={loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </form>

//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Typography variant="body2">
//             Don't have an account?{" "}
//             <Link component={RouterLink} to="/register">
//               Register
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


//========================v2

import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  IconButton,
  InputAdornment,
  alpha,
  Stack,
} from "@mui/material";

// Direct path imports for stable Vite performance
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutline from "@mui/icons-material/MailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import RocketLaunch from "@mui/icons-material/RocketLaunch";

import { showToast } from "../../utils/toast";

const COLORS = {
  primary: "#00a3ff",
  bgLight: "#f4f7fd",
  cardBg: "#ffffff",
  textMain: "#1e293b",
  textSub: "#64748b",
  purple: "#770cea",
};

// Premium "Slide & Reveal" Animation
const slideIn = {
  "@keyframes slideIn": {
    "0%": { opacity: 0, transform: "translateX(-30px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
  },
  animation: "slideIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
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
      showToast("Welcome back!", "success");
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
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: COLORS.bgLight,
        p: 2,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 960,
          height: { xs: "auto", md: "560px" }, // Slightly shorter than register for better focus
          maxHeight: "90vh",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: `0 24px 64px ${alpha(COLORS.textMain, 0.12)}`,
        }}
      >
        {/* LEFT COLUMN: Branding Side (Inverted colors from Register) */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            p: 6,
            position: "relative",
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0369a1 100%)`,
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Decor */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-10%",
              right: "-10%",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              filter: "blur(40px)",
            }}
          />
          
          <Stack spacing={3} sx={{ zIndex: 1, ...slideIn }}>
            <RocketLaunch sx={{ fontSize: 48, mb: 1, color: "#e0f2fe" }} />
            <Typography variant="h3" fontWeight={800} lineHeight={1.1}>
              Back to your workspace.
            </Typography>
            <Typography sx={{ opacity: 0.85, fontSize: "1.1rem", maxWidth: "340px" }}>
              Pick up exactly where you left off. Your courses and progress are waiting.
            </Typography>
            
            <Box sx={{ pt: 2 }}>
               <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 20, height: 4, bgcolor: alpha('#fff', 0.3), borderRadius: 2 }} />
                  <Box sx={{ width: 40, height: 4, bgcolor: '#fff', borderRadius: 2 }} />
               </Box>
               <Typography variant="caption" sx={{ opacity: 0.7, letterSpacing: 1.5, fontWeight: 600 }}>
                 SECURE STUDENT PORTAL
               </Typography>
            </Box>
          </Stack>
        </Box>

        {/* RIGHT COLUMN: Login Form Section */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.85 },
            bgcolor: "#fff",
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 340, mx: "auto", ...slideIn }}>
            <Typography variant="h4" fontWeight={800} color={COLORS.textMain} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color={COLORS.textSub} sx={{ mb: 4 }}>
              Enter your credentials to access your dashboard.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline sx={{ fontSize: 20, color: COLORS.textSub }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: '#f8fafc' }}}
                />

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ fontSize: 20, color: COLORS.textSub }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            onClick={() => setShowPassword(!showPassword)} 
                            edge="end" 
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: '#f8fafc' }}}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  disableElevation
                  sx={{
                    py: 1.6,
                    mt: 1,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: COLORS.primary,
                    color:"white",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                      bgcolor: "#0092e4", 
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 20px ${alpha(COLORS.primary, 0.3)}`
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" color={COLORS.textSub}>
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    color: COLORS.primary, 
                    fontWeight: 700, 
                    textDecoration: "none",
                    "&:hover": { textDecoration: 'underline' }
                  }}
                >
                  Create one now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}