import { WarningAmberRounded } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import type { DailyWindowAlertItem } from "../../types/dashboard.types";

type DashboardAlertsSectionProps = {
  alerts: DailyWindowAlertItem[];
};

const statusColor = {
  danger: "#E24B4B",
  warning: "#B98626",
  success: "#23A06B",
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

const parseDateOnly = (raw: string): Date | null => {
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const parsed = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
    );
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  }
  const fallback = new Date(raw);
  if (Number.isNaN(fallback.getTime())) return null;
  fallback.setHours(0, 0, 0, 0);
  return fallback;
};

const formatDateOnly = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DashboardAlertsSection = ({ alerts }: DashboardAlertsSectionProps) => {
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
            <Box key={alert.pharmacyDrugId}>
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
                  <Stack spacing={0.35} sx={{ alignItems: "flex-start" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 800, color: "#273247" }}
                    >
                      {alert.drugName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          statusColor[
                            alert.alertType === "STOCK_ALERT"
                              ? "warning"
                              : "danger"
                          ],
                        fontWeight: 700,
                      }}
                    >
                      {/* on details show " الكمية ْ تنتهي  بتاريخ y" */}
                      {/* or " الكمية ْ انتهت  بتاريخ y" */}
                      {alert.alertType === "STOCK_ALERT"
                        ? `انتهت صلاحية دفعة (${alert.quantity.fullBoxes}) وحدة من الدواء بتاريخ ${alert.expiryDate}`
                        : (() => {
                            const parsedExpiry = parseDateOnly(
                              alert.expiryDate,
                            );
                            if (!parsedExpiry) {
                              return `قاربت الكمية (${alert.quantity.fullBoxes}) على الانتهاء بتاريخ ${alert.expiryDate}`;
                            }

                            const todayDate = new Date();
                            todayDate.setHours(0, 0, 0, 0);

                            const daysLeft = Math.ceil(
                              (parsedExpiry.getTime() - todayDate.getTime()) /
                                DAY_MS,
                            );

                            return `قاربت الكمية (${alert.quantity.fullBoxes}) على الانتهاء بتاريخ ${formatDateOnly(parsedExpiry)} (متبقي ${Math.max(daysLeft, 0)} أيام)`;
                          })()}
                    </Typography>
                  </Stack>
                </Stack>

                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 1.5,
                    minWidth: 76,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                  onClick={() => {
                    // Navigate to the drug page using the pharmacyDrugId
                    window.location.href = `/pharmacy_owner/inventory/batches/${alert.pharmacyDrugId}`;
                  }}
                >
                  الذهاب لصفحة الدواء
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default DashboardAlertsSection;
