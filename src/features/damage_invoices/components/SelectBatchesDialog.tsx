/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Pagination,
  Chip,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { Batch } from "../types/Batch";
import { CustomDatePickerField } from "../../../shared/components/FiltterDatePicker";
import type { BatchAllocation } from "./AddDamageInvoice";

interface Props {
  open: boolean;
  onClose: () => void;
  pharmacyDrugId: string;
  initialSelected?: BatchAllocation[];
  onConfirm: (selected: BatchAllocation[]) => void;
}

const SelectBatchesDialog: React.FC<Props> = ({
  open,
  onClose,
  pharmacyDrugId,
  initialSelected = [],
  onConfirm,
}) => {
  console.log("pharmacyDrugId", pharmacyDrugId);
  const {
    data: batches,
    queryParams,
    setQueryParams,
  } = useGetWithParams<Batch[]>(
    `/batch/pharmacy-drug/${pharmacyDrugId}`,
    {
      page: "",
      limit: 5,
      supplierId: "",
      fromDate: "",
      toDate: "",
    },
    {
      shouldFetch: () => !!pharmacyDrugId,
    },
  );
  const [selectedMap, setSelectedMap] = useState<
    Record<
      string,
      {
        expiryDate: string;
        availableQuantity: number;
        quantityDamaged: number;
      }
    >
  >({});

  useEffect(() => {
    // initialize selection map from initialSelected
    const map: Record<
      string,
      {
        expiryDate: string;
        availableQuantity: number;
        quantityDamaged: number;
      }
    > = {};
    initialSelected.forEach((s) => {
      map[String(s.batchId)] = {
        expiryDate: s.expiryDate,
        availableQuantity: s.availableQuantity,
        quantityDamaged: s.quantityDamaged,
      };
    });
    setSelectedMap(map);
  }, [initialSelected, open]);

  const setQty = (batchId: string, copiedBatch: Batch) => {
    setSelectedMap((m) => {
      const next = { ...m };
      if (next[batchId]) {
        // remove selection if it already exists
        delete next[batchId];
      } else {
        // add selection if it doesn't exist
        next[batchId] = {
          expiryDate: copiedBatch.expiryDate,
          availableQuantity:
            (copiedBatch.initialQuantity ?? 0) -
            (copiedBatch.soldQuantity ?? 0),
          quantityDamaged: 0,
        };
      }
      return next;
    });
  };

  const handleConfirm = () => {
    const selected = Object.entries(selectedMap).map(
      ([batchId, { expiryDate, availableQuantity, quantityDamaged }]) => ({
        batchId,
        expiryDate,
        availableQuantity,
        quantityDamaged,
      }),
    );
    onConfirm(selected);
    onClose();
  };

  const batchesList = useMemo(() => {
    if (Array.isArray(batches)) return batches as any[];
    if (batches && Array.isArray((batches as any).data))
      return (batches as any).data;
    return [] as any[];
  }, [batches]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>اختيار دفعات</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "#64748b",
              fontWeight: "600",
              mb: 1.5,
              fontSize: "12px",
            }}
          >
            تصفية المدة الزمنية
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                width: "60%",
                alignItems: "center",
              }}
            >
              <CustomDatePickerField
                // label="من تاريخ"
                value={queryParams.fromDate}
                onChange={(value) =>
                  setQueryParams({ ...queryParams, fromDate: value, page: "" })
                }
              />
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                إلى
              </Typography>
              <CustomDatePickerField
                // label="إلى تاريخ"
                value={queryParams.toDate}
                onChange={(value) =>
                  setQueryParams({ ...queryParams, toDate: value, page: "" })
                }
                minDate={queryParams.fromDate}
              />
              <Button
                variant="outlined"
                sx={{ whiteSpace: "nowrap",width:"40%" }}
                onClick={() =>
                  setQueryParams({
                    ...queryParams,
                    fromDate: "",
                    toDate: "",
                    page: "",
                  })
                }
              >
                إعادة تعيين
              </Button>
            </Box>
            {/* pagination footer */}
            <Box>
              {(batches?.meta?.totalPages ?? 1) > 1 && (
                <Box sx={{ direction: "rtl" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Pagination
                      count={batches?.meta?.totalPages ?? 1}
                      page={batches?.meta?.page ?? 1}
                      size="small"
                      onChange={(_, value) =>
                        setQueryParams({ ...queryParams, page: value })
                      }
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {batchesList.length === 0 ? (
          <Typography sx={{ p: 1 }} color="text.secondary">
            لا توجد دفعات متاحة
          </Typography>
        ) : (
          <Box
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                p: 1.2,
                bgcolor: "primary.main",
                fontWeight: 700,
                fontSize: 13,
                textAlign: "center",
                color: "white",
              }}
            >
              <Box>#</Box>
              <Box>تاريخ الانتهاء</Box>
              <Box>الكمية المتاحة</Box>
              <Box>اختيار</Box>
            </Box>

            {batchesList.map((batch: any, index: number) => {
              const batchKey = String(batch.batchId ?? batch.id ?? index);
              const selected = batchKey in selectedMap;
              const availableQuantity =
                (batch.initialQuantity ?? 0) - (batch.soldQuantity ?? 0);

              return (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    p: 1.2,
                    borderTop: "1px solid #E2E8F0",
                    fontSize: 13,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>{batch.batchId}</Box>
                  <Box>{batch.expiryDate.split("T")[0]}</Box>
                  <Box>
                    <Chip color="success" label={availableQuantity}  size="small" sx={{ minWidth: 40 }} />
                  </Box>
                  <Box>
                    <Checkbox
                      checked={selected}
                      onChange={() => setQty(batchKey, batch)}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          إلغاء
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          تأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectBatchesDialog;
