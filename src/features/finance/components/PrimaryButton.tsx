import {
  Button,
  CircularProgress,
  Stack,
  type ButtonProps,
} from "@mui/material";

interface Props extends ButtonProps {
  loading?: boolean;
}

const PrimaryButton = ({
  children,
  loading = false,
  disabled,
  ...props
}: Props) => {
  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      disabled={loading || disabled}
      sx={{
        height: 50,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 700,
      }}
      {...props}
    >
      {loading ? (
        <Stack sx={{ direction: "row", spacing: 1, alignItems: "center" }}>
          <CircularProgress size={18} color="inherit" />
          جاري التنفيذ...
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
};

export default PrimaryButton;
