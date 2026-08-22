import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import ErrorOutlined from "@mui/icons-material/ErrorOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGetWithParams } from "../../../shared/hooks/useGetWithParams";
import { usePostData } from "../../../shared/hooks/usePostData";
import BarcodeMyDrugs from "../../../shared/layout/BarcodeMyDrugs";
import { CustomTextField } from "../../../shared/layout/CustomTextField";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import theme from "../../../shared/styles/mainTheme";
import type {
  PharmacyDrugSearch,
  PurchaseOrderCreatePayload,
  Supplier,
} from "../types/purchaseOrder";
import { RTLDatePicker } from "../../../shared/layout/RTLDatePicker";
import { useIdempotency } from "../../../shared/hooks/useIdempotency";

type OrderItem = {
  pharmacyDrugId: number | string;
  tradeName: string;
  orderedQuantityBoxes: number;
  notes?: string;
};

const AddPurchaseOrder = () => {
  const [form, setForm] = useState({
    supplierId: "",
    expectedReceiptDate: "",
    supplierName: "",
    notes: "",
    items: [] as OrderItem[],
  });

  const { showSnackbar } = useSnackbar();
  const { getKey, clearKey } = useIdempotency();

  const { mutate: createPurchaseOrder } = usePostData<unknown>(
    "/purchase-order/create",
  );

  const {
    data: suppliersSearch,
    queryParams: suppliersQueryParams,
    setQueryParams: setSuppliersQueryParams,
  } = useGetWithParams<Supplier[]>(
    "/supplier",
    {
      searchQuery: "",
    },
    {
      shouldFetch: (params) =>
        String(params.searchQuery ?? "").trim().length >= 3,
    },
  );

  const {
    data: drugResults,
    queryParams,
    setQueryParams,
  } = useGetWithParams<PharmacyDrugSearch[]>(
    "/pharmacy-drugs/search-my-drugs/by-name",
    { name: "", page: "", limit: 10 },
    { shouldFetch: (p) => String(p.name ?? "").trim().length >= 3 },
  );

  const handleSelectDrug = (drug: PharmacyDrugSearch) => {
    const exists = form.items.some(
      (i) => String(i.pharmacyDrugId) === String(drug.pharmacyDrugId),
    );
    if (exists) return;

    setForm((s) => ({
      ...s,
      items: [
        ...s.items,
        {
          pharmacyDrugId: drug.pharmacyDrugId,
          tradeName: drug.tradeName,
          orderedQuantityBoxes: 1,
          notes: "",
        },
      ],
    }));

    setQueryParams({ ...queryParams, name: "" });
  };

  const updateItem = (index: number, patch: Partial<OrderItem>) => {
    setForm((s) => ({
      ...s,
      items: s.items.map((it, i) => (i === index ? { ...it, ...patch } : it)),
    }));
  };

  const removeItem = (index: number) => {
    setForm((s) => ({ ...s, items: s.items.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!form.supplierId || form.items.length === 0) {
      showSnackbar("يرجى اختيار المورد وإضافة صنف واحد على الأقل", "error");
      return;
    }

    const payload: PurchaseOrderCreatePayload = {
      idempotencyKey:getKey(),
      supplierId: Number(form.supplierId),
      notes: form.notes,
      items: form.items.map((it) => ({
        pharmacyDrugId: Number(it.pharmacyDrugId),
        orderedQuantityBoxes: Number(it.orderedQuantityBoxes || 0),
        notes: it.notes?.trim() ? it.notes : undefined,
      })),
    };

    createPurchaseOrder(payload, {
      onSuccess: () => {
        showSnackbar("تم إنشاء طلبية الشراء بنجاح", "success");
        setForm({
          supplierId: "",
          expectedReceiptDate: "",
          supplierName: "",
          notes: "",
          items: [],
        });
        clearKey()
      },
      onError: (err) => {
        console.error(err);
        showSnackbar("حدث خطأ أثناء إنشاء طلبية الشراء", "error");
      },
    });
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Card
        sx={{
          borderRadius: 4,
          borderRight: `6px solid ${theme.palette.primary.main}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          border: "1px solid #EAF2F6",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ bgcolor: "#F0F4F8", p: 1, borderRadius: 2 }}>
                <LocalShippingRounded sx={{ color: "#316A75" }} />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 800, color: "#2D3A4D", fontSize: 22 }}
                >
                  إنشاء طلبية شراء
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#64748B", mt: 0.5 }}>
                  اختر المورد ثم أضف الأصناف المطلوبة بالكميات المناسبة
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      alignItems: "center",
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      p: 1.5,
                      borderRadius: 2,
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      اختيار المورد
                    </Typography>
                  </Box>

                  <SearchBarDynamic<Supplier>
                    placeholder="ابحث عن مورد (3 أحرف على الأقل)"
                    onChange={(term) =>
                      setSuppliersQueryParams({
                        ...suppliersQueryParams,
                        searchQuery: term,
                      })
                    }
                    results={suppliersSearch?.data ?? []}
                    getOptionLabel={(supplier) => supplier.supplierName}
                    onSelect={(supplier) =>
                      setForm((s) => ({
                        ...s,
                        supplierId: String(supplier.supplierId),
                        supplierName: supplier.supplierName,
                      }))
                    }
                  />

                  {form.supplierName && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 13,
                        color: "#475569",
                        fontWeight: 700,
                      }}
                    >
                      المورد المختار: {form.supplierName}
                    </Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <CustomTextField
                    label="ملاحظات"
                    value={form.notes}
                    onChange={(value) =>
                      setForm((s) => ({ ...s, notes: value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <RTLDatePicker
                    label={"تاريخ الاستلام"}
                    value={form.expectedReceiptDate}
                    onChange={(value) =>
                      setForm((s) => ({ ...s, expectedReceiptDate: value }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  alignItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  p: 1.5,
                  borderRadius: 2,
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, textAlign: "center", fontSize: 14 }}
                >
                  أضف أصناف الطلبية
                </Typography>
              </Box>

              <SearchBarDynamic<PharmacyDrugSearch>
                placeholder="ابحث عن دواء (3 أحرف على الأقل)"
                onChange={(term) =>
                  setQueryParams({ ...queryParams, name: term })
                }
                results={drugResults?.data ?? []}
                getOptionLabel={(drug) => drug.tradeName}
                onSelect={(drug) => handleSelectDrug(drug)}
                barcodeComponent={
                  <BarcodeMyDrugs
                    onFindResult={(result) => {
                      handleSelectDrug({
                        pharmacyDrugId: result.id,
                        tradeName: result.tradeName,
                      });
                    }}
                  />
                }
              />
            </Box>

            <Box>
              <Grid container spacing={2}>
                {form.items.map((it, idx) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                    key={`${it.pharmacyDrugId}-${idx}`}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        borderColor: "#d8e4ea",
                        height: "100%",
                        borderRight: `4px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      <CardContent>
                        <Stack spacing={1.5}>
                          <Stack
                            sx={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              bgcolor: "#F8FAFC",
                              py: 1,
                              px: 1.25,
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              sx={{ fontWeight: 800, color: "#334155" }}
                            >
                              {it.tradeName}
                            </Typography>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeItem(idx)}
                            >
                              <DeleteOutlineRounded />
                            </IconButton>
                          </Stack>

                          <CustomTextField
                            label="الكمية (علب)"
                            type="number"
                            value={it.orderedQuantityBoxes}
                            onChange={(value) =>
                              updateItem(idx, {
                                orderedQuantityBoxes: Number(value || 0),
                              })
                            }
                          />

                          <CustomTextField
                            label="ملاحظات للصنف"
                            type="text"
                            value={it.notes || ""}
                            onChange={(value) =>
                              updateItem(idx, { notes: value })
                            }
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

                {form.items.length === 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 5,
                        bgcolor: "#F8FAFC",
                        borderRadius: 2,
                      }}
                    >
                      <Typography color="text.secondary">
                        لا توجد أصناف مضافة بعد.
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Stack
              sx={{
                flexDirection: "row",
                gap: 2,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ borderRadius: 3, px: 3, fontWeight: 700 }}
              >
                إنشاء الطلبية
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  setForm({
                    supplierId: "",
                    supplierName: "",
                    notes: "",
                    items: [],
                  })
                }
                sx={{ borderRadius: 3, px: 3, fontWeight: 700 }}
              >
                مسح
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#EBF8F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#234E46" }} />
          <Typography sx={{ fontSize: 12, color: "#234E46" }}>
            اختيار المورد الصحيح يقلل زمن تنفيذ الطلبية ويزيد الدقة
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#FFF5F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <ErrorOutlined sx={{ color: "#9B2C2C" }} />
          <Typography sx={{ fontSize: 12, color: "#9B2C2C" }}>
            راجع الكميات المطلوبة قبل الإرسال لتجنب أي تعديل لاحق
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#F7FAFC",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#4A5568" }} />
          <Typography sx={{ fontSize: 12, color: "#4A5568" }}>
            يمكنك استخدام الباركود لإضافة الدواء مباشرة إلى الطلبية
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPurchaseOrder;
