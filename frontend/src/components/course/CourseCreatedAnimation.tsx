import { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface CourseCreatedAnimationProps {
  open: boolean;
  courseTitle?: string;
  onComplete: () => void;
}

const FULL_ANIMATION_MS = 3000;
const REDUCED_MOTION_MS = 900;

export default function CourseCreatedAnimation({
  open,
  courseTitle,
  onComplete,
}: CourseCreatedAnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  const animationMs = prefersReducedMotion
    ? REDUCED_MOTION_MS
    : FULL_ANIMATION_MS;

  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(onComplete, animationMs);
    return () => window.clearTimeout(timeoutId);
  }, [animationMs, onComplete, open]);

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1600,
            pointerEvents: "none",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(240,249,255,0.96) 0%, rgba(255,255,255,0.72) 100%)",
          }}
        >
          {/* Soft clouds */}
          {[18, 42, 70].map((left, index) => (
            <Box
              key={left}
              component={motion.div}
              initial={{ x: 0, opacity: 0.35 }}
              animate={{ x: prefersReducedMotion ? 0 : [-20, 20, -20] }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                top: `${16 + index * 13}%`,
                left: `${left}%`,
                width: { xs: 90, md: 140 },
                height: { xs: 28, md: 38 },
                borderRadius: 99,
                bgcolor: "rgba(186, 230, 253, 0.5)",
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Airplane */}
          <Box
            component={motion.div}
            initial={{ x: "120vw", y: "8vh", rotate: -8 }}
            animate={{
              x: ["120vw", "50vw", "50vw", "-120vw"],
              y: ["8vh", "14vh", "14vh", "20vh"],
              rotate: [-8, -8, -8, -12],
            }}
            transition={{
              duration: prefersReducedMotion ? 0.4 : 2.2,
              times: [0, 0.45, 0.58, 1],
              ease: "easeInOut",
            }}
            sx={{
              position: "absolute",
              top: { xs: 52, md: 78 },
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#0284c7",
              filter: "drop-shadow(0 20px 24px rgba(2, 132, 199, 0.28))",
            }}
          >
            <FlightTakeoffRoundedIcon sx={{ fontSize: { xs: 66, md: 94 } }} />

            <Box
              component={motion.div}
              animate={{ opacity: [0.25, 0.75, 0.25], scaleX: [0.8, 1.15, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              sx={{
                width: { xs: 82, md: 140 },
                height: 4,
                borderRadius: 99,
                background:
                  "linear-gradient(90deg, rgba(14,165,233,0.55), rgba(14,165,233,0))",
                transformOrigin: "left center",
              }}
            />
          </Box>

          {/* Dropping box */}
          <Box
            component={motion.div}
            initial={{
              opacity: 0,
              x: "-50%",
              y: "12vh",
              rotate: -8,
              scale: 0.85,
            }}
            animate={{
              opacity: [0, 1, 1],
              x: "-50%",
              y: ["12vh", "38vh", "36vh"],
              rotate: [-8, 6, 0],
              scale: [0.85, 1.05, 1],
            }}
            transition={{
              delay: prefersReducedMotion ? 0.1 : 1.05,
              duration: prefersReducedMotion ? 0.3 : 0.75,
              ease: "easeOut",
            }}
            sx={{
              position: "absolute",
              left: "50%",
              top: { xs: 86, md: 112 },
              width: { xs: 82, md: 104 },
              height: { xs: 82, md: 104 },
            }}
          >
            {/* Box open lid */}
            <Box
              component={motion.div}
              animate={{
                rotateX: prefersReducedMotion ? 0 : [0, 0, -68, -68],
              }}
              transition={{
                delay: prefersReducedMotion ? 0 : 1.82,
                duration: 0.35,
                ease: "easeOut",
              }}
              sx={{
                position: "absolute",
                top: 4,
                left: 10,
                right: 10,
                height: 20,
                borderRadius: "9px 9px 4px 4px",
                bgcolor: "#f59e0b",
                transformOrigin: "bottom center",
                boxShadow: "0 12px 22px rgba(245, 158, 11, 0.28)",
              }}
            />

            <Inventory2RoundedIcon
              sx={{
                position: "absolute",
                inset: 0,
                m: "auto",
                fontSize: { xs: 80, md: 100 },
                color: "#d97706",
                filter: "drop-shadow(0 18px 26px rgba(217, 119, 6, 0.25))",
              }}
            />

            {/* Small sparkle */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.8] }}
              transition={{
                delay: prefersReducedMotion ? 0.35 : 2.85,
                duration: 0.8,
                ease: "easeOut",
              }}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: "#38bdf8",
                boxShadow: "0 0 24px rgba(56, 189, 248, 0.8)",
              }}
            />
          </Box>

          {/* Success course card */}
          <Paper
            component={motion.div}
            elevation={0}
            initial={{ opacity: 0, x: "-50%", y: 34, scale: 0.9 }}
            animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0.35 : 3.05,
              duration: prefersReducedMotion ? 0.3 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "absolute",
              left: "50%",
              top: { xs: "55%", md: "56%" },
              width: "min(88vw, 440px)",
              p: { xs: 2, md: 2.5 },
              borderRadius: "20px",
              border: "1px solid rgba(14, 165, 233, 0.24)",
              boxShadow: "0 28px 80px rgba(15, 23, 42, 0.2)",
              bgcolor: "#ffffff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component={motion.div}
                animate={{ rotate: prefersReducedMotion ? 0 : [0, -6, 6, 0] }}
                transition={{ delay: 3.25, duration: 0.7 }}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#e0f2fe",
                  color: "#0284c7",
                  flexShrink: 0,
                }}
              >
                <AutoStoriesRoundedIcon />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
                  Course created successfully
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {courseTitle || "Your new course"} is ready in your list.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
}