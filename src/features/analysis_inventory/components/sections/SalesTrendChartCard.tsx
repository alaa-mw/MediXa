import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useMemo } from "react";
import AnalysisPanel from "./AnalysisPanel";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import TokenService from "../../../../shared/services/tokenService";
import { CustomDatePickerField } from "../../../../shared/components/FiltterDatePicker";
import type { SalesTrendResponse } from "../../types/analysisInventory.types";



export type TrendMode = "YEAR" | "MONTH" | "WEEK" | "DAY";

type SalesTrendChartCardProps = {
  mode: TrendMode;
  selectedDate: string;
  onModeChange: (mode: TrendMode) => void;
  onDateChange: (date: string) => void;
};

const modeToLevel: Record<TrendMode, TrendMode> = {
  YEAR: "YEAR",
  MONTH: "MONTH",
  WEEK: "WEEK",
  DAY: "DAY",
};

const formatTick = (value: number) => {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}K`;
  }
  return String(value);
};

const SalesTrendChartCard = ({
  mode,
  selectedDate,
  onModeChange,
  onDateChange,
}: SalesTrendChartCardProps) => {
  const pharmacyId = TokenService.getPharmacyId() || "1";
  const selectedLevel = modeToLevel[mode];

  const {
    data: response,
    queryParams,
    setQueryParams,
  } = useGetWithParams<SalesTrendResponse>(
    "/analytics/historical/sales-trend",
    {
      pharmacy_id: pharmacyId,
      date: selectedDate,
      level: selectedLevel,
    },
  );

  const data = useMemo(
    () =>
      (response?.data.items ?? []).map((item) => ({
        label: item.label,
        value: item.grossSalesAmount,
      })),
    [response?.data.items],
  );

  const maxValue = useMemo(
    () => Math.max(...data.map((item) => item.value), 1),
    [data],
  );

  const tickStep = useMemo(() => {
    const approx = Math.ceil(maxValue / 5);
    return Math.max(Math.ceil(approx / 100) * 100, 100);
  }, [maxValue]);

  const yTicks = useMemo(
    () => [5, 4, 3, 2, 1, 0].map((factor) => factor * tickStep),
    [tickStep],
  );

  const handleModeChange = (_: React.SyntheticEvent, value: TrendMode) => {
    onModeChange(value);
    const nextLevel = modeToLevel[value];
    setQueryParams({ ...queryParams, level: nextLevel });
  };

  const handleDateChange = (date: string) => {
    onDateChange(date);
    setQueryParams({ ...queryParams, date });
  };

  return (
    <AnalysisPanel>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1D2B45" }}>
            توجه المبيعات
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tabs
              value={mode}
              onChange={handleModeChange}
              sx={{
                minHeight: 32,
                "& .MuiTabs-indicator": { display: "none" },
                "& .MuiTab-root": {
                  minHeight: 32,
                  px: 1.6,
                  py: 0.25,
                  borderRadius: 1.5,
                  color: "#7E8FA8",
                  border: "1px solid transparent",
                  fontWeight: 700,
                  fontSize: 13,
                },
                "& .MuiTab-root.Mui-selected": {
                  color: "#2E6BD4",
                  backgroundColor: "#F2F7FF",
                  borderColor: "#D7E5FA",
                },
              }}
            >
              <Tab value="YEAR" label="سنوي" disableRipple />
              <Tab value="MONTH" label="شهري" disableRipple />
              <Tab value="WEEK" label="اسبوعي" disableRipple />
            </Tabs>

            <Box sx={{ width: 148 }}>
              <CustomDatePickerField
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "44px 1fr",
            alignItems: "stretch",
            gap: 1,
          }}
        >
          <Stack
            sx={{
              justifyContent: "space-between",
              color: "#8A9AB0",
              fontSize: 12,
            }}
          >
            {yTicks.map((tick) => (
              <Typography key={tick} sx={{ fontSize: 12 }}>
                {formatTick(tick)}
              </Typography>
            ))}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(6, 1fr)",
              minHeight: 210,
              borderBottom: "1px solid #E7EFF8",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  borderTop: "1px dashed #E7EFF8",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              />
            ))}

            <Box
              sx={{
                gridRow: "1 / -1",
                mt: 0.5,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 0.6,
                px: 1,
              }}
            >
              {data.map((item, index) => {
                const isLatest = index === data.length - 1;
                return (
                  <Box
                    key={`${item.label}-${index}`}
                    sx={{
                      height: "100%",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 0.65,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: "8px 8px 0 0",
                        height: `${Math.max((item.value / maxValue) * 158, 12)}px`,
                        backgroundColor: isLatest ? "#1D5FC1" : "#C7D6F4",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: isLatest ? 800 : 600,
                        color: isLatest ? "#1D5FC1" : "#8A9AB0",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Stack>
    </AnalysisPanel>
  );
};

export default SalesTrendChartCard;
