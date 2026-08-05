import { Card, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const AddSessionItem = ({ title, subtitle, onClick }: Props) => {
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        px: 1,
        py: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "primary.main",
        cursor: "pointer",
        transition: ".25s",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "primary.50",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", direction: "row" }}
      >
        <Typography variant="body2" noWrap>
          جلسة جديدة
        </Typography>

        <Typography color="text.secondary" variant="caption">
          + إضافة
        </Typography>
      </Stack>
    </Card>
  );
};

export default AddSessionItem;
