// features/inventory/components/EmptyInventory.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";

interface EmptyInventoryProps {
  onAddClick: () => void;
}

export const EmptyInventory: React.FC<EmptyInventoryProps> = ({
  onAddClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        gap: 2,
        p: 4,
      }}
    >
      <Box sx={{ backgroundColor: "#f0f4f8", p: 3, borderRadius: "50%" }}>
        <InventoryIcon sx={{ fontSize: "60px", color: "secondary.main" }} />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1e2524" }}>
        مخزن الصيدلية فارغ حالياً
      </Typography>
      <Typography
        variant="body2"
        color="#5a6369"
        sx={{ maxWidth: "400px", mb: 2 }}
      >
        لم يتم إضافة أي أدوية أو مستلزمات طبية بعد. ابدأ بتغذية مخزون نظام
        "MediXa" الآن لتتمكن من إجراء المبيعات وإصدار الفواتير.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon sx={{ ml: 1 }} />}
        onClick={onAddClick}
        sx={{ borderRadius: "10px", px: 4, py: 1.5, fontWeight: "bold" }}
      >
        إضافة أول دواء للمخزن
      </Button>
    </Box>
  );
};
