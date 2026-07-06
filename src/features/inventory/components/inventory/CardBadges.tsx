
import React from "react";
import { Box, Chip, IconButton, Tooltip, tooltipClasses } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

interface CardBadgesProps {
  category: string;
  isLowStock: boolean;
  notes: string | null;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CardBadges: React.FC<CardBadgesProps> = ({
  category,
  isLowStock,
  notes,
  onMenuClick,
}) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", width: "100%", gap: 0.5 }}
    >
      {/* التصنيف فقط في اليمين */}
      <Chip
        label={category}
        size="small"
        sx={{
          backgroundColor: "#d3eaf8",
          color: "#1647a3",
          fontWeight: "600",
          borderRadius: "6px",
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* الملاحظات */}
      {notes && (
        <Tooltip
          title={notes}
          arrow
          placement="top"
          slotProps={{
            popper: {
              sx: {
                [`& .${tooltipClasses.tooltip}`]: {
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  backdropFilter: "blur(4px)",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                },
                [`& .${tooltipClasses.arrow}`]: {
                  color: "rgba(15, 23, 42, 0.9)",
                },
              },
            },
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": { color: "#0288d1", backgroundColor: "#f0f9ff" },
            }}
          >
            {/* <ChatBubbleOutlineIcon sx={{ fontSize: "16px" }} /> */}
          </IconButton>
        </Tooltip>
      )}

      {/* مخزون منخفض */}
      {isLowStock && (
        <Chip
          icon={
            <ReportProblemIcon
              sx={{ color: "#ef4444 !important", fontSize: "12px" }}
            />
          }
          label="المخزون منخفض"
          size="small"
          sx={{
            backgroundColor: "#fef2f2",
            color: "#ef4444",
            fontWeight: "600",
            borderRadius: "6px",
            fontSize: "0.725rem",
          }}
        />
      )}

      <IconButton size="small" onClick={onMenuClick} sx={{ color: "#94a3b8" }}>
        <MoreVertIcon sx={{ fontSize: "18px" }} />
      </IconButton>
    </Box>
  );
};
