import React from "react";
import { Box, Card, CardContent, Grid, Skeleton, Chip } from "@mui/material";

const DamageInvoiceCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        border: "1px solid #eef2f5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Grid
          container
          sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}
        >
          <Box sx={{ width: "60%" }}>
            <Skeleton variant="text" width="60%" height={28} />
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <Skeleton variant="circular" width={14} height={14} />
              <Skeleton variant="text" width={100} height={18} />
            </Box>
          </Box>

          <Box>
            <Chip
              label={<Skeleton variant="text" width={60} />}
              size="small"
              sx={{ borderRadius: 8, height: 34, px: 1.25 }}
            />
          </Box>
        </Grid>

        <Grid container sx={{ mb: 2, gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={18} />
            </Box>
          </Box>
        </Grid>

        <Box sx={{ borderTop: "1px solid", borderColor: "divider", my: 2 }} />

        <Grid
          container
          sx={{ mb: 2, gap: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton variant="text" width={140} height={36} />
          </Box>
        </Grid>

        <Grid container spacing={1}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DamageInvoiceCardSkeleton;
