import { Avatar, Box, Paper, Typography, Divider } from "@mui/material";

import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 2,
            sm: 4,
          },
          borderRadius: 3,
          maxWidth: 700,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
            gap: 3,
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: "2rem",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                },
              }}
            >
              {user?.name}
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Role
        </Typography>

        <Typography variant="body1">{user?.role}</Typography>
      </Paper>
    </Box>
  );
}
