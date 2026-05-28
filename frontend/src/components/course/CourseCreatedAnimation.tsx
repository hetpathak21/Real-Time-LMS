import { useEffect } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface CourseCreatedAnimationProps {
  open: boolean;
  courseTitle?: string;
  onComplete: () => void;
}

const FULL_ANIMATION_MS = 4800;
const REDUCED_MOTION_MS = 1000;

const sparkles = [
  { left: "37%", top: "35%", size: 13, delay: 2.55 },
  { left: "46%", top: "28%", size: 17, delay: 2.7 },
  { left: "57%", top: "32%", size: 14, delay: 2.85 },
  { left: "62%", top: "44%", size: 16, delay: 3 },
  { left: "41%", top: "50%", size: 12, delay: 3.1 },
];

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
      {open ? (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1600,
            pointerEvents: "none",
            overflow: "hidden",
            background:
              "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.96) 0%, rgba(239,246,255,0.92) 45%, rgba(219,234,254,0.8) 100%)",
          }}
        >
          {/* Soft background circles */}
          {[18, 72].map((left, index) => (
            <Box
              key={left}
              component={motion.div}
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [-10, 12, -10], scale: [1, 1.04, 1] }
              }
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                left: `${left}%`,
                top: `${18 + index * 34}%`,
                width: { xs: 110, md: 180 },
                height: { xs: 110, md: 180 },
                borderRadius: "50%",
                bgcolor: "rgba(147, 197, 253, 0.22)",
                filter: "blur(6px)",
              }}
            />
          ))}

          {/* Teacher character */}
          <Box
            component={motion.div}
            initial={{ x: "-36vw", opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { x: "calc(50vw - 220px)", opacity: 1 }
                : {
                    x: ["-36vw", "calc(50vw - 220px)", "calc(50vw - 220px)"],
                    opacity: [0, 1, 1],
                  }
            }
            transition={{
              delay: prefersReducedMotion ? 0.05 : 0.25,
              duration: prefersReducedMotion ? 0.2 : 1.05,
              times: [0, 0.82, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "absolute",
              top: { xs: "29%", md: "31%" },
              left: 0,
              width: { xs: 130, sm: 150, md: 175 },
              height: { xs: 180, sm: 205, md: 235 },
              filter: "drop-shadow(0 26px 36px rgba(15, 23, 42, 0.18))",
            }}
          >
            {/* Body / blazer */}
            <Box
              sx={{
                position: "absolute",
                left: "25%",
                right: "25%",
                bottom: "6%",
                height: "48%",
                borderRadius: "28px 28px 18px 18px",
                bgcolor: "#1e40af",
                border: "3px solid rgba(255,255,255,0.85)",
              }}
            />

            {/* Shirt */}
            <Box
              sx={{
                position: "absolute",
                left: "38%",
                top: "51%",
                width: "24%",
                height: "30%",
                borderRadius: "0 0 12px 12px",
                bgcolor: "#ffffff",
              }}
            />

            {/* Tie */}
            <Box
              sx={{
                position: "absolute",
                left: "47%",
                top: "54%",
                width: "6%",
                height: "24%",
                borderRadius: "8px",
                bgcolor: "#f97316",
              }}
            />

            {/* Neck */}
            <Box
              sx={{
                position: "absolute",
                left: "43%",
                top: "40%",
                width: "14%",
                height: "14%",
                borderRadius: "12px",
                bgcolor: "#f3b78f",
              }}
            />

            {/* Face */}
            <Box
              sx={{
                position: "absolute",
                left: "32%",
                top: "17%",
                width: "36%",
                aspectRatio: "1",
                borderRadius: "50%",
                bgcolor: "#f8c7a5",
                border: "3px solid rgba(255,255,255,0.85)",
              }}
            />

            {/* Hair */}
            <Box
              sx={{
                position: "absolute",
                left: "30%",
                top: "12%",
                width: "40%",
                height: "20%",
                borderRadius: "28px 28px 10px 10px",
                bgcolor: "#334155",
              }}
            />

            {/* Glasses / eyes */}
            <Box
              sx={{
                position: "absolute",
                left: "38%",
                top: "31%",
                width: "7%",
                aspectRatio: "1",
                borderRadius: "50%",
                border: "2px solid #334155",
                boxShadow: "22px 0 0 -2px #f8c7a5, 22px 0 0 0 #334155",
              }}
            />

            {/* Smile */}
            <Box
              sx={{
                position: "absolute",
                left: "44%",
                top: "40%",
                width: "12%",
                height: "6%",
                borderBottom: "3px solid #92400e",
                borderRadius: "0 0 20px 20px",
              }}
            />

            {/* Arm pointing to book */}
            <Box
              component={motion.div}
              animate={
                prefersReducedMotion
                  ? {}
                  : { rotate: [4, -8, 4], y: [0, -3, 0] }
              }
              transition={{
                delay: 1.35,
                duration: 1,
                repeat: 1,
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                right: "2%",
                top: "55%",
                width: "38%",
                height: "12%",
                borderRadius: 99,
                bgcolor: "#1e40af",
                transformOrigin: "left center",
              }}
            />

            {/* Graduation/teacher badge */}
            <Box
              sx={{
                position: "absolute",
                left: "34%",
                bottom: "18%",
                width: 38,
                height: 38,
                borderRadius: "12px",
                bgcolor: "#dbeafe",
                color: "#1d4ed8",
                display: "grid",
                placeItems: "center",
              }}
            >
              <SchoolRoundedIcon fontSize="small" />
            </Box>
          </Box>

          {/* Notebook */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: "-50%", y: 42, scale: 0.72 }}
            animate={{
              opacity: prefersReducedMotion ? 1 : [0, 1, 1],
              x: "-50%",
              y: prefersReducedMotion ? 0 : [42, -8, 0],
              scale: prefersReducedMotion ? 1 : [0.72, 1.06, 1],
            }}
            transition={{
              delay: prefersReducedMotion ? 0.16 : 1.35,
              duration: prefersReducedMotion ? 0.2 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "absolute",
              left: "50%",
              top: { xs: "49%", md: "51%" },
              width: { xs: 160, sm: 190, md: 230 },
              height: { xs: 106, sm: 126, md: 150 },
              perspective: 900,
            }}
          >
            {/* Left page */}
            <Box
              component={motion.div}
              initial={{ rotateY: 0 }}
              animate={
                prefersReducedMotion
                  ? { rotateY: -18 }
                  : { rotateY: [0, 0, -28, -18] }
              }
              transition={{
                delay: prefersReducedMotion ? 0.3 : 2.05,
                duration: prefersReducedMotion ? 0.2 : 0.75,
                ease: "easeOut",
              }}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "50%",
                height: "100%",
                borderRadius: "18px 8px 8px 18px",
                bgcolor: "#ffffff",
                border: "2px solid #bfdbfe",
                transformOrigin: "right center",
                boxShadow: "0 24px 55px rgba(15, 23, 42, 0.14)",
                p: 1.5,
              }}
            >
              {[18, 42, 66].map((top) => (
                <Box
                  key={top}
                  sx={{
                    position: "absolute",
                    left: "18%",
                    top: `${top}%`,
                    width: "58%",
                    height: 4,
                    borderRadius: 99,
                    bgcolor: "#dbeafe",
                  }}
                />
              ))}
            </Box>

            {/* Right page */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "50%",
                height: "100%",
                borderRadius: "8px 18px 18px 8px",
                bgcolor: "#ffffff",
                border: "2px solid #bfdbfe",
                boxShadow: "0 24px 55px rgba(15, 23, 42, 0.14)",
                p: 1.5,
              }}
            >
              <MenuBookRoundedIcon
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "42%",
                  transform: "translate(-50%, -50%)",
                  fontSize: { xs: 36, md: 44 },
                  color: "#2563eb",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: "26%",
                  bottom: "22%",
                  width: "48%",
                  height: 5,
                  borderRadius: 99,
                  bgcolor: "#bfdbfe",
                }}
              />
            </Box>

            {/* Center binding */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: 6,
                bottom: 6,
                width: 3,
                transform: "translateX(-50%)",
                borderRadius: 99,
                bgcolor: "#93c5fd",
              }}
            />
          </Box>

          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <Box
              key={`${sparkle.left}-${sparkle.top}`}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.4, y: 10 }}
              animate={{
                opacity: prefersReducedMotion ? 0 : [0, 1, 0],
                scale: prefersReducedMotion ? 0.4 : [0.4, 1.25, 0.7],
                y: prefersReducedMotion ? 10 : [10, -18, -34],
              }}
              transition={{
                delay: sparkle.delay,
                duration: 1.15,
                ease: "easeOut",
              }}
              sx={{
                position: "absolute",
                left: sparkle.left,
                top: sparkle.top,
                color: "#f59e0b",
                filter: "drop-shadow(0 0 14px rgba(245, 158, 11, 0.5))",
              }}
            >
              <StarsRoundedIcon sx={{ fontSize: sparkle.size }} />
            </Box>
          ))}

          {/* Course success card coming from notebook */}
          <Paper
            component={motion.div}
            elevation={0}
            initial={{ opacity: 0, x: "-50%", y: 76, scale: 0.76 }}
            animate={{
              opacity: prefersReducedMotion ? 1 : [0, 1, 1],
              x: "-50%",
              y: prefersReducedMotion ? -18 : [76, -34, -26],
              scale: prefersReducedMotion ? 1 : [0.76, 1.05, 1],
            }}
            transition={{
              delay: prefersReducedMotion ? 0.45 : 2.85,
              duration: prefersReducedMotion ? 0.25 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "absolute",
              left: "50%",
              top: { xs: "34%", sm: "36%", md: "38%" },
              width: "min(88vw, 460px)",
              p: { xs: 2, md: 2.5 },
              borderRadius: "22px",
              border: "1px solid rgba(37, 99, 235, 0.22)",
              boxShadow: "0 30px 90px rgba(15, 23, 42, 0.2)",
              bgcolor: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
              <Box
                component={motion.div}
                animate={
                  prefersReducedMotion
                    ? {}
                    : { rotate: [0, -5, 5, 0], scale: [1, 1.08, 1] }
                }
                transition={{ delay: 3.15, duration: 0.7, ease: "easeOut" }}
                sx={{
                  width: { xs: 46, md: 52 },
                  height: { xs: 46, md: 52 },
                  borderRadius: "17px",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#dbeafe",
                  color: "#2563eb",
                  flexShrink: 0,
                }}
              >
                <AutoStoriesRoundedIcon />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Stack
                  sx={{ direction: "row", alignItems: "center", spacing: 0.8 }}
                >
                  <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                    Course created successfully
                  </Typography>
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 18, color: "#16a34a" }}
                  />
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mt: 0.3,
                  }}
                >
                  {courseTitle || "Your new course"} is ready for lessons and
                  students.
                </Typography>

                <Box
                  sx={{
                    mt: 1.2,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {["Course Ready", "Add Lessons", "Publish Anytime"].map(
                    (label) => (
                      <Box
                        key={label}
                        sx={{
                          px: 1.2,
                          py: 0.45,
                          borderRadius: 99,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#1d4ed8",
                          bgcolor: "#eff6ff",
                        }}
                      >
                        {label}
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: prefersReducedMotion ? 0 : [0, 0, 0.18, 0] }}
            transition={{ delay: 4.25, duration: 0.45, ease: "easeOut" }}
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "#ffffff",
            }}
          />
        </Box>
      ) : null}
    </AnimatePresence>
  );
}
