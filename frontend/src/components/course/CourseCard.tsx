import {
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../types/courseTypes";

type CourseCardProps = ICourse;

export default function CourseCard({
  _id,
  title,
  description,
  category,
  teacherId,
  instructor,
  isPublished,
}: CourseCardProps) {
  const navigate = useNavigate();
  const teacherName =
    typeof instructor === "object"
      ? instructor?.name
      : typeof teacherId === "object"
        ? teacherId?.name
        : typeof instructor === "string"
          ? instructor
          : "Instructor";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1}>
            {category ? <Chip label={category} color="primary" /> : null}
            <Chip
              label={isPublished ? "Published" : "Draft"}
              color={isPublished ? "success" : "default"}
              variant={isPublished ? "filled" : "outlined"}
            />
          </Stack>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2,
          }}
        >
          {description}
        </Typography>

        <Typography variant="body2">
          Instructor: <strong>{teacherName}</strong>
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate(`/course/${_id}`)}
        >
          View Course
        </Button>
      </Box>
    </Card>
  );
}
