import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box, IconButton, OutlinedInput, Stack } from "@mui/material";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText("") 
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
        <IconButton>
          <AttachFileRoundedIcon />
        </IconButton>

        <IconButton>
          <TuneRoundedIcon />
        </IconButton>

        <OutlinedInput
          fullWidth
          placeholder="اكتب سؤالك هنا..."
          multiline
          maxRows={4}
          value={text}
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
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatInput;
