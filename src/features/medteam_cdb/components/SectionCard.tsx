import { Paper } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionCard({ children }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: "#fff",
        mb: 4,
      }}
    >
      {children}
    </Paper>
  );
}
