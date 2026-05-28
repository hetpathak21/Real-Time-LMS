import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

interface AssignmentCardProps {
  _id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: "Published" | "Draft";
}

export default function AssignmentCard({
  title,
  courseName,
  dueDate,
  status,
}: AssignmentCardProps) {

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
          }}
        >
          Course: {courseName}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
          }}
        >
          Due Date: {dueDate}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={status}
            color={
              status === "Published" ? "success" : "warning"
            }
          />

          <Button
            variant="contained"
            onClick={() => navigate("/student/assignments/details")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              px: 2,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
