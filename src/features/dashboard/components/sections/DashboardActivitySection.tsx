import { LinkRounded } from "@mui/icons-material";
import { Box, Pagination, Paper, Stack, Typography } from "@mui/material";
import type { DailyWindowActivityItem } from "../../types/dashboard.types";
import type { Meta } from "../../../../shared/api/api-types";

type DashboardActivitySectionProps = {
  activities: {
    data: DailyWindowActivityItem[];
    meta?: Meta;
  };
  onViewAll?: (page: number) => void;
};

const DashboardActivitySection = ({
  activities,
  onViewAll,
}: DashboardActivitySectionProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #D8EDF8",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "right",
            fontWeight: 800,
            color: "#253454",
            mb: 2,
          }}
        >
          سجل العمليات
        </Typography>

        <Box
          sx={{
            backgroundColor: "#DDF5FF",
            borderRadius: 1.5,
            px: 2,
            py: 1,
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr 40px",
            alignItems: "center",
            color: "#4D5D79",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          <Box sx={{ textAlign: "right" }}>العملية</Box>
          <Box sx={{ textAlign: "center" }}>التوقيت</Box>
          <Box />
        </Box>

        <Stack spacing={1.1} sx={{ mt: 1.25 }}>
          {activities.data.length === 0 && (
            <Typography
              sx={{ textAlign: "center", fontWeight: 700, color: "#4D5D79" }}
            >
              لا توجد عمليات حديثة
            </Typography>
          )}
          {activities.data.map((row) => (
            <Box
              key={row.invoiceActivityId}
              sx={{
                border: "1px solid #EDF2F7",
                backgroundColor: "#F9FCFF",
                borderRadius: 1.75,
                px: 2,
                py: 1.35,
                display: "grid",
                gridTemplateColumns: "1.7fr 1fr 40px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ textAlign: "right", fontWeight: 700, color: "#2C3954" }}
              >
                {row.message}
              </Typography>
              <Typography
                sx={{ textAlign: "center", fontWeight: 800, color: "#28364D" }}
              >
                {row.occurredAt}
              </Typography>
              <LinkRounded sx={{ color: "#7D879C", fontSize: 20 }} />
            </Box>
          ))}
        </Stack>

        {/* <Box
          sx={{
            mt: 2.1,
            borderTop: "1px solid #E6EEF7",
            pt: 1.4,
            textAlign: "center",
          }}
        >
          <Typography
            component="button"
            onClick={onViewAll}
            sx={{
              border: 0,
              background: "transparent",
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "inherit",
            }}
          >
            عرض كامل السجل
          </Typography>
           </Box> */}
        {(activities?.meta?.totalPages ?? 1) > 1 && (
          <Box sx={{ direction: "rtl" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Pagination
                count={activities?.meta?.totalPages ?? 1}
                page={activities?.meta?.page ?? 1}
                size="small"
                 onChange={(_, value) =>onViewAll?.(value)}
                
              />
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DashboardActivitySection;
