import { Button, CircularProgress, Stack } from "@mui/material";

interface CreateAccountButtonProps {
  onSubmit: () => void;
  isPending: boolean;
}

const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({
  onSubmit,
  isPending,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mt: 5, justifyContent: "flex-end" }}
    >
      <Button
        variant="contained"
        size="large"
        disabled={isPending}
        onClick={onSubmit}
        sx={{
          bgcolor: "primary.main",
        }}
      >
        {isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          " إنشاء الحساب"
        )}
      </Button>

      <Button variant="text" size="large">
        إلغاء
      </Button>
    </Stack>
  );
};

export default CreateAccountButton;
