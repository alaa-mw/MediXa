import { Box, Stack, Typography } from "@mui/material";
import type {
  RotationBar,
  RotationMetric,
} from "../../types/analysisInventory.types";
import AnalysisPanel from "./AnalysisPanel";

type InventoryRotationCardProps = {
  title: string;
  subtitle: string;
  bars: RotationBar[];
  metrics: RotationMetric[];
};

const InventoryRotationCard = ({
  title,
  subtitle,
  bars,
  metrics,
}: InventoryRotationCardProps) => {
  return (
    <AnalysisPanel title={title} subtitle={subtitle}>
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
          {bars.map((bar) => (
            <Box
              key={bar.id}
              sx={{
                flex: 1,
                borderRadius: 0.75,
                height: `${bar.height}px`,
                backgroundColor: bar.color,
                minWidth: 10,
              }}
            />
          ))}
        </Box>

        <Stack spacing={1}>
          {metrics.map((metric) => (
            <Box
              key={metric.id}
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
                {metric.label}
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
                {metric.value}
              </Typography>
              {metric.note && (
                <Typography
                  variant="caption"
                  sx={{ color: "#38A36D", fontWeight: 700 }}
                >
                  {metric.note}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </AnalysisPanel>
  );
};

export default InventoryRotationCard;
