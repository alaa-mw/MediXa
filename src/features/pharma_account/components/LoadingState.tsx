import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        py: 5,
      }}
    >
      <CircularProgress
        size={24}
        sx={{
          color: "#8b6c64",
        }}
      />
      <Typography variant="body2" color="text.secondary">
        جاري جلب البيانات...
      </Typography>
    </Box>
  );
};

export default LoadingState;
