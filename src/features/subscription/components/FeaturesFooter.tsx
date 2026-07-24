import { Grid, Paper, Typography, Stack } from "@mui/material";

const features = [
  "أمان وموثوقية",
  "دعم فني متخصص",
  "تحديثات مستمرة",
  "جميع الخطط سنوية",
];

export default function FeaturesFooter() {
  return (
    <Paper sx={{ mt: 5, p: 4 }}>
      <Grid container spacing={4}>
        {features.map((item) => (
          <Grid size={{ xs: 12, md: 3 }} key={item}>
            <Stack sx={{ alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
