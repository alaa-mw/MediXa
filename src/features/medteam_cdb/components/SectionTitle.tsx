import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
}

export default function SectionTitle({ title, icon }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 2,
        mb: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 700,
          color: "#2A1B35",
        }}
      >
        {title}
      </Typography>
      {icon}
    </Box>
  );
}
