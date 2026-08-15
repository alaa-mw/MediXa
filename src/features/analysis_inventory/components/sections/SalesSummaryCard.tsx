import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AnalysisPanel from "./AnalysisPanel";

type SalesSummaryCardProps = {
  value: string;
  growthLabel: string;
};

const SalesSummaryCard = ({ value, growthLabel }: SalesSummaryCardProps) => {
  return (
    <AnalysisPanel minHeight={312}>
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#EDF3FF",
              color: "#2E6BD4",
            }}
          >
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Chip
            label={growthLabel}
            sx={{
              height: 26,
              borderRadius: 4,
              color: "#17995D",
              fontWeight: 700,
              backgroundColor: "#CFF6E3",
            }}
          />
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ color: "#6D7F99", fontWeight: 700, mb: 0.7 }}>
            إجمالي المبيعات
          </Typography>
          <Typography variant="h5" sx={{ color: "#22324B", fontWeight: 800 }}>
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <Chip
            label={`صافي المبيعات: ${value}`}
            sx={{
              fontWeight: 700,
              backgroundColor: "#F3F8FF",
              color: "#22324B",
            }}
          />
          <Chip
            label={`عدد الفواتير: ${value}`}
            sx={{
              fontWeight: 700,
              backgroundColor: "#F3F8FF",
              color: "#22324B",
            }}
          />
        </Box>
      </Stack>
    </AnalysisPanel>
  );
};

export default SalesSummaryCard;
