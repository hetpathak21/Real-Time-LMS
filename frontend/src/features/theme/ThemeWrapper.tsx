import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppSelector } from "../../app/hooks";
import { useMemo } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useAppSelector((state) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#00a3ff",
          },
          background: {
            default: mode === "dark" ? "#20242f" : "#f4f7fd",
            paper: mode === "dark" ? "#1c1f25" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#f9fafb" : "#1d2229",
            secondary: mode === "dark" ? "#94a3b8" : "#64748b",
          },

          divider: mode === "dark" ? "#1d1f24" : "#e2e8f0",

          action: {
            hover:
              mode === "dark" ? "rgba(53, 46, 46, 0.08)" : "rgba(31, 30, 30, 0.04)",
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
