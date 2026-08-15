import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";
import { useState } from "react";
import type { AnalysisInventoryViewModel } from "../../types/analysisInventory.types";
import PeriodPopoverButton from "../PeriodPopoverButton";
import AnalysisPanel from "./AnalysisPanel";

type ExpiryMedicinesCardProps = {
  rows: AnalysisInventoryViewModel["expiryMedicines"]["rows"];
};

const ExpiryMedicinesCard = ({ rows }: ExpiryMedicinesCardProps) => {
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
            الأدوية منتهية الصلاحية
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeriodPopoverButton value={period} onChange={handlePeriodChange} />
          </Box>
        </Stack>

        <Typography
          variant="caption"
          sx={{ color: "#7A8EA6", fontWeight: 600 }}
        >
          عناصر يجب متابعتها بشكل عاجل
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
              key={`${row.id}-${row.name}`}
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
                {row.expiryDate}
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

export default ExpiryMedicinesCard;
