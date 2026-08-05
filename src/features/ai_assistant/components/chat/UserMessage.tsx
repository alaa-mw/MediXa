import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { Box, Typography } from "@mui/material";

interface UserMessageProps {
  message: string;
  time: string;
}

const UserMessage = ({ message, time }: UserMessageProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
      <Box
        sx={{
          maxWidth: 500,
          bgcolor: "primary.main",
          color: "white",
          px: 3,
          py: 2,
          borderRadius: 3,
          borderBottomRightRadius: 0,
        }}
      >
        <Typography>{message}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <Typography sx={{ fontSize: 12 }} color="rgba(255,255,255,.8)">
            {time}
          </Typography>

          <DoneAllRoundedIcon
            sx={{
              fontSize: 15,
              color: "rgba(255,255,255,.8)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserMessage;
