import { Circle, CircleOutlined } from "@mui/icons-material";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import { Box, Card, Stack, Typography } from "@mui/material";

const KnowledgeCard = () => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        direction: "rtl",
        background:
          "linear-gradient(135deg, #5f8d8f 0%, #7B1FA2 50%, #9C27B0 100%)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "flex-end", gap: 2, direction: "ltr" }}
      >
        <Typography sx={{ fontWeight: "bold" }} color="white">
          مصادر المعرفة
        </Typography>

        <StorageRoundedIcon sx={{ color: "white" }} />
      </Stack>

      <Stack spacing={2} sx={{ mt: 2, justifyContent: "flex-start" }}>
        <Box sx={{ display: "flex" }}>
          <Circle sx={{ color: "white", fontSize: 10, mt: 0.5, ml: 1 }} />
          <Typography variant="body2" sx={{ direction: "rtl" }}>
            BNF_83
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Circle sx={{ color: "white", fontSize: 10, mt: 0.5, ml: 1 }} />
          <Typography variant="body2" sx={{ direction: "rtl" }}>
            SDR_7_المرجع_الدوائي_السوري
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default KnowledgeCard;
