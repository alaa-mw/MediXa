import {
  AttachMoneyRounded,
  CalendarTodayRounded,
  ErrorOutlineRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import type { StatCardData } from "../../types/dashboard.types";

type DashboardStatCardProps = {
  item: StatCardData;
};

const toneColors = {
  danger: {
    icon: "#ED4D4D",
    soft: "#FFECEC",
    value: "#D93F3F",
  },
  warning: {
    icon: "#B98626",
    soft: "#FFF5DF",
    value: "#111827",
  },
  info: {
    icon: "#2B74D7",
    soft: "#EAF2FF",
    value: "#111827",
  },
} as const;

const DashboardStatCard = ({ item }: DashboardStatCardProps) => {
  const colors = toneColors[item.tone];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #D8EDF8",
        p: 2,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Typography variant="body2" sx={{ color: "#5E6A80", fontWeight: 700 }}>
          {item.title}
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            backgroundColor: colors.soft,
            color: colors.icon,
          }}
        >
          {item.tone === "danger" && <ErrorOutlineRounded fontSize="small" />}
          {item.tone === "warning" && <ReceiptLongRounded fontSize="small" />}
          {item.tone === "info" && <AttachMoneyRounded fontSize="small" />}
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{ mt: 1.25, alignItems: "baseline" }}
      >
        <Typography
          variant="h4"
          sx={{
            lineHeight: 1,
            fontWeight: 900,
            color: item.tone === "danger" ? colors.value : "#111827",
          }}
        >
          {item.value}
        </Typography>
        {item.suffix && (
          <Typography
            variant="body2"
            sx={{ color: "#4B5563", fontWeight: 700 }}
          >
            {item.suffix}
          </Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        spacing={0.6}
        sx={{ mt: 1.5, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Typography
          variant="caption"
          sx={{ color: "#23A06B", fontWeight: 700 }}
        >
          {item.note}
        </Typography>
        <CalendarTodayRounded sx={{ fontSize: 13, color: "#5B6476" ,px:1 }} />
      </Stack>
      
    </Paper>
  );
};

export default DashboardStatCard;
