import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Fab, IconButton, Paper, Slide, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AssistantLayout from "../PharmacyAssistantLayout";

const FloatingAssistantLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Hide the floating assistant on the dedicated assistant page.
  if (pathname.endsWith("/ai-assistant")) {
    return null;
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="assistant"
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          left: 16,
          bottom: 16,
          zIndex: (theme) => theme.zIndex.modal + 2,
          boxShadow: "0 10px 24px rgba(29, 95, 193, 0.35)",
        }}
      >
        <SmartToyRoundedIcon />
      </Fab>

      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={12}
          sx={{
            position: "fixed",
            left: 12,
            bottom: 84,
            width: {
              xs: "calc(100vw - 24px)",
              md: "min(1100px, calc(100vw - 32px))",
            },
            height: { xs: "calc(100vh - 100px)", md: "78vh" },
            zIndex: (theme) => theme.zIndex.modal + 1,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              height: 44,
              px: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              direction: "rtl",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              المساعد الذكي
            </Typography>
            <IconButton size="small" onClick={() => setIsOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ height: "calc(100% - 44px)", width: "100%" }}>
            <AssistantLayout />
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default FloatingAssistantLauncher;
