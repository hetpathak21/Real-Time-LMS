import {
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
} from "@mui/material";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  instructor: string;
}

export default function CourseCard({
  title,
  description,
  category,
  instructor,
}: CourseCardProps) {
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

          <Chip label={category} color="primary" />
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
          Instructor: <strong>{instructor}</strong>
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button fullWidth variant="contained">
          View Course
        </Button>
      </Box>
    </Card>
  );
}