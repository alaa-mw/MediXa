import React from "react";
import { Card, CardContent, Stack, Box, Skeleton } from "@mui/material";

const CustomerOrderCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        border: "1px solid #EEF2F5",
        boxShadow: "0px 4px 18px rgba(0,0,0,0.03)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack
          sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          
          >
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton
              variant="rectangular"
              width={60}
              height={28}
              sx={{ borderRadius: 2 }}
            />
          </Stack>

          <Stack sx={{ flexDirection: "row", spacing: 1.5, alignItems: "center" }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box>
              <Skeleton variant="text" width={140} height={28} />
              <Skeleton variant="text" width={100} height={20} />
            </Box>
          </Stack>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={12}
            sx={{ borderRadius: 2 }}
          />

          <Skeleton
            variant="rectangular"
            width="100%"
            height={44}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderCardSkeleton;
