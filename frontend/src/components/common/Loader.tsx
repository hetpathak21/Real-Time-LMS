import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Loading...",
  fullScreen = true,
}: LoaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        minHeight: fullScreen ? "100vh" : "200px",

        width: "100%",
        gap: 2,

        px: 2,
        textAlign: "center",
      }}
    >
      <CircularProgress />

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}