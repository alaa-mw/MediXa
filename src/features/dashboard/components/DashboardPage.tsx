import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DashboardAlertsSection from "./sections/DashboardAlertsSection";
import DashboardOperationsSection from "./sections/DashboardOperationsSection";
import DashboardTopSection from "./sections/DashboardTopSection";
import type {
  IncomingAlert,
  OperationLog,
  StatCardData,
} from "../types/dashboard.types";

const statCards: StatCardData[] = [
  {
    id: "expired-soon",
    title: "أصناف قاربت الانتهاء",
    value: "42",
    note: "تنتهي خلال 3 أشهر",
    tone: "danger",
  },
  {
    id: "invoice-count",
    title: "عدد الفواتير",
    value: "1,248",
    note: "%5.2 عن الشهر الماضي",
    tone: "warning",
  },
  {
    id: "sales-total",
    title: "إجمالي المبيعات",
    value: "145,000",
    suffix: "ريال",
    note: "%12.5 عن الشهر الماضي",
    tone: "info",
  },
];

const incomingAlerts: IncomingAlert[] = [
  {
    id: "1",
    medicineName: "أموكسيسيلين 500 كبسولات",
    details: "انتهت الصلاحية 01/10/2023 (الكمية 12)",
    statusTone: "danger",
    hasAction: true,
  },
  {
    id: "2",
    medicineName: "بانادول إكسترا أقراص",
    details: "الصلاحية: 12 شهر (العدد المتبقي 20)",
    statusTone: "warning",
  },
  {
    id: "3",
    medicineName: "شراب كحة باب",
    details: "ينتهي 15/12/2023 (الكمية 45)",
    statusTone: "warning",
  },
  {
    id: "4",
    medicineName: "أوجمنتين 10000",
    details: "سنة واحدة على سعر الشراء 2026/7/2",
    statusTone: "success",
  },
];

const operationsLog: OperationLog[] = [
  {
    id: "1",
    operation: "بيع ثلاث عبوات من paracetamol",
    category: "متوسطة",
    time: "06:15 pm",
  },
  {
    id: "2",
    operation: "إتلاف 45 علبة من سيروم A",
    category: "متوسطة",
    time: "06:15 pm",
  },
  {
    id: "3",
    operation: "إضافة 20 علبة مخزونة فيتامين دال",
    category: "متوسطة",
    time: "06:15 pm",
  },
  {
    id: "4",
    operation: "إضافة 12 علبة مخزونة شراب كولا",
    category: "متوسطة",
    time: "06:15 pm",
  },
  {
    id: "5",
    operation: "تحديد صفر المادة لـ Amed",
    category: "متوسطة",
    time: "06:15 pm",
  },
];

const DashboardPage = () => {
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
          <DashboardOperationsSection
            operations={operationsLog}
            onViewAll={handleViewAllOperations}
          />
          <DashboardAlertsSection alerts={incomingAlerts} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
