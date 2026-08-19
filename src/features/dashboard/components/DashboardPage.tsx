import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import TokenService from "../../../shared/services/tokenService";
import type {
  DailyWindowActivityItem,
  DailyWindowAlertItem,
  DailyWindowCardsData,
} from "../types/dashboard.types";
import { organizeCardResponse } from "../utils/organizeCardResponse";
import DashboardActivitySection from "./sections/DashboardActivitySection";
import DashboardAlertsSection from "./sections/DashboardAlertsSection";
import DashboardCalendarCard from "./sections/DashboardCalendarCard";
import DashboardStatCard from "./sections/DashboardStatCard";

const DashboardPage = () => {
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [today, setToday] = React.useState(todayDate);
  const pharmacyId = TokenService.getPharmacyId() || ""; // Replace with your actual pharmacy ID retrieval logic

  const { data: statCards, setQueryParams: setStatCardsQueryParams } =
    useGetWithParams<DailyWindowCardsData>(`/daily-window/cards`, {
      pharmacy_id: pharmacyId,
      date: today,
    });

  const organizedStatCards = statCards
    ? organizeCardResponse(statCards.data)
    : [];

  const { data: incomingAlerts, setQueryParams: setIncomingAlertsQueryParams } =
    useGetWithParams<DailyWindowAlertItem[]>(`/daily-window/alerts`, {
      pharmacy_id: pharmacyId,
      page: "",
      limit: "",
    });

  const { data: activities, setQueryParams: setActivitiesQueryParams } =
    useGetWithParams<DailyWindowActivityItem[]>(`/daily-window/activities`, {
      pharmacy_id: pharmacyId,
      date: today,
      page: "",
      limit: "",
    });

  const handleViewNextActivities = (nextPage: number) => {
    setActivitiesQueryParams((prev) => ({
      ...prev,
      page: nextPage.toString(),
    }));
  };
  // Reserved for future navigation to a full operations history page.

  useEffect(() => {
    // recall all
    setStatCardsQueryParams({
      pharmacy_id: pharmacyId,
      date: today,
    });
    setActivitiesQueryParams({
      pharmacy_id: pharmacyId,
      date: today,
      page: "",
      limit: "",
    });
    setIncomingAlertsQueryParams({
      pharmacy_id: pharmacyId,
      page: "",
      limit: "",
    });
  }, [today]);

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100%",
        // p: { xs: 1.5, md: 3 },
      }}
    >
      <Stack spacing={2.5}>
        {/* <Typography variant="h5" sx={{ fontWeight: 700 }}>
          النافذة اليومية{" "}
        </Typography> */}
        {/* top section */}
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
          {organizedStatCards.map((item, index) => (
            <DashboardStatCard key={index} item={item} />
          ))}

          <DashboardCalendarCard today={today} setToday={setToday} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2.3fr 1fr " },
            gap: 2,
          }}
        >
          <DashboardActivitySection
            activities={{
              data: activities?.data || [],
              meta: activities?.meta,
            }}
            onViewAll={handleViewNextActivities}
          />
          <DashboardAlertsSection alerts={incomingAlerts?.data || []} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
