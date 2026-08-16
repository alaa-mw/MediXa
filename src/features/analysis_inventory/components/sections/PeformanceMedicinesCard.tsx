import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetWithParams } from "../../../../shared/hooks/useGetWithParams";
import type { PerformanceMedResponse } from "../../types/analysisInventory.types";
import PeriodPopoverButton from "../PeriodPopoverButton";
import AnalysisPanel from "./AnalysisPanel";

const PeformanceMedicinesCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, queryParams, setQueryParams } =
    useGetWithParams<PerformanceMedResponse>(
      "/analytics/historical/drug-performance",
      {
        pharmacy_id: 1,
        days: 30,
      },
    );
  const handlePeriodChange = (value: number) => {
    setQueryParams({ ...queryParams, days: value });
  };

  const topSelling = data?.data.topSelling ?? [];
  const leastSelling = data?.data.leastSelling ?? [];

  const visibleTopSelling = topSelling.slice(0, 3);
  const hiddenTopSelling = topSelling.slice(3);

  const visibleLeastSelling = leastSelling.slice(0, 2);
  const hiddenLeastSelling = leastSelling.slice(2);

  const hasHiddenItems =
    hiddenTopSelling.length > 0 || hiddenLeastSelling.length > 0;

  const renderTopSelling = (items: PerformanceMedResponse["topSelling"]) => (
    <Stack spacing={0.85} sx={{ mt: 0.8 }}>
      {items.map((item) => (
        <Box
          key={item.pharmacyDrugId}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.4,
              borderRadius: 1,
              backgroundColor: "#EAF2FF",
              color: "#4B6FA3",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {item.soldFullBoxes} عبوة
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#2D3A53" }}
          >
            {item.drugName}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  const renderLeastSelling = (
    items: PerformanceMedResponse["leastSelling"],
  ) => (
    <Stack spacing={0.85} sx={{ mt: 0.8 }}>
      {items.map((item) => (
        <Box
          key={item.pharmacyDrugId}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#CC4A54", fontWeight: 700 }}
          >
            {item.soldFullBoxes} مبيعات خلال {queryParams.days} يوم
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#2D3A53" }}
          >
            {item.drugName}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
      <AnalysisPanel title="أداء الأصناف (الأكثر/الأقل مبيعاً)">
        <Stack spacing={1.25}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              sx={{ fontWeight: 800, color: "#259468", fontSize: 13 }}
            >
              الأكثر مبيعاً
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PeriodPopoverButton
                value={queryParams.days}
                onChange={handlePeriodChange}
              />
            </Box>
          </Stack>

          <Box>{renderTopSelling(visibleTopSelling)}</Box>

          <Divider />

          <Box>
            <Typography
              sx={{ fontWeight: 800, color: "#CC4A54", fontSize: 13 }}
            >
              الأقل مبيعاً
            </Typography>
            {renderLeastSelling(visibleLeastSelling)}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            disabled={!hasHiddenItems}
            onClick={() => setIsDialogOpen(true)}
            sx={{ borderRadius: 1.75, fontWeight: 700 }}
          >
            عرض الكل
          </Button>
        </Stack>
      </AnalysisPanel>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            color: "#1C2940",
            textAlign: "right",
            pb: 1,
          }}
        >
          أداء الأصناف (الأكثر/الأقل مبيعاً)
        </DialogTitle>
        <DialogContent sx={{ pt: "8px !important", pb: 2 }}>
          <Box
            sx={{
              borderRadius: 2,
              border: "1px solid #D8EDF8",
              backgroundColor: "#FFFFFF",
              p: 1.5,
            }}
          >
            <Stack spacing={1.25}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#259468",
                  fontSize: 13,
                  textAlign: "right",
                }}
              >
                الأكثر مبيعاً
              </Typography>
              {renderTopSelling(hiddenTopSelling)}

              <Divider />

              <Box>
                <Typography
                  sx={{ fontWeight: 800, color: "#CC4A54", fontSize: 13 }}
                >
                  الأقل مبيعاً
                </Typography>
                {renderLeastSelling(hiddenLeastSelling)}
              </Box>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setIsDialogOpen(false)}
                sx={{ borderRadius: 1.75, fontWeight: 700 }}
              >
                إغلاق
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PeformanceMedicinesCard;
