import { Card, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  time: string;
  onClick?: () => void;
  isActive: boolean;
}

const SessionItem = ({ title, time, onClick, isActive }: Props) => {
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: isActive ? "secondary.main" : "divider",
        cursor: "pointer",
        transition: ".25s",
        overflow: "hidden",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "primary.50",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          noWrap
          sx={{
            color: "GrayText",
            flex: 1,
            minWidth: 0,
            textAlign: "right", // محاذاة العنوان لليمين بشكل صحيح مع العربية
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          component="span"
          sx={{
            color: "grey.500",
            whiteSpace: "nowrap",
            direction: "ltr",
            unicodeBidi: "embed",
          }}
        >
          {time}
        </Typography>
      </Stack>
    </Card>
  );
};

export default SessionItem;
