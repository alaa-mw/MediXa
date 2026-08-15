import {
  AttachMoneyRounded,
  LocalPharmacyRounded,
  PointOfSaleRounded,
  RemoveRedEyeRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { IncomingAlert } from "../../types/dashboard.types";

type DashboardAlertsSectionProps = {
  alerts: IncomingAlert[];
};

const statusColor = {
  danger: "#E24B4B",
  warning: "#B98626",
  success: "#23A06B",
} as const;

const DashboardAlertsSection = ({ alerts }: DashboardAlertsSectionProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #D8EDF8",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2, py: 2.5 }}>
        <Stack
          direction="row"
          sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E2B45" }}>
            التنبيهات الواردة
          </Typography>
          <WarningAmberRounded sx={{ color: "#F15E5E" }} />
        </Stack>

        <Stack spacing={1.75}>
          {alerts.map((alert, index) => (
            <Box key={alert.id}>
              {index > 0 && (
                <Box sx={{ borderTop: "1px solid #EEF3F8", mb: 1.25 }} />
              )}
              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  
                  <Stack spacing={0.35} sx={{ alignItems: "flex-start"}}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 800, color: "#273247" }}
                    >
                      {alert.medicineName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: statusColor[alert.statusTone],
                        fontWeight: 700,
                      }}
                    >
                      {alert.details}
                    </Typography>
                  </Stack>
                </Stack>

                {alert.hasAction ? (
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1.5,
                      minWidth: 76,
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    طلب شراء
                  </Button>
                ) : (
                  <RemoveRedEyeRounded sx={{ color: "#8A97AE", mt: 0.5 }} />
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default DashboardAlertsSection;
