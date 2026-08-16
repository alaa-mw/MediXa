import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { ExpiredMedResponse } from "../../types/analysisInventory.types";
import PeriodPopoverButton from "../PeriodPopoverButton";
import AnalysisPanel from "./AnalysisPanel";
import { useGetWithParams } from "../../../../shared/hooks/useGetWithParams";
import TokenService from "../../../../shared/services/tokenService";

const ExpiryMedicinesCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pharmacyId = TokenService.getPharmacyId() || ""; // Replace with your actual pharmacy ID retrieval logic
  const { data, setQueryParams, queryParams } = useGetWithParams<ExpiredMedResponse>(
    "/analytics/historical/expired-drugs",
    {
      pharmacy_id: pharmacyId,
      days: 30,
    },
  );

  const items = data?.data.items ?? [];
  const visibleItems = items.slice(0, 2);
  const hiddenItems = items.slice(2);

  const formatDateOnly = (value: string) => value.split("T")[0];

  const handlePeriodChange = (value: number) => {
    setQueryParams({ ...queryParams, days: value });
  };

  const renderItems = (rows: ExpiredMedResponse["items"]) => (
    <Stack spacing={0.75}>
      {rows.map((row) => (
        <Box
          key={`${row.batchId}-${row.drugName}`}
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
            {formatDateOnly(row.expiryDate)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2E3D56", fontWeight: 700 }}
          >
            {row.drugName}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
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
              <PeriodPopoverButton
                value={queryParams.days}
                onChange={handlePeriodChange}
              />
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
              {items.length}
            </Typography>
            <Typography variant="body2" sx={{ color: "#697A93" }}>
              صنف يتطلب مراجعة
            </Typography>
          </Box>

          {renderItems(visibleItems)}

          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            disabled={hiddenItems.length === 0}
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
          الأدوية منتهية الصلاحية
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
            <Stack spacing={1.1}>
              <Typography
                variant="caption"
                sx={{ color: "#7A8EA6", fontWeight: 600, textAlign: "right" }}
              >
                العناصر الإضافية
              </Typography>
              {renderItems(hiddenItems)}
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

export default ExpiryMedicinesCard;
