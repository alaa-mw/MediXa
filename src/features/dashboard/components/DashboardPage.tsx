import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DashboardAlertsSection from "./sections/DashboardAlertsSection";
import DashboardTopSection from "./sections/DashboardTopSection";
import type {
  DailyWindowActivityItem,
  IncomingAlert,
  OperationLog,
  StatCardData,
} from "../types/dashboard.types";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import DashboardActivitySection from "./sections/DashboardActivitySection";

const DashboardPage = () => {
  const { data: statCards, setQueryParams: setStatCardsQueryParams } =
    useGetWithParams(`/daily-window/cards`, {
      date: today,
    });
  const { data: incomingAlerts, setQueryParams: setIncomingAlertsQueryParams } =
    useGetWithParams(`/daily-window/alerts`, {
      page: "",
      limit: "",
    });
  const { data: activities, setQueryParams: setActivitiesQueryParams } =
    useGetWithParams<DailyWindowActivityItem[]>(`/daily-window/activities`, {
      page: "",
      limit: "",
    });

  const handleViewAllOperations = () => {
    // Reserved for future navigation to a full operations history page.
  };

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100%",
        // p: { xs: 1.5, md: 3 },
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          النافذة اليومية{" "}
        </Typography>
        <DashboardTopSection statCards={statCards} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2.3fr 1fr " },
            gap: 2,
          }}
        >
          <DashboardActivitySection
            activities={activities}
            onViewAll={handleViewAllOperations}
          />
          <DashboardAlertsSection alerts={incomingAlerts} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
