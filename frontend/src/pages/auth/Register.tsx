// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { registerUser } from "../../features/auth/authThunks";
// import {
//   registerSchema,
//   type RegisterFormValues,
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

// export default function Register() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, isAuthenticated, user } = useAppSelector(
//     (state) => state.auth
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
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

//   const onSubmit = async (form: RegisterFormValues) => {
//     try {
//       const result = await dispatch(registerUser(form)).unwrap();
//       showToast("Registration successful", "success");
//       navigate(getDashboardPathByRole(result.user.role), { replace: true });
//     } catch (error) {
//       const message =
//         typeof error === "string"
//           ? error
//           : "Unable to register. Please try again.";
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
//           sx={{
//             fontWeight: 600,
//             mb: 2,
//           }}
//         >
//           Register
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <TextField
//             fullWidth
//             label="Name"
//             margin="normal"
//             {...register("name")}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//             slotProps={{
//               formHelperText: {
//                 sx: { color: "error.main", ml: 0 },
//               },
//             }}
//             sx={errorFieldStyles}
//           />

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
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Register"
//             )}
//           </Button>
//         </form>

//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Typography variant="body2">
//             Already have an account?{" "}
//             <Link component={RouterLink} to="/login">
//               Login
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

//===========================================v2

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { registerUser } from "../../features/auth/authThunks";
// import {
//   registerSchema,
//   type RegisterFormValues,
// } from "../../features/auth/authSchemas";
// import { getDashboardPathByRole } from "../../features/auth/authHelpers";

// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   CircularProgress,
//   Link,
//   IconButton,
//   InputAdornment,
//   Grid,
//   alpha,
// } from "@mui/material";
// // Replace your old icons import with these direct path imports:
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import PersonOutline from "@mui/icons-material/PersonOutlined";
// import MailOutline from "@mui/icons-material/MailOutlined"; // Direct path avoids Vite export errors
// import LockOutlined from "@mui/icons-material/LockOutlined";
// import SchoolOutlined from "@mui/icons-material/SchoolOutlined";

// import { showToast } from "../../utils/toast";

// // Explicit Dashboard Color Alignment
// const COLORS = {
//   primary: "#00a3ff",
//   bgLight: "#f4f7fd",
//   cardBg: "#ffffff",
//   textMain: "#1e293b",
//   textSub: "#64748b",
//   border: "#e2e8f0",
//   purple: "#9124f7",
// };

// // Seamless content reveal micro-animation
// const fadeInUp = {
//   "@keyframes fadeInUp": {
//     from: { opacity: 0, transform: "translateY(16px)" },
//     to: { opacity: 1, transform: "translateY(0)" },
//   },
//   animation: "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
// };

// export default function Register() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
  
//   const [showPassword, setShowPassword] = useState(false);
//   const { loading, isAuthenticated, user } = useAppSelector(
//     (state) => state.auth
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
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

//   const onSubmit = async (form: RegisterFormValues) => {
//     try {
//       const result = await dispatch(registerUser(form)).unwrap();
//       showToast("Registration successful", "success");
//       navigate(getDashboardPathByRole(result.user.role), { replace: true });
//     } catch (error) {
//       const message =
//         typeof error === "string"
//           ? error
//           : "Unable to register. Please try again.";
//       showToast(message, "error");
//     }
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   return (
//     <Grid container sx={{ minHeight: "100vh", bgcolor: COLORS.bgLight }}>
      
//       {/* Left Column: LMS Ecosystem Visual Context (Hidden on Mobile) */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         lg={7}
//         sx={{
//           display: { xs: "none", md: "flex" },
//           flexDirection: "column",
//           justifyContent: "space-between",
//           position: "relative",
//           p: 6,
//           background: `linear-gradient(135deg, ${COLORS.purple} 0%, #770cea 100%)`,
//           color: "#ffffff",
//           overflow: "hidden",
//         }}
//       >
//         {/* Absolute Background Accent Blur */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "-15%",
//             right: "-10%",
//             width: "550px",
//             height: "550px",
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.08)",
//             filter: "blur(60px)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Global Hub Logo Header */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, zIndex: 1 }}>
//           <Box
//             sx={{
//               display: "flex",
//               p: 1,
//               borderRadius: "12px",
//               bgcolor: "rgba(255, 255, 255, 0.15)",
//               backdropFilter: "blur(8px)",
//             }}
//           >
//             <SchoolOutlined sx={{ fontSize: 26, color: "#ffffff" }} />
//           </Box>
//           <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
//             EduNex Platform
//           </Typography>
//         </Box>

