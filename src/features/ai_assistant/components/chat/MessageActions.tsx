import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

import { IconButton, Stack } from "@mui/material";

const MessageActions = () => {
  return (
    <Stack direction="row" sx={{ direction: "row", mt: 2 }}>
      <IconButton size="small">
        <ContentCopyOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton size="small">
        <ThumbUpAltOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton size="small">
        <ThumbDownAltOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default MessageActions;
