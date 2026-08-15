import { Box } from "@mui/material";
import type { StatCardData } from "../../types/dashboard.types";
import DashboardCalendarCard from "./DashboardCalendarCard";
import DashboardStatCard from "./DashboardStatCard";

type DashboardTopSectionProps = {
  statCards: StatCardData[];
};

const DashboardTopSection = ({ statCards }: DashboardTopSectionProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(4, 1fr) 1.84fr",
        },
        gap: 2,
      }}
    >
      {statCards.map((item) => (
        <DashboardStatCard key={item.id} item={item} />
      ))}
      
      <DashboardCalendarCard />
    </Box>
  );
};

export default DashboardTopSection;
