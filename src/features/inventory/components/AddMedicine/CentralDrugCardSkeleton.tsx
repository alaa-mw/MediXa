import React from "react";
import { Card, Box, Skeleton } from "@mui/material";

export const CentralDrugCardSkeleton: React.FC = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: 2.25,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #e2e8f0",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Badges Skeleton (Barcode & Rx) */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Skeleton
            variant="rounded"
            width={110}
            height={24}
            sx={{ borderRadius: "6px" }}
          />
          <Skeleton
            variant="rounded"
            width={70}
            height={24}
            sx={{ borderRadius: "6px" }}
          />
        </Box>

        {/* Trade Name Skeleton */}
        <Box sx={{ mt: 0.5 }}>
          <Skeleton
            variant="text"
            width="80%"
            height={28}
            sx={{ borderRadius: "4px" }}
          />
        </Box>

        {/* Details Container Skeleton (الوحدات) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            p: 1.5,
            backgroundColor: "#f8fafc",
            borderRadius: "10px",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="30%" height={20} />
          </Box>
        </Box>

        {/* Prices Container Skeleton (صندوقي الأسعار) */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {/* سعر الشراء */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="75%" height={22} />
          </Box>

          {/* سعر المستهلك */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="75%" height={22} />
          </Box>
        </Box>
      </Box>

      {/* Button Skeleton */}
      <Box sx={{ mt: 2 }}>
        <Skeleton
          variant="rounded"
          width="100%"
          height={38}
          sx={{ borderRadius: "10px" }}
        />
      </Box>
    </Card>
  );
};