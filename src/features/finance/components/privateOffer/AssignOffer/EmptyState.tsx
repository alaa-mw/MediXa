import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography color="text.secondary">لم يتم اختيار أي صيدلية</Typography>
    </Box>
  );
};

export default EmptyState;
