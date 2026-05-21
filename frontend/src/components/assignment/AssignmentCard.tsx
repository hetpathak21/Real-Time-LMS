import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

interface AssignmentCardProps {
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Reviewed";
}

export default function AssignmentCard({
  title,
  course,
  dueDate,
  status,
}: AssignmentCardProps) {
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
          Course: {course}
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
              status === "Pending"
                ? "warning"
                : status === "Submitted"
                ? "primary"
                : "success"
            }
          />

          <Button variant="contained">
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}