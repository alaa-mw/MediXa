import { Box, Button, Stack, Typography } from "@mui/material";
import type { AnalysisInventoryViewModel } from "../../types/analysisInventory.types";
import AnalysisPanel from "./AnalysisPanel";
import { useState } from "react";
import PeriodPopoverButton from "../PeriodPopoverButton";

type SlowMedicinesCardProps = {
  rows: AnalysisInventoryViewModel["slowMedicines"]["rows"];
};

const SlowMedicinesCard = ({ rows }: SlowMedicinesCardProps) => {
  const [period, setPeriod] = useState<number>(30);

  const handlePeriodChange = (value: number) => {
    const v = Math.max(7, Math.min(90, Math.floor(value || 0)));
    setPeriod(v);
  };

  return (
    <AnalysisPanel minHeight={250}>
      <Stack spacing={1.1}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1C2940" }}>
            الأدوية الراكدة
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeriodPopoverButton value={period} onChange={handlePeriodChange} />
          </Box>
        </Stack>

        <Typography
          variant="caption"
          sx={{ color: "#7A8EA6", fontWeight: 600 }}
        >
          عناصر لا تتحرك في المبيعات
        </Typography>

        <Box sx={{ textAlign: "center", py: 1 }}>
          <Typography
            variant="h4"
            sx={{ color: "#D6414E", fontWeight: 800, lineHeight: 1.2 }}
          >
            {rows.length}
          </Typography>
          <Typography variant="body2" sx={{ color: "#697A93" }}>
            صنف يتطلب مراجعة
          </Typography>
        </Box>

        <Stack spacing={0.75}>
          {rows.map((row) => (
            <Box
              key={row.id}
              sx={{
                p: 1,
                borderRadius: 1.5,
                border: "1px solid #E5EFF7",
                backgroundColor: "#F8FCFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#D6414E", fontWeight: 700 }}
              >
                منذ {row.notSaleFromDays} يوم
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#2E3D56", fontWeight: 700 }}
              >
                {row.name}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          size="small"
          sx={{ borderRadius: 1.75, fontWeight: 700 }}
        >
          عرض الكل
        </Button>
      </Stack>
    </AnalysisPanel>
  );
};

export default SlowMedicinesCard;
