// components/common/CloseButton.tsx
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, type SxProps, type Theme } from "@mui/material";

interface CloseButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, sx }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 24,
        top: 24,
        backgroundColor: "#f1f5f9",
        color: "#64748b",
        zIndex: 5,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#e2e8f0",
          color: "#334155",
        },
        ...sx, // دمج أي تنسيقات إضافية تأتي من الخارج وتفضيلها على الافتراضية
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};