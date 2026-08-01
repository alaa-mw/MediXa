import { Card, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  time: string;
  isItAddCard?: boolean;
  onClick?: () => void;
}

const SessionItem = ({ title, time, isItAddCard, onClick }: Props) => {
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        px: 1,
        py: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: isItAddCard ? "primary.main" : "divider",
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
        {isItAddCard ? (
          <Typography variant="body2" noWrap>
            جلسة جديدة
          </Typography>
        ) : (
          <Typography variant="body2" noWrap sx={{ color: "GrayText" }}>
            {title}
          </Typography>
        )}

        {isItAddCard ? (
          <Typography color="text.secondary" variant="caption">
            + إضافة
          </Typography>
        ) : (
          <Typography variant="caption" sx={{ color: "grey.500" }}>
            {time}
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default SessionItem;
