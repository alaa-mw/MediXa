import { Card, CardContent, Typography, alpha } from "@mui/material";

export default function SubscriptionCard({ planName }: { planName: string }) {
  return (
    <Card
      elevation={3}
      sx={{
        px: 4,
        py: 1,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRight: `7px solid ${alpha("#210724", 0.15)}`,
      }}
    >
      <CardContent>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "grey" }}>
          ✓ تم اختيار خطة الاشتراك بنجاح
        </Typography>
      </CardContent>
    </Card>
  );
}
