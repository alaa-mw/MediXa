import {
  Card,
  CardContent,
  Typography,
  alpha,
  TextField,
  Stack,
} from "@mui/material";

interface SubscriptionCardProps {
  planName: string | number;
  startsAt: string;
  onStartDateChange: (date: string) => void;
}

export default function SubscriptionCard({
  planName,
  startsAt,
  onStartDateChange,
}: SubscriptionCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRight: `7px solid ${alpha("#210724", 0.15)}`,
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack spacing={2}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            ✓ تم اختيار خطة الاشتراك بنجاح
          </Typography>

          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
            }}
            spacing={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              الرجاء تحديد تاريخ بدء الاشتراك لتفعيل الحساب:
            </Typography>

            <TextField
              type="date"
              size="small"
              value={startsAt}
              onChange={(e) => onStartDateChange(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: "200px",
                "& input": {
                  color: startsAt ? "text.primary" : "text.disabled",
                },
                "& input[type='date']::-webkit-calendar-picker-indicator": {
                  filter: "invert(0.5)",
                  cursor: "pointer",
                },
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
