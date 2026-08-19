import React from "react";
import { Card, Box, Skeleton } from "@mui/material";

export const MedicineCardSkeleton: React.FC = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: 2.25,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justify: "space-between",
        border: "1px solid #e2e8f0",
        height: "100%",
      }}
    >
      {/* 1. Header Badges & Actions */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: "6px" }} />
          <Skeleton variant="rounded" width={45} height={22} sx={{ borderRadius: "6px" }} />
        </Box>
        <Skeleton variant="circular" width={24} height={24} />
      </Box>

      {/* 2. Title & Active Ingredient */}
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width="70%" height={28} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="45%" height={18} />
      </Box>

      {/* 3. Info Items List Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          p: 1.5,
          backgroundColor: "#f8fafc",
          borderRadius: "10px",
          mb: 2,
        }}
      >
        {/* الشكل */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" width={60} height={18} />
          <Skeleton variant="text" width={50} height={18} />
        </Box>
        {/* الكمية المتاحة */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" width={90} height={18} />
          <Skeleton variant="text" width={80} height={18} />
        </Box>
        {/* الموقع */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" width={50} height={18} />
          <Skeleton variant="text" width={60} height={18} />
        </Box>
      </Box>

      {/* 4. Price Boxes */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Skeleton
          variant="rounded"
          height={52}
          sx={{ flex: 1, borderRadius: "8px" }}
        />
        <Skeleton
          variant="rounded"
          height={52}
          sx={{ flex: 1, borderRadius: "8px" }}
        />
      </Box>

      {/* 5. Footer Buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
        <Skeleton variant="rounded" height={36} sx={{ flex: 1, borderRadius: "8px" }} />
        <Skeleton variant="rounded" height={36} sx={{ flex: 1, borderRadius: "8px" }} />
      </Box>
    </Card>
  );
};

export default MedicineCardSkeleton;