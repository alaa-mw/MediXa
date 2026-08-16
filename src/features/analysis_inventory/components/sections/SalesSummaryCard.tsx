import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Box, Chip, Stack, Typography } from "@mui/material";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import TokenService from "../../../../shared/services/tokenService";
import type { SalesSummaryResponse } from "../../types/analysisInventory.types";
import AnalysisPanel from "./AnalysisPanel";
import { useEffect } from "react";

type SalesSummaryCardProps = {
  mode: "YEAR" | "MONTH" | "WEEK" | "DAY";
  selectedDate: string;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);

const formatCount = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const SalesSummaryCard = ({ mode, selectedDate }: SalesSummaryCardProps) => {
  const pharmacyId = TokenService.getPharmacyId() || "1";

  const { data, setQueryParams } = useGetWithParams<SalesSummaryResponse>(
    "/analytics/historical/sales-summary",
    {
      pharmacy_id: pharmacyId,
      date: selectedDate,
      level: mode,
    },
  );

  const grossSalesAmount = data?.data.grossSalesAmount ?? 0;
  const netSalesAmount = data?.data.netSalesAmount ?? 0;
  const saleInvoiceCount = data?.data.saleInvoiceCount ?? 0;

  const periodLabel = data?.data.period
    ? `${data.data.period.fromDate} - ${data.data.period.toDate}`
    : "";

  useEffect(() => {
    setQueryParams({
      pharmacy_id: pharmacyId,
      date: selectedDate,
      level: mode,
    });
  }, [selectedDate, mode]);
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
            label={periodLabel || "-"}
            sx={{
              height: 26,
              borderRadius: 4,
              color: "#2E6BD4",
              fontWeight: 700,
              backgroundColor: "#E6F0FF",
            }}
          />
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ color: "#6D7F99", fontWeight: 700, mb: 0.7 }}>
            إجمالي المبيعات
          </Typography>
          <Typography variant="h5" sx={{ color: "#22324B", fontWeight: 800 }}>
            {formatMoney(grossSalesAmount)}
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
            label={`صافي المبيعات: ${formatMoney(netSalesAmount)}`}
            sx={{
              fontWeight: 700,
              backgroundColor: "#F3F8FF",
              color: "#22324B",
            }}
          />
          <Chip
            label={`عدد الفواتير: ${formatCount(saleInvoiceCount)}`}
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
