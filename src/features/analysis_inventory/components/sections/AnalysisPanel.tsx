import { Box, Paper, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type AnalysisPanelProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  minHeight?: number;
}>;

const AnalysisPanel = ({
  title,
  subtitle,
  action,
  minHeight,
  children,
}: AnalysisPanelProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        minHeight,
        borderRadius: 3,
        border: "1px solid #DCECF7",
        backgroundColor: "#FFFFFF",
      }}
    >
      {(title || subtitle || action) && (
        <Box
          sx={{
            mb: 1.5,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            {title && (
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#1D2B45" }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                sx={{ color: "#7D8DA6", fontWeight: 600 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {action}
        </Box>
      )}
      {children}
    </Paper>
  );
};

export default AnalysisPanel;
