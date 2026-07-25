import { Box, Button, Stack } from "@mui/material";

interface Props {
  onSave?: () => void;
  onCancel?: () => void;
  isPending?: boolean;
}

export default function AddDrugFormAction({
  onSave,
  onCancel,
  isPending,
}: Props) {
  return (
    <Box
      sx={{
        mt: 5,
        direction: "row",
        spacing: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="contained"
        onClick={onSave}
        disabled={isPending}
        sx={{
          bgcolor: "#351236",
          px: 5,
          py: 1.5,
          borderRadius: 2,

          "&:hover": {
            bgcolor: "#2b0e2d",
          },
        }}
      >
        حفظ وإضافة الدواء
      </Button>

      <Button
        variant="text"
        onClick={onCancel}
        sx={{
          color: "#333",
        }}
      >
        إلغاء
      </Button>
    </Box>
  );
}
