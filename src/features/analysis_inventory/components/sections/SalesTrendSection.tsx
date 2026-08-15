import { Box } from "@mui/material";
import SalesSummaryCard from "./SalesSummaryCard";
import SalesTrendChartCard from "./SalesTrendChartCard";

type TrendMode = "yearly" | "monthly" | "weekly";

type SalesTrendSectionProps = {
  onSelectionChange?: (selection: {
    mode: TrendMode;
    year: string;
    month: string;
  }) => void;
};

const SalesTrendSection = ({ onSelectionChange }: SalesTrendSectionProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "0.2fr 1fr " },
        gap: 2,
      }}
    >
      <SalesSummaryCard value="4,520 ر.س" growthLabel="+12%" />
      <SalesTrendChartCard onSelectionChange={onSelectionChange} />
    </Box>
  );
};

export default SalesTrendSection;
