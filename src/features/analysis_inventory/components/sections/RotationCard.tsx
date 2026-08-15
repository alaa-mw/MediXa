import { Box, Stack, Typography } from "@mui/material";
import type { AnalysisInventoryViewModel } from "../../types/analysisInventory.types";
import AnalysisPanel from "./AnalysisPanel";

type RotationCardProps = {
  rotation: AnalysisInventoryViewModel["rotation"];
};

const barColorByTitle: Record<string, string> = {
  sale: "#2F7C78",
  purchase: "#37456D",
  return: "#5B3E68",
  damage: "#c92d2d",
};

const RotationCard = ({ rotation }: RotationCardProps) => {
  const maxInvoices = Math.max(
    ...rotation.bars.map((bar) => bar.invoicesNumber),
    1,
  );

  return (
    <AnalysisPanel
      title="تحليل دوران المخزون"
      subtitle="سريع بيع الأدوية وتجديدها خلال 30 يوم"
      
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2.6fr 1fr" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #E8F1F9",
            backgroundColor: "#F8FCFF",
            minHeight: 145,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 0.75,
          }}
        >
          {rotation.bars.map((bar) => (
            <Box
              key={bar.id}
              sx={{
                flex: 1,
                borderRadius: 0.75,
                height: `${Math.max((bar.invoicesNumber / maxInvoices) * 110, 18)}px`,
                backgroundColor: barColorByTitle[bar.title] ?? "#B2CAE4",
                minWidth: 10,
              }}
            />
          ))}
        </Box>

        <Stack spacing={1}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #E8F1F9",
              backgroundColor: "#F8FCFF",
              textAlign: "right",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#677B96", fontWeight: 700 }}
            >
              معدل الدوران العام
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 0.5,
                color: "#2272C3",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {rotation.totalValue.value}
            </Typography>
            {rotation.totalValue.note && (
              <Typography
                variant="caption"
                sx={{ color: "#38A36D", fontWeight: 700 }}
              >
                {rotation.totalValue.note}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #E8F1F9",
              backgroundColor: "#F8FCFF",
              textAlign: "right",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#677B96", fontWeight: 700 }}
            >
              متوسط بقاء الدواء في المخزن
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 0.5,
                color: "#2272C3",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {rotation.remainMedAvg.value}
            </Typography>
            {rotation.remainMedAvg.note && (
              <Typography
                variant="caption"
                sx={{ color: "#38A36D", fontWeight: 700 }}
              >
                {rotation.remainMedAvg.note}
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </AnalysisPanel>
  );
};

export default RotationCard;
