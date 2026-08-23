import { Box, Stack, Typography } from "@mui/material";
import IncomingOrdersTable from "./components/IncomingOrdersTable";
import PredictiveOrdersTable from "./components/PredictiveOrdersTable";

const PredictiveOrdersPage = () => {
  return (
    <Box
      dir="rtl"
      sx={{
        p: { xs: 1.25, md: 2 },
        minHeight: "100%",
        background:
          "linear-gradient(180deg, rgba(237,249,255,1) 0%, rgba(242,250,255,1) 45%, rgba(248,253,255,1) 100%)",
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ textAlign: "right", px: { xs: 0.25, md: 0.5 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2C2540",
              mb: 2,
              // fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            إدارة المشتريات المقترحة
          </Typography>
          <Typography
            sx={{
              color: "#5D6B82",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            اقتراحات ذكية لطلبات الشراء بناء على تحليل المخزون الحالي والمتوقع،
            مع إمكانية إنشاء الطلبات ومتابعتها بسهولة.
          </Typography>
        </Box>

        <PredictiveOrdersTable />
        <IncomingOrdersTable />
      </Stack>
    </Box>
  );
};

export default PredictiveOrdersPage;
