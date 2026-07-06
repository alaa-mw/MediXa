import { Stack, Chip } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";

const InfoStatus = () => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ alignItems: "flex-end", mt: 1 }}
    >
      <Chip
        sx={{
          width: 200,
          backgroundColor: "#00732C33",
          color: "#00732C",
          fontWeight: 700,
        }}
        icon={<VerifiedUser sx={{ color: "#00732C !important" }} />}
        label="نظام التسجيل المعتمد"
      />

      <Chip
        sx={{
          width: 250,
          backgroundColor: "#5A3C6233",
          color: "#5A3C62 !important",
          fontWeight: 700,
        }}
        icon={<VerifiedUser sx={{ color: "#5A3C62 !important" }} />}
        label="يجب إظهار البطاقة النقابية"
      />
    </Stack>
  );
};

export default InfoStatus;
