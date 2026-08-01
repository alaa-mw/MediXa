import { Box, Paper, Typography } from "@mui/material";

const weekDays = ["Sun", "Mon", "Tue", "Wen", "Thr", "Fri", "Sat"];
const monthDays = ["09", "10", "11", "12", "13", "14", "15"];

const DashboardCalendarCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #D8EDF8",
        p: 2.5,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, textAlign: "center", mb: 1.5 }}
      >
        September 2026
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 1,
          textAlign: "center",
          color: "#5B6476",
          fontWeight: 600,
          fontSize: 13,
          mb: 1,
        }}
      >
        {weekDays.map((day) => (
          <Typography key={day} variant="caption" sx={{ fontWeight: 700 }}>
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 1,
          textAlign: "center",
        }}
      >
        {monthDays.map((day) => (
          <Box
            key={day}
            sx={{
              py: 0.75,
              borderRadius: "999px",
              backgroundColor: day === "15" ? "#FADFE6" : "transparent",
              color: "#4A5568",
              fontWeight: day === "15" ? 800 : 600,
              fontSize: 14,
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DashboardCalendarCard;
