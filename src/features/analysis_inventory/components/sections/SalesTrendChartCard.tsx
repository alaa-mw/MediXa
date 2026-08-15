import {
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import AnalysisPanel from "./AnalysisPanel";

type TrendMode = "yearly" | "monthly" | "weekly";

type SalesTrendChartCardProps = {
  onSelectionChange?: (selection: {
    mode: TrendMode;
    year: string;
    month: string;
  }) => void;
};

const years = ["2023", "2024", "2025", "2026"];
const months = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "اغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const chartDataByMode: Record<TrendMode, { label: string; value: number }[]> = {
  weekly: [
    { label: "السبت", value: 1100 },
    { label: "الاحد", value: 2200 },
    { label: "الاثنين", value: 1650 },
    { label: "الثلاثاء", value: 3200 },
    { label: "اليوم", value: 3700 },
    { label: "الخميس", value: 650 },
    { label: "الجمعة", value: 420 },
  ],
  monthly: [
    { label: "الأسبوع 1", value: 2800 },
    { label: "الأسبوع 2", value: 3400 },
    { label: "الأسبوع 3", value: 2900 },
    { label: "الأسبوع 4", value: 3600 },
  ],
  yearly: [
    { label: "Q1", value: 3200 },
    { label: "Q2", value: 4100 },
    { label: "Q3", value: 3700 },
    { label: "Q4", value: 4600 },
  ],
};

const SalesTrendChartCard = ({
  onSelectionChange,
}: SalesTrendChartCardProps) => {
  const [mode, setMode] = useState<TrendMode>("weekly");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("اغسطس");

  const data = useMemo(() => chartDataByMode[mode], [mode]);
  const maxValue = useMemo(
    () => Math.max(...data.map((item) => item.value), 1),
    [data],
  );

  const emitChange = (next: {
    mode: TrendMode;
    year: string;
    month: string;
  }) => {
    onSelectionChange?.(next);
  };

  const handleModeChange = (_: React.SyntheticEvent, value: TrendMode) => {
    setMode(value);
    emitChange({ mode: value, year: selectedYear, month: selectedMonth });
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedYear(value);
    emitChange({ mode, year: value, month: selectedMonth });
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedMonth(value);
    emitChange({ mode, year: selectedYear, month: value });
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
              <Tab value="yearly" label="سنوي" disableRipple />
              <Tab value="monthly" label="شهري" disableRipple />
              <Tab value="weekly" label="اسبوعي" disableRipple />
            </Tabs>

            {mode === "monthly" && (
              <Select
                size="small"
                value={selectedYear}
                onChange={handleYearChange}
                sx={{
                  minWidth: 92,
                  height: 32,
                  borderRadius: 1.5,
                  backgroundColor: "#F8FCFF",
                  "& .MuiSelect-select": {
                    py: 0.5,
                    fontSize: 13,
                    fontWeight: 700,
                  },
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            )}

            {mode === "weekly" && (
              <Select
                size="small"
                value={selectedMonth}
                onChange={handleMonthChange}
                sx={{
                  minWidth: 108,
                  height: 32,
                  borderRadius: 1.5,
                  backgroundColor: "#F8FCFF",
                  "& .MuiSelect-select": {
                    py: 0.5,
                    fontSize: 13,
                    fontWeight: 700,
                  },
                }}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            )}
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
            <Typography sx={{ fontSize: 12 }}>5K</Typography>
            <Typography sx={{ fontSize: 12 }}>4K</Typography>
            <Typography sx={{ fontSize: 12 }}>3K</Typography>
            <Typography sx={{ fontSize: 12 }}>2K</Typography>
            <Typography sx={{ fontSize: 12 }}>1K</Typography>
            <Typography sx={{ fontSize: 12 }}>0</Typography>
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
              {data.map((item) => {
                const isToday = item.label === "اليوم";
                return (
                  <Box
                    key={item.label}
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
                        backgroundColor: isToday ? "#1D5FC1" : "#C7D6F4",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: isToday ? 800 : 600,
                        color: isToday ? "#1D5FC1" : "#8A9AB0",
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
