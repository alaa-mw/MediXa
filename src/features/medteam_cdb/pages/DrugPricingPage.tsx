import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useMemo, useState } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import type { GeneralDrug, PaginatedData } from "../types/allGeneralDrugType";
import type { DosageForm } from "../types/dosageFormType";
import useGetData from "../../../shared/hooks/useGetData";
import useCreateGeneralDrugPriceList, {
  type GeneralDrugPriceListPayload,
} from "../hook/useCreateGeneralDrugPriceList";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

type PricingDraft = {
  netPrice: string;
  consumerPrice: string;
};

type PricingPayloadItem = {
  generalDrugId: number;
  netPrice?: number;
  consumerPrice?: number;
};

type PricingPayload = GeneralDrugPriceListPayload;

const DrugPricingPage = () => {
  const { showSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [selectedDrugIds, setSelectedDrugIds] = useState<number[]>([]);
  const [priceDrafts, setPriceDrafts] = useState<Record<number, PricingDraft>>(
    {},
  );
  const [savedPayload, setSavedPayload] = useState<PricingPayload | null>(null);
  const {
    submitPriceList,
    isPending,
    isSuccess,
    isError: isSubmitError,
  } = useCreateGeneralDrugPriceList();

  const {
    data: response,
    isLoading,
    isError,
    setQueryParams,
  } = useGetWithParams<PaginatedData<GeneralDrug>>("/general-drugs", {
    page: 1,
    limit: 20,
    searchTerm: "",
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      searchTerm: debouncedSearchTerm.trim(),
    }));
  }, [debouncedSearchTerm, setQueryParams]);

  const paginatedResult = response?.data;
  const drugsList = paginatedResult?.data || [];
  const totalPages = paginatedResult?.pages || 1;
  const totalItems = paginatedResult?.total || 0;

  const payloadPreview = useMemo<PricingPayload>(() => {
    const items = selectedDrugIds
      .map((drugId) => {
        const draft = priceDrafts[drugId];
        const currentItem: PricingPayloadItem = { generalDrugId: drugId };

        if (draft?.netPrice !== undefined && draft.netPrice.trim() !== "") {
          currentItem.netPrice = Number(draft.netPrice);
        }

        if (
          draft?.consumerPrice !== undefined &&
          draft.consumerPrice.trim() !== ""
        ) {
          currentItem.consumerPrice = Number(draft.consumerPrice);
        }

        return Object.keys(currentItem).length > 1 ? currentItem : null;
      })
      .filter(Boolean) as PricingPayloadItem[];

    return { items };
  }, [priceDrafts, selectedDrugIds]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleToggleSelection = (drug: GeneralDrug) => {
    const isSelected = selectedDrugIds.includes(drug.generalDrugId);

    setSelectedDrugIds((prev) =>
      isSelected
        ? prev.filter((id) => id !== drug.generalDrugId)
        : [...prev, drug.generalDrugId],
    );

    setPriceDrafts((prev) => ({
      ...prev,
      [drug.generalDrugId]: {
        netPrice:
          prev[drug.generalDrugId]?.netPrice ?? String(drug.netPrice ?? ""),
        consumerPrice:
          prev[drug.generalDrugId]?.consumerPrice ??
          String(drug.consumerPrice ?? ""),
      },
    }));
  };

  const handlePriceChange = (
    generalDrugId: number,
    field: keyof PricingDraft,
    value: string,
  ) => {
    setPriceDrafts((prev) => ({
      ...prev,
      [generalDrugId]: {
        netPrice: prev[generalDrugId]?.netPrice ?? "",
        consumerPrice: prev[generalDrugId]?.consumerPrice ?? "",
        [field]: value,
      },
    }));
  };

  const handleSavePricing = () => {
    const payload: PricingPayload = {
      items: selectedDrugIds
        .map((drugId) => {
          const draft = priceDrafts[drugId];
          const item: PricingPayloadItem = { generalDrugId: drugId };

          if (draft?.netPrice && draft.netPrice.trim() !== "") {
            item.netPrice = Number(draft.netPrice);
          }

          if (draft?.consumerPrice && draft.consumerPrice.trim() !== "") {
            item.consumerPrice = Number(draft.consumerPrice);
          }

          return Object.keys(item).length > 1 ? item : null;
        })
        .filter(Boolean) as PricingPayloadItem[],
    };

    setSavedPayload(payload);
    submitPriceList(payload, {
      onSuccess: (response) => {
        showSnackbar("تم تحديث قائمة الأسعار بنجاح", "success");
        console.log("Price list created successfully:", response);
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
        console.error("Price list creation failed:", error);
      },
    });
  };

  return (
    <Box>
      <Box>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#0F172A" }}
            >
              تسعير الأدوية
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              اختر الأدوية ثم حدّث سعر النت وسعر المستهلك قبل حفظ التسعير
            </Typography>
          </Box>

          <Card
            sx={{
              p: "8px 16px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
              border: "1px solid #3d9197",
              backgroundColor: "transparent",
              direction: "rtl",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              height: "80px",
              minHeight: "unset",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                }}
              >
                إجمالي الأدوية
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#3d9197",
                  fontFamily: "sans-serif",
                  fontSize: "1.6rem",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                {totalItems}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                دواء في القاعدة المركزية
              </Typography>
            </Box>
          </Card>
        </Stack>

        <Box
          sx={{
            mb: 3,
            maxWidth: "35%",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم الدواء أو الباركود"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              backgroundColor: "#fff",
              border: "0.5px solid #eaebec",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSavePricing}
            disabled={selectedDrugIds.length === 0 || isPending}
            sx={{
              backgroundColor: "#3d9197",
              borderRadius: 2,
              px: 3,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#2d7479" },
            }}
          >
            {isPending ? "جارٍ حفظ التسعير..." : "حفظ التسعير"}
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ display: "flex", gap: 3 }}>
          <Grid sx={{ flex: 3 }}>
            <Paper
              elevation={0}
              sx={{ border: "1px solid #E2E8F0", borderRadius: "8px" }}
            >
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
                    gridTemplateColumns: "0.8fr 1.8fr 2.5fr 1.8fr 1.6fr 1.6fr",
                    p: 1.5,
                    bgcolor: "#F8FAFC",
                    borderBottom: "1px solid #E2E8F0",
                    fontWeight: 700,
                    fontSize: 15,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box>تحديد</Box>
                  <Box sx={{ textAlign: "right", pr: 1 }}>الباركود</Box>
                  <Box>الاسم التجاري</Box>
                  <Box>الشكل الدوائي</Box>
                  <Box>سعر النت</Box>
                  <Box>سعر المستهلك</Box>
                </Box>

                {isLoading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 5 }}
                  >
                    <Typography color="text.secondary">
                      جاري تحميل الأدوية...
                    </Typography>
                  </Box>
                ) : isError ? (
                  <Box sx={{ textAlign: "center", py: 5 }}>
                    <Typography color="error">
                      حدث خطأ أثناء جلب الأدوية
                    </Typography>
                  </Box>
                ) : drugsList.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 5 }}>
                    <Typography color="text.secondary">
                      لا توجد أدوية مضافة حالياً
                    </Typography>
                  </Box>
                ) : (
                  drugsList.map((drug) => {
                    const isSelected = selectedDrugIds.includes(
                      drug.generalDrugId,
                    );
                    const draft = priceDrafts[drug.generalDrugId] ?? {
                      netPrice: String(drug.netPrice ?? ""),
                      consumerPrice: String(drug.consumerPrice ?? ""),
                    };

                    return (
                      <Box
                        key={drug.generalDrugId}
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            "0.8fr 1.8fr 2.5fr 1.8fr 1.6fr 1.6fr",
                          p: 1.5,
                          borderTop: "1px solid #E2E8F0",
                          alignItems: "center",
                          textAlign: "center",
                          backgroundColor: isSelected ? "#F8FAFC" : "#fff",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleToggleSelection(drug)}
                            sx={{
                              color: "#3d9197",
                              "&.Mui-checked": { color: "#3d9197" },
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            textAlign: "right",
                            color: "#475569",
                            fontWeight: 500,
                            fontSize: 16,
                            pr: 1,
                          }}
                        >
                          {drug.barcode}
                        </Box>

                        <Box sx={{ fontWeight: 700, color: "#1E293B" }}>
                          {drug.tradeName}
                        </Box>

                        <DosageFormCell dosageFormId={drug.dosageFormId} />

                        <Box sx={{ px: 1 }}>
                          {isSelected ? (
                            <TextField
                              value={draft.netPrice}
                              onChange={(e) =>
                                handlePriceChange(
                                  drug.generalDrugId,
                                  "netPrice",
                                  e.target.value,
                                )
                              }
                              size="small"
                              fullWidth
                              slotProps={{
                                input: {
                                  inputMode: "numeric",
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{ fontWeight: 500, color: "#334155" }}
                            >
                              {drug.netPrice} ل.س
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ px: 1 }}>
                          {isSelected ? (
                            <TextField
                              value={draft.consumerPrice}
                              onChange={(e) =>
                                handlePriceChange(
                                  drug.generalDrugId,
                                  "consumerPrice",
                                  e.target.value,
                                )
                              }
                              size="small"
                              fullWidth
                              slotProps={{
                                input: {
                                  inputMode: "numeric",
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{ fontWeight: 500, color: "#334155" }}
                            >
                              {drug.consumerPrice} ل.س
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              {totalPages > 1 && (
                <Pagination
                  page={paginatedResult?.page || 1}
                  count={totalPages}
                  color="primary"
                  onChange={handlePageChange}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {isSubmitError && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">
            فشل حفظ قائمة الأسعار، يرجى المحاولة مرة أخرى.
          </Typography>
        </Box>
      )}

      {isSuccess && savedPayload && (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: "#15803d", fontWeight: 600 }}>
            تم حفظ قائمة الأسعار بنجاح
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const DosageFormCell = ({ dosageFormId }: { dosageFormId: number }) => {
  const { data } = useGetData<DosageForm>(`/dosage-forms/${dosageFormId}`);

  return (
    <Box sx={{ fontWeight: 600, color: "#1E293B" }}>
      {data?.data?.dosageFormName || "-"}
    </Box>
  );
};

export default DrugPricingPage;
