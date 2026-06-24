// features/inventory/components/CategoryTabs.tsx
import React from "react";
import { Box, Button } from "@mui/material";

interface CategoryTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onChange }) => {
  const tabs = ["الكل", "الأدوية", "المستلزمات الآخرى"];

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "flex-start", 
        width: "fit-content",
        backgroundColor: "#e7f0f7", 
        p: 0.5,
        borderRadius: "12px",
        alignItems: "center",
        gap: 1 
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => onChange(tab)}
          variant="contained"
          disableRipple 
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            px: 3,
            py: 0.8,
            boxShadow: "none",
            backgroundColor: activeTab === tab ? "secondary.main" : "transparent",
            color: activeTab === tab ? "white" : "#5a6369",
            transition: "all 0.2s ease-in-out", 
            
            "&:hover": {
              boxShadow: "none",
              backgroundColor: activeTab === tab ? "#2c3e50" : "#e0e6ed",
              px: activeTab === tab ? 3 : 3.5, 
            },
          }}
        >
          {tab}
        </Button>
      ))}
    </Box>
  );
};