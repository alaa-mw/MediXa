import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddMedicineButtonProps {
  onClick: () => void;
  label: string; // أصبحت إجبارية تماماً هنا
}

export const AddMedicineButton: React.FC<AddMedicineButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon sx={{ ml: 0, mr: 0 }} />}
      onClick={onClick}
      sx={{
        borderRadius: "10px",
        px: 3,
        py: 1.2,
        fontWeight: "bold",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {label}
    </Button>
  );
};