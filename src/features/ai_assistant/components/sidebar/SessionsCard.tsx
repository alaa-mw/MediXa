import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { Button, Card, Stack, Typography } from "@mui/material";

import SessionItem from "./SessionItem";
interface SessionsCardProps {
  onNewSession: () => void;
}
const SessionsCard = ({ onNewSession }: SessionsCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          mb: 3,
          mt: 1,
          gap: 1,
          direction: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <HistoryRoundedIcon color="primary" />
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          جلسات سابقة
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <SessionItem
          title="جلسة جديدة"
          time="10:15 AM"
          isItAddCard={true}
          onClick={onNewSession}
        />

        <SessionItem title="تداخل دوائي بين أدوية الضغط" time="Yesterday" />

        <SessionItem title="آلية عمل Azithromycin" time="25 Jul" />
        <SessionItem title="ما هي جرعة Cetamol؟" time="10:15 AM" />

        <SessionItem title="تداخل دوائي بين أدوية الضغط" time="Yesterday" />

        <SessionItem title="آلية عمل Azithromycin" time="25 Jul" />
        <SessionItem title="ما هي جرعة Cetamol؟" time="10:15 AM" />

        <SessionItem title="تداخل دوائي بين أدوية الضغط" time="Yesterday" />

        <SessionItem title="آلية عمل Azithromycin" time="25 Jul" />
        <SessionItem title="ما هي جرعة Cetamol؟" time="10:15 AM" />

        <SessionItem title="تداخل دوائي بين أدوية الضغط" time="Yesterday" />

        <SessionItem title="آلية عمل Azithromycin" time="25 Jul" />
      </Stack>

      {/* <Button
        fullWidth
        startIcon={<AddRoundedIcon />}
        variant="outlined"
        sx={{
          mt: 3,
          height: 48,
        }}
      >
        جلسة جديدة
      </Button> */}
    </Card>
  );
};

export default SessionsCard;
