import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";

const weekDays = ["Sun", "Mon", "Tue", "Wen", "Thr", "Fri", "Sat"];

type DashboardCalendarCardProps = {
  today: string;
  setToday: Dispatch<SetStateAction<string>>;
};

const toDateOnlyString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateOnlyString = (value: string): Date => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    const fallback = new Date();
    fallback.setHours(0, 0, 0, 0);
    return fallback;
  }
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

const getStartOfWeek = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  return start;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DashboardCalendarCard = ({
  today,
  setToday,
}: DashboardCalendarCardProps) => {
  const selectedDate = useMemo(() => parseDateOnlyString(today), [today]);

  const weekDates = useMemo(() => {
    const start = getStartOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [selectedDate]);

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  const handleDaySelect = (date: Date) => {
    setToday(toDateOnlyString(date));
  };

  const handleMonthShift = (months: number) => {
    // Shift the selected date by the specified number of months.
    const nextDate = new Date(selectedDate);
    nextDate.setMonth(selectedDate.getMonth() + months);
    handleDaySelect(nextDate);
  };

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <IconButton
          size="small"
          onClick={() => handleMonthShift(-1)}
          aria-label="Previous month"
          sx={{ color: "#5B6476" }}
        >
          {"<"}
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center" }}>
          {monthLabel}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handleMonthShift(1)}
          aria-label="Next month"
          sx={{ color: "#5B6476" }}
        >
          {">"}
        </IconButton>
      </Box>

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
        {weekDates.map((date) => (
          <Box
            key={date.toISOString()}
            onClick={() => handleDaySelect(date)}
            sx={{
              py: 0.75,
              borderRadius: "999px",
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: isSameDay(date, selectedDate)
                ? "#FADFE6"
                : "transparent",
              color: "#4A5568",
              fontWeight: isSameDay(date, selectedDate) ? 800 : 600,
              fontSize: 14,
            }}
          >
            {String(date.getDate()).padStart(2, "0")}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DashboardCalendarCard;
