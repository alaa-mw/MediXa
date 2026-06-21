import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddMedicineButtonProps {
  onClick: () => void;
}

export const AddMedicineButton: React.FC<AddMedicineButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon sx={{ ml: 1, mr: -0.5 }} />}
      onClick={onClick}
      sx={{
        borderRadius: "10px",
        px: 3,
        py: 1.2,
        fontWeight: "bold",
        whiteSpace: "nowrap",
      }}
    >
      إضافة دواء جديد
    </Button>
  );
};