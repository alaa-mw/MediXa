import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box
      sx={{
        py: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        لا توجد صيدليات تطابق بحثك...
      </Typography>
    </Box>
  );
};

export default EmptyState;
