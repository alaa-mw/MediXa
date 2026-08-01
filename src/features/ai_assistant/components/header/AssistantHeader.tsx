import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import { Box, Typography } from "@mui/material";

const AssistantHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        my: "auto",
        pt: 3,
      }}
    >
      {/* سطر الترحيب مع الإيموجي */}
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 1.5, // مسافة بين النص والإيموجي
        }}
      >
        <span role="img" aria-label="waving-hand" style={{ fontSize: "1.2em" }}>
          👋
        </span>
        <span>مرحباً، أنا مساعدك الذكي</span>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          maxWidth: 500,
        }}
      >
        اسألني عن الأدوية، التداخلات، الجرعات، أو أي موضوع طبي آخر
      </Typography>
    </Box>
  );
};

export default AssistantHeader;
