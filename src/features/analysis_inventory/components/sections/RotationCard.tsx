import { Box, Stack, Typography } from "@mui/material";
import { useGetWithParams } from "../../../../shared/hooks/useGetWithParams";
import TokenService from "../../../../shared/services/tokenService";
import type { RotationResponse } from "../../types/analysisInventory.types";
import PeriodPopoverButton from "../PeriodPopoverButton";
import AnalysisPanel from "./AnalysisPanel";

const barColorByType: Record<
  RotationResponse["items"][number]["type"],
  string
> = {
  SALE: "#2F7C78",
  SUPPLIER: "#37456D",
  RETURN: "#5B3E68",
  DAMAGE: "#c92d2d",
};

const typeLabelByType: Record<
  RotationResponse["items"][number]["type"],
  string
> = {
  SALE: "مبيعات",
  SUPPLIER: "شراء",
  RETURN: "مرتجع",
  DAMAGE: "تلف",
};

const RotationCard = () => {
  const pharmacyId = TokenService.getPharmacyId() || "1";

  const { data, queryParams, setQueryParams } =
    useGetWithParams<RotationResponse>(
      "/analytics/historical/invoice-activity",
      {
        pharmacy_id: pharmacyId,
        days: 365,
      },
    );

  const items = data?.data.items ?? [];
  const totalValue = data?.data.totalValue;

  const handlePeriodChange = (value: number) => {
    const v = Math.max(7, Math.min(365, Math.floor(value || 0)));
    setQueryParams({ ...queryParams, days: v });
  };

  const maxInvoices = Math.max(...items.map((item) => item.count), 1);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <AnalysisPanel
      title="تحليل دوران المخزون"
      subtitle={`تحليل حركة الفواتير خلال ${queryParams.days} يوم`}
    >
      <Box sx={{ mb: 1.5, display: "flex", justifyContent: "flex-start" }}>
        <PeriodPopoverButton
          value={queryParams.days}
          onChange={handlePeriodChange}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1.2fr" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #E8F1F9",
            backgroundColor: "#F8FCFF",
            minHeight: 145,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 0.75,
          }}
        >
          {items.map((item) => (
            <Stack
              key={item.type}
              spacing={0.55}
              sx={{ flex: 1, alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 0.75,
                  height: `${Math.max((item.count / maxInvoices) * 110, 18)}px`,
                  backgroundColor: barColorByType[item.type] ?? "#B2CAE4",
                  minWidth: 10,
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "#6B7E96", fontWeight: 700, textAlign: "center" }}
              >
                {typeLabelByType[item.type]}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Stack spacing={1}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #E8F1F9",
              backgroundColor: "#F8FCFF",
              textAlign: "right",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#677B96", fontWeight: 700 }}
            >
              معدل الدوران العام
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 0.5,
                color: "#2272C3",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {totalValue?.value ?? "0"}
            </Typography>
            {totalValue?.note && (
              <Typography
                variant="caption"
                sx={{ color: "#38A36D", fontWeight: 700 }}
              >
                {totalValue.note}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #E8F1F9",
              backgroundColor: "#F8FCFF",
              textAlign: "right",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#677B96", fontWeight: 700 }}
            >
              عدد الفواتير حسب النوع
            </Typography>

            <Stack spacing={0.55} sx={{ mt: 0.8 }}>
              {items.map((item) => (
                <Stack
                  key={`summary-${item.type}`}
                  direction="row"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#2D3A53", fontWeight: 700 }}
                  >
                    {item.count}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      alignItems: "center",
                      gap: 0.5,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#2D3A53", fontWeight: 700 }}
                    >
                      {typeLabelByType[item.type]}
                    </Typography>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: barColorByType[item.type],
                      }}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>

            <Typography
              variant="caption"
              sx={{
                mt: 0.85,
                display: "block",
                color: "#38A36D",
                fontWeight: 700,
              }}
            >
              الإجمالي: {totalCount}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </AnalysisPanel>
  );
};

export default RotationCard;