//         {/* Dynamic Engagement Hero Section */}
//         <Box sx={{ maxWidth: 500, zIndex: 1, ...fadeInUp }}>
//           <Typography
//             variant="h3"
//             sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em", lineHeight: 1.25 }}
//           >
//             Construct and track knowledge effectively.
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ opacity: 0.85, lineHeight: 1.6, color: "#f1f5f9" }}
//           >
//             Gain instant access to workspaces custom built for students, teachers, 
//             and program admins. Connect metrics, handle queues, and manage assignments from one portal.
//           </Typography>
//         </Box>

//         {/* System Meta Print */}
//         <Typography
//           variant="caption"
//           sx={{ opacity: 0.5, zIndex: 1, letterSpacing: 0.5 }}
//         >
//           &copy; {new Date().getFullYear()} EduNex LMS Hub. Fully production-grade.
//         </Typography>
//       </Grid>

//       {/* Right Column: Clean Form Layout Architecture */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         lg={5}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           px: { xs: 3, sm: 6, md: 8, lg: 10 },
//           py: 4,
//         }}
//       >
//         <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", ...fadeInUp }}>
          
//           {/* Mobile-only Branded Element */}
//           <Box
//             sx={{
//               display: { xs: "flex", md: "none" },
//               alignItems: "center",
//               gap: 1.25,
//               mb: 4,
//             }}
//           >
//             <SchoolOutlined sx={{ color: COLORS.primary, fontSize: 30 }} />
//             <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.textMain }}>
//               EduNex
//             </Typography>
//           </Box>

//           <Typography
//             variant="h4"
//             sx={{ fontWeight: 800, color: COLORS.textMain, mb: 1, letterSpacing: "-0.01em" }}
//           >
//             Get Started
//           </Typography>
//           <Typography variant="body2" sx={{ color: COLORS.textSub, mb: 4 }}>
//             Create your account to establish your workspace control center.
//           </Typography>

//           <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
//             {/* Full Name Input */}
//             <TextField
//               fullWidth
//               label="Full Name"
//               margin="normal"
//               {...register("name")}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonOutline sx={{ color: errors.name ? "error.main" : COLORS.textSub, fontSize: 20 }} />
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//               sx={{
//                 mb: 1,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "10px",
//                   bgcolor: COLORS.cardBg,
//                   transition: "box-shadow 0.2s ease",
//                   "&.Mui-focused": {
//                     boxShadow: `${alpha(COLORS.primary, 0.12)} 0 0 0 4px`,
//                   },
//                 },
//               }}
//             />

//             {/* Email Field */}
//             <TextField
//               fullWidth
//               label="Email Address"
//               margin="normal"
//               autoComplete="email"
//               {...register("email")}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MailOutline sx={{ color: errors.email ? "error.main" : COLORS.textSub, fontSize: 20 }} />
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//               sx={{
//                 mb: 1,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "10px",
//                   bgcolor: COLORS.cardBg,
//                   transition: "box-shadow 0.2s ease",
//                   "&.Mui-focused": {
//                     boxShadow: `${alpha(COLORS.primary, 0.12)} 0 0 0 4px`,
//                   },
//                 },
//               }}
//             />

//             {/* Secret Key/Password Field */}
//             <TextField
//               fullWidth
//               type={showPassword ? "text" : "password"}
//               label="Password"
//               margin="normal"
//               autoComplete="new-password"
//               {...register("password")}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlined sx={{ color: errors.password ? "error.main" : COLORS.textSub, fontSize: 20 }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle visible string format"
//                         onClick={handleClickShowPassword}
//                         edge="end"
//                         size="small"
//                       >
//                         {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//               sx={{
//                 mb: 3.5,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "10px",
//                   bgcolor: COLORS.cardBg,
//                   transition: "box-shadow 0.2s ease",
//                   "&.Mui-focused": {
//                     boxShadow: `${alpha(COLORS.primary, 0.12)} 0 0 0 4px`,
//                   },
//                 },
//               }}
//             />

