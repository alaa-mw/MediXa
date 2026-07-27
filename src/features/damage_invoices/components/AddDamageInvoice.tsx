import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostData } from "../../../shared/hooks/usePostData";
import { useGetWithParams } from "../../../shared/hooks/useGetWithParams";
import { CustomCounterField } from "../../../shared/layout/CustomCounterField";
import { CustomTextField } from "../../../shared/layout/CustomTextField";
import { RTLDatePicker } from "../../../shared/layout/RTLDatePicker";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import type { PharmacyDrugSearch } from "../../purchase_invoices/components/PurchaseInvoiceGrid";
import SelectBatchesDialog from "./SelectBatchesDialog";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

export interface BatchAllocation {
  batchId: string;
  expiryDate: string;
  availableQuantity: number; //
  quantityDamaged: number;
  notes?: string;
}

interface DamageInvoiceForm {
  invoiceDate: string;
  notes: string;
  pharmacyDrugId: string;
  quantityDamaged: number;
  damageReason: string;
  batchAllocations: BatchAllocation[];
}

const AddDamageInvoice = () => {
  const [form, setForm] = useState<DamageInvoiceForm>({
    invoiceDate: new Date().toISOString().slice(0, 10),
    notes: "",
    pharmacyDrugId: "", //
    quantityDamaged: 0, // set direct or sum of batches
    damageReason: "",
    batchAllocations: [],
  });

  const [selectedDrug, setSelectedDrug] = useState<
    PharmacyDrugSearch | undefined
  >(undefined);

  const [openBatchesDialog, setOpenBatchesDialog] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const state = (location.state ?? {}) as any;
    if (state && state.pharmacyDrugId) {
      setForm((s) => ({
        ...s,
        pharmacyDrugId: state.pharmacyDrugId,
        batchAllocations: Array.isArray(state.batchAllocations)
          ? state.batchAllocations.map((b: any) => ({
              batchId: String(b.batchId),
              expiryDate: b.expiryDate,
              availableQuantity: Number(b.availableQuantity ?? 0),
              quantityDamaged: Number(b.quantityDamaged ?? 0),
              notes: b.notes ?? "",
            }))
          : [],
      }));

      // set a lightweight selectedDrug if tradeName provided so UI shows label
      if (state.tradeName) {
        setSelectedDrug({ pharmacyDrugId: state.pharmacyDrugId, tradeName: state.tradeName });
      }
    }
  }, [location.state]);

  const {showSnackbar} = useSnackbar(); 
  // Search pharmacy drugs by name (triggered after 3 chars by hook options)
  const {
    data: phDrugsSearch,
    queryParams: phDrugsQueryParams,
    setQueryParams: setphDrugsQueryParams,
  } = useGetWithParams<PharmacyDrugSearch[]>(
    "/pharmacy-drugs/search-my-drugs/by-name",
    { name: "", page: "", limit: 10 },
    { shouldFetch: (params) => String(params.name ?? "").trim().length >= 3 },
  );
  const {mutate: createDamageInvoice} = usePostData(
    "/damage-invoices/create-damage-invoice-for-single-drug"
  );
  const onDrugSearchChange = (value: string) => {
    setphDrugsQueryParams({ ...phDrugsQueryParams, name: value });
  };

  const handleSelectDrug = (item: PharmacyDrugSearch) => {
    setForm((s) => ({
      ...s,
      pharmacyDrugId: item.pharmacyDrugId,
      batchAllocations: [],
    }));
    setSelectedDrug(item);
  };

  const setBatchQuantity = (batchId: string, qty: number) => {
    setForm((s) => ({
      ...s,
      batchAllocations: s.batchAllocations.map((b) =>
        b.batchId === batchId ? { ...b, quantityDamaged: qty } : b,
      ),
    }));
  };

  const calcQuantityDamaged = () => {
    if (form.batchAllocations.length > 0) {
      return form.batchAllocations.reduce(
        (sum, b) => sum + b.quantityDamaged,
        0
      );
    }
    return form.quantityDamaged;
  };

  const handleSubmit = () => {
    const payload = {
      invoiceDate: form.invoiceDate,
      notes: form.notes,
      damageReason: form.damageReason,
      pharmacyDrugId: form.pharmacyDrugId,
      quantityDamaged: calcQuantityDamaged(),
      ...(form.batchAllocations.length > 0 && {
        batchAllocations: form.batchAllocations.map((b) => ({
          batchId: b.batchId,
          quantityDamaged: b.quantityDamaged,
          notes: b.notes,
        })),
      }),
    };
    createDamageInvoice(payload, {
      onSuccess: () => {
        showSnackbar("تم إنشاء فاتورة الإتلاف بنجاح", "success");
      },
      onError: (error) => {
        showSnackbar("حدث خطأ أثناء إنشاء فاتورة الإتلاف", "error");
        console.error("Error creating damage invoice:", error);
      }
    });
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "700", mb: 2 }}>
        إضافة فاتورة إتلاف
      </Typography>
      <Container
        sx={{
          backgroundColor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <SearchBarDynamic<PharmacyDrugSearch>
              placeholder="ابحث عن دواء بالاسم (3 أحرف على الأقل)"
              onChange={onDrugSearchChange}
              results={phDrugsSearch?.data ?? []}
              getOptionLabel={(drug) => drug.tradeName}
              onSelect={(drug) => {
                handleSelectDrug(drug);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Chip
              label={selectedDrug?.tradeName ?? "لم يتم اختيار دواء"}
              color={selectedDrug ? "primary" : "default"}
              clickable={!!form.pharmacyDrugId}
              onClick={() => form.pharmacyDrugId && setOpenBatchesDialog(true)}
              sx={{ mr: 1 }}
            />
            <Button
              disabled={!form.pharmacyDrugId}
              onClick={() => setOpenBatchesDialog(true)}
            >
              اختيار دفعات
            </Button>
          </Grid>
          {form.pharmacyDrugId && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2">
                  الأصناف المحددة: {form.batchAllocations.length}
                </Typography>
              </Box>

              <Paper
                variant="outlined"
                sx={{ p: 1, maxHeight: 300, overflow: "auto" }}
              >
                {form.batchAllocations.length === 0 ? (
                  <Typography
                    variant="body2"
                    sx={{ p: 1, color: "text.secondary" }}
                  >
                    لم يتم اختيار أي دفعات. اضغط على "اختيار دفعات" لتحديد
                    الدفعات المتاحة للدواء المحدد.
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
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
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
                      <Box>الكمية المتلفة</Box>
                      <Box> ملاحظة</Box>
                    </Box>

                    {form.batchAllocations.map((allocation, index: number) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr ",
                            p: 1.2,
                            borderTop: "1px solid #E2E8F0",
                            fontSize: 13,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box>{allocation.batchId}</Box>
                          <Box>{allocation.expiryDate?.split("T")[0]}</Box>
                          <Box>{allocation.availableQuantity}</Box>
                          <Box>
                            <CustomCounterField
                              value={
                                form.batchAllocations.find(
                                  (b) => b.batchId === allocation.batchId,
                                )?.quantityDamaged ?? 0
                              }
                              onChange={(value) =>
                                setBatchQuantity(allocation.batchId, value)
                              }
                              height="32px"
                              min={0}
                              max={allocation.availableQuantity}
                              // disabled={!row.editable}
                            />
                          </Box>
                          <Box>
                            <CustomTextField
                              label="ملاحظة"
                              value={
                                form.batchAllocations.find(
                                  (b) => b.batchId === allocation.batchId,
                                )?.notes ?? ""
                              }
                              onChange={(value) =>
                                setForm((s) => ({
                                  ...s,
                                  batchAllocations: s.batchAllocations.map(
                                    (b) =>
                                      b.batchId === allocation.batchId
                                        ? { ...b, notes: value }
                                        : b,
                                  ),
                                }))
                              }
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Paper>
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 4 }}>
            <RTLDatePicker
              label="تاريخ الفاتورة"
              value={form.invoiceDate}
              onChange={(value) =>
                setForm((s) => ({ ...s, invoiceDate: value }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomCounterField
              label="الكمية المتلفة"
              value={calcQuantityDamaged()}
              onChange={(value) =>
                setForm((s) => ({ ...s, quantityDamaged: value }))
              }
              // height="32px"
              min={0}
              max={
                form.batchAllocations.length > 0
                  ? form.batchAllocations.reduce(
                      (sum, b) => sum + b.availableQuantity,
                      0,
                    )
                  : undefined
              }
              disabled={form.batchAllocations.length > 0} // Disable if batches are selected
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="سبب الإتلاف"
              fullWidth
              value={form.damageReason}
              onChange={(value) =>
                setForm((s) => ({ ...s, damageReason: value }))
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              label="ملاحظات"
              fullWidth
              value={form.notes}
              onChange={(value) => setForm((s) => ({ ...s, notes: value }))}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() =>
                  setForm({
                    pharmacyDrugId: "",
                    batchAllocations: [],
                    invoiceDate: "",
                    damageReason: "",
                    notes: "",
                    quantityDamaged: 0,
                  })
                }
                sx={{ borderRadius: 2 }}
              >
                إلغاء
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
                sx={{ borderRadius: 2 }}
              >
                حفظ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <SelectBatchesDialog
        open={openBatchesDialog}
        onClose={() => setOpenBatchesDialog(false)}
        pharmacyDrugId={form.pharmacyDrugId}
        initialSelected={form.batchAllocations}
        onConfirm={(selected) => {
          console.log("Selected batches from dialog:", selected);
          setForm((s) => ({ ...s, batchAllocations: selected }));
        }}
      />
    </>
  );
};

export default AddDamageInvoice;
