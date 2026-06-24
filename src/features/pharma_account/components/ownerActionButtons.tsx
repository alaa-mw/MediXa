import { Box, Button } from "@mui/material";

interface OwnerActionButtonsProps {
  isLocked: boolean;
  isLoading: boolean;
  onClear: () => void;
  onOpenDialog: () => void;
}

export const OwnerActionButtons = ({
  isLocked,
  isLoading,
  onClear,
  onOpenDialog,
}: OwnerActionButtonsProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {isLocked && (
        <Button variant="outlined" color="error" size="large" onClick={onClear}>
          تغيير المالك
        </Button>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={onOpenDialog}
        disabled={isLocked || isLoading}
        sx={{ bgcolor: "primary.main" }}
      >
        {isLoading ? "جاري التحميل..." : "موجود مسبقاً"}
      </Button>
    </Box>
  );
};

export default OwnerActionButtons;
