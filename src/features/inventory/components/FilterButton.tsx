import React from "react";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

interface FilterButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaDescribedBy?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick, ariaDescribedBy }) => {
  return (
    <Button
      id={ariaDescribedBy}
      variant="outlined"
      onClick={onClick}
      startIcon={<TuneIcon sx={{ ml: 0, mr: 0 }} />} 
      // sx={{
      //   borderRadius: "25px",      
      //   borderColor: "#cbd5e1",      
      //   backgroundColor: "#ffffff", 
      //   color: "#1e2524",
      //   fontWeight: "bold",
      //   height: "56px",             
      //   px: 3,                      
      //   textTransform: "none",      
      //   fontFamily: "inherit",
      //   "&:hover": { 
      //     borderColor: "#cbd5e1",   
      //     backgroundColor: "#f8fafc"
      //   },
      // }}
      sx={{
            minWidth: 100,
            height: 40,
            borderRadius: 3,
            fontWeight: "bold",
            bgcolor: "background.paper",
          }}
    >
      تصفية
    </Button>
  );
};