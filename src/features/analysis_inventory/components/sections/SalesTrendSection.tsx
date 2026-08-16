import { Box } from "@mui/material";
import { useState } from "react";
import SalesSummaryCard from "./SalesSummaryCard";
import SalesTrendChartCard, { type TrendMode } from "./SalesTrendChartCard";

const formatDateOnly = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SalesTrendSection = () => {
  const [trendMode, setTrendMode] = useState<TrendMode>("WEEK");
  const [selectedDate, setSelectedDate] = useState(() =>
    formatDateOnly(new Date()),
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "0.2fr 1fr " },
        gap: 2,
      }}
    >
      <SalesSummaryCard mode={trendMode} selectedDate={selectedDate} />
      <SalesTrendChartCard
        mode={trendMode}
        selectedDate={selectedDate}
        onModeChange={setTrendMode}
        onDateChange={setSelectedDate}
      />
    </Box>
  );
};

export default SalesTrendSection;