//             {/* Interactive Functional Action Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               disableElevation
//               sx={{
//                 py: 1.4,
//                 borderRadius: "10px",
//                 bgcolor: COLORS.primary,
//                 fontWeight: 600,
//                 textTransform: "none",
//                 fontSize: "0.95rem",
//                 boxShadow: `0 4px 12px ${alpha(COLORS.primary, 0.2)}`,
//                 transition: "all 0.2s ease-in-out",
//                 "&:hover": {
//                   bgcolor: "#0092e4",
//                   boxShadow: `0 6px 16px ${alpha(COLORS.primary, 0.3)}`,
//                   transform: "translateY(-1px)",
//                 },
//                 "&:active": {
//                   transform: "translateY(0)",
//                 },
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={22} color="inherit" />
//               ) : (
//                 "Create Account"
//               )}
//             </Button>
//           </form>

//           {/* Clean Portal Redirect Link */}
//           <Box sx={{ mt: 4, textAlign: "center" }}>
//             <Typography variant="body2" sx={{ color: COLORS.textSub }}>
//               Already have an account?{" "}
//               <Link
//                 component={RouterLink}
//                 to="/login"
//                 sx={{
//                   color: COLORS.primary,
//                   fontWeight: 600,
//                   textDecoration: "none",
//                   ml: 0.5,
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//               >
//                 Sign In
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }

//=================================v3

import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/authThunks";
import { registerSchema, type RegisterFormValues } from "../../features/auth/authSchemas";
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

// Direct path imports for Vite stability
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutline from "@mui/icons-material/PersonOutlined";
import MailOutline from "@mui/icons-material/MailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

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
    "0%": { opacity: 0, transform: "translateX(30px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
  },
  animation: "slideIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards",
};

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardPathByRole(user.role), { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const onSubmit = async (form: RegisterFormValues) => {
    try {
      await dispatch(registerUser(form)).unwrap();
      showToast("Welcome aboard!", "success");
    } catch (error) {
      showToast(typeof error === "string" ? error : "Registration failed", "error");
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
        overflow: "hidden", // Prevents body scroll
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 960,
          height: { xs: "auto", md: "600px" }, // Fixed height for desktop
          maxHeight: "90vh",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: `0 24px 64px ${alpha(COLORS.textMain, 0.12)}`,
        }}
      >
        {/* LEFT COLUMN: Visual/Colored Branding */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            p: 6,
            position: "relative",
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.primary} 100%)`,
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Orbs */}
          <Box
            sx={{
              position: "absolute",
              top: "-10%",
              left: "-10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              filter: "blur(50px)",
            }}
          />
          
          <Stack spacing={3} sx={{ zIndex: 1, ...slideIn }}>
            <AutoAwesome sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h3" fontWeight={800} lineHeight={1.1}>
              Level up your learning.
            </Typography>
            <Typography sx={{ opacity: 0.8, fontSize: "1.1rem" }}>
              Join our interactive ecosystem designed for the next generation of creators.
            </Typography>
            
            <Box sx={{ pt: 4 }}>
               <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 40, height: 4, bgcolor: '#fff', borderRadius: 2 }} />
                  <Box sx={{ width: 20, height: 4, bgcolor: alpha('#fff', 0.3), borderRadius: 2 }} />
               </Box>
               <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase' }}>
                 Premium LMS Experience
               </Typography>
            </Box>
          </Stack>
        </Box>

        {/* RIGHT COLUMN: Form Section */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.9 },
            bgcolor: "#fff",
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 360, mx: "auto", ...slideIn }}>
            <Typography variant="h4" fontWeight={800} color={COLORS.textMain} gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color={COLORS.textSub} sx={{ mb: 4 }}>
              Enter your details to get started.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline sx={{ fontSize: 20, color: COLORS.textSub }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: '#f8fafc' }}}
                />

                <TextField
                  fullWidth
                  label="Email"
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
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
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
                    mt: 2,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: COLORS.primary,
                    color:"white",
                    transition: "all 0.3s",
                    "&:hover": { bgcolor: "#0092e4", transform: "scale(1.02)" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" color={COLORS.textSub}>
                Have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{ color: COLORS.primary, fontWeight: 700, textDecoration: "none" }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}