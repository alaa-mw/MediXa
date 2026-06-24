// features/inventory/components/CardBadges.tsx

import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CardBadgesProps {
  category: string;
  isLowStock: boolean;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CardBadges: React.FC<CardBadgesProps> = ({
  category,
  isLowStock,
  onMenuClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* التصنيف في أقصى اليمين */}
      <Chip
        label={category}
        size="small"
        sx={{
          backgroundColor: "#e1f5fe",
          color: "#0288d1",
          fontWeight: "bold",
          borderRadius: "6px",
        }}
      />

      {/* يأخذ كل المساحة الفارغة بين التصنيف وباقي العناصر */}
      <Box sx={{ flexGrow: 1 }} />

      {/* مخزون منخفض */}
      {isLowStock && (
        <Chip
          icon={
            <ReportProblemIcon
              sx={{
                color: "#d32f2f !important",
                fontSize: 14,
              }}
            />
          }
          label="مخزون منخفض"
          size="small"
          sx={{
            backgroundColor: "#ffebee",
            color: "#d32f2f",
            fontWeight: "bold",
            borderRadius: "6px",
            mr: 1,
          }}
        />
      )}

      {/* الثلاث نقاط في أقصى اليسار */}
      <IconButton
        size="small"
        onClick={onMenuClick}
        sx={{
          color: "#7a868f",
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};