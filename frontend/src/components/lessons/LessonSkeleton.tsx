// src/components/lessons/LessonSkeleton.tsx
import { Skeleton, Stack, Grid } from "@mui/material";

export default function LessonSkeleton() {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "16px" }} />
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="100%" height={25} />
          <Skeleton variant="text" width="90%" height={25} />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={50} sx={{ borderRadius: "12px" }} />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={70} sx={{ borderRadius: "12px" }} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
