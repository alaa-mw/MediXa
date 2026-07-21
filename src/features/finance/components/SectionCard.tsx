import { Card, CardContent, Typography, Stack } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const SectionCard = ({ title, icon, children }: Props) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack direction="row" sx={{ spacing: 1, alignItems: "center", mb: 3 }}>
          {icon}

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
};

export default SectionCard;
