import React from "react";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

export const FilterButton: React.FC = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<TuneIcon sx={{ ml: 1, mr: -0.5 }} />}
      sx={{
        borderRadius: "10px",
        borderColor: "#e0e0e0",
        color: "#1e2524",
        px: 2,
        py: 1.2,
        fontWeight: "bold",
        "&:hover": { borderColor: "#b0b0b0", backgroundColor: "#f5f5f5" },
      }}
    >
      تصفية
    </Button>
  );
};