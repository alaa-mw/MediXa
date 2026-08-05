import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  Box,
  IconButton,
  OutlinedInput,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 5,
        mb: 2,
        px: 3,
        mx: 3,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <IconButton disabled={isLoading}>
          <AttachFileRoundedIcon />
        </IconButton>

        <IconButton disabled={isLoading}>
          <TuneRoundedIcon />
        </IconButton>

        <OutlinedInput
          fullWidth
          placeholder={
            isLoading
              ? "جاري إنشاء الجلسة وإرسال الرسالة..."
              : "اكتب سؤالك هنا..."
          }
          multiline
          maxRows={4}
          value={text}
          disabled={isLoading}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            border: "none",
            "& fieldset": { border: "none" },
          }}
        />

        <IconButton
          color="primary"
          onClick={handleSendClick}
          disabled={isLoading || !text.trim()}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SendRoundedIcon />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatInput;
