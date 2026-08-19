import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  useActiveIngredientSearch,
  useSearchDrugsByIngredients,
} from "../../hooks/useActiveIngredientSearch";
import { AlternativeDrugCard } from "./AlternativeDrugCard";
import type { PharmacyDrug, ActiveIngredient } from "../../types/drug";
import { useSaleInvoice } from "../../hooks/useSaleInvoice";

interface Props {
  debouncedSearchTerm: string;
  onClearSearchText: () => void;
  onCloseDropdown: () => void;
  onSelectionChange: (hasIngredients: boolean) => void;
}

type InvoiceDrugMetadata = {
  dosageFormName?: string;
  dosageForm?: {
    dosageFormName?: string;
  };
  requiresPrescription?: boolean;
};

export const ActiveIngredientSearchContent = ({
  debouncedSearchTerm,
  onClearSearchText,
  onCloseDropdown,
  onSelectionChange,
}: Props) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<
    ActiveIngredient[]
  >([]);
  const [selectedDrugs, setSelectedDrugs] = useState<PharmacyDrug[]>([]);
  const [isAddingToInvoice, setIsAddingToInvoice] = useState(false);

  useEffect(() => {
    onSelectionChange(selectedIngredients.length > 0);
  }, [selectedIngredients.length, onSelectionChange]);

  const {
    allResults,
    isLoading: isIngredientsLoading,
    hasMore,
    loadMore,
  } = useActiveIngredientSearch(debouncedSearchTerm);

  // استخراج addDrug من actions
  const {
    actions: { addDrug },
  } = useSaleInvoice();

  const selectedIngredientIds = selectedIngredients.map((i) => i.ingredientId);
  const { data: drugsResponse, isLoading: isDrugsLoading } =
    useSearchDrugsByIngredients(selectedIngredientIds);

  const drugsList = (drugsResponse?.data as unknown as PharmacyDrug[]) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const isTyping = debouncedSearchTerm.trim().length > 0;
  const hasSelectedIngredients = selectedIngredients.length > 0;

  const handleSelectIngredient = (ingredient: ActiveIngredient) => {
    if (
      !selectedIngredients.some(
        (i) => i.ingredientId === ingredient.ingredientId,
      )
    ) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
      setSelectedDrugs([]);
    }
    onClearSearchText();
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    const updatedIngredients = selectedIngredients.filter(
      (i) => i.ingredientId !== ingredientId,
    );
    setSelectedIngredients(updatedIngredients);
    setSelectedDrugs([]);
  };

  // إضافة الأدوية المحددة بالتوازي بدلاً من التسلسل
  const handleAddSelectedToInvoice = async () => {
    if (isAddingToInvoice || selectedDrugs.length === 0) return;

    setIsAddingToInvoice(true);
    try {
      await Promise.all(
        selectedDrugs.map((drug) => {
          const metadata = drug as PharmacyDrug & InvoiceDrugMetadata;

          return addDrug(drug.pharmacyDrugId, {
            tradeName: drug.tradeName,
            dosageFormName:
              metadata.dosageFormName || metadata.dosageForm?.dosageFormName,
            requiresPrescription: metadata.requiresPrescription,
          });
        }),
      );
      onCloseDropdown();
    } finally {
      setIsAddingToInvoice(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "70vh",
      }}
    >
      {/* شريط الأقراص المحددة (Chips) للمواد الفعالة */}
      {hasSelectedIngredients && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            borderBottom: "1px solid #e2e8f0",
            bgcolor: "#f8fafc",
          }}
        >
          {selectedIngredients.map((ingredient) => (
            <Chip
              key={ingredient.ingredientId}
              label={ingredient.ingredientName}
              onDelete={() => handleRemoveIngredient(ingredient.ingredientId)}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, bgcolor: "white" }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {isTyping ? (
          <Box>
            {isIngredientsLoading && allResults.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress size={24} />
              </Box>
            ) : allResults.length > 0 ? (
              allResults.map((ingredient) => (
                <Box
                  key={ingredient.ingredientId}
                  onClick={() => handleSelectIngredient(ingredient)}
                  sx={{
                    p: 1.5,
                    cursor: "pointer",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: "#f1f5f9" },
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {ingredient.ingredientName}
                  </Typography>
                </Box>
              ))
            ) : (
              !isIngredientsLoading && (
                <Typography
                  sx={{ p: 2, textAlign: "center", color: "#64748b" }}
                >
                  لا توجد نتائج
                </Typography>
              )
            )}
            {hasMore && (
              <Box
                ref={observerTarget}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 2,
                  height: "40px",
                }}
              >
                {isIngredientsLoading && <CircularProgress size={20} />}
              </Box>
            )}
          </Box>
        ) : hasSelectedIngredients ? (
          <Box sx={{ p: 1 }}>
            {isDrugsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <>
                <Divider
                  textAlign="left"
                  sx={{ "&::before": { display: "none" }, mb: 1.5 }}
                >
                  <Chip
                    label="الأدوية المطابقة للتركيبة"
                    size="small"
                    sx={{
                      bgcolor: "#f1f5f9",
                      color: "#64748b",
                      fontWeight: 600,
                    }}
                  />
                </Divider>

                {drugsList.length > 0 ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 1.5,
                    }}
                  >
                    {drugsList.map((drug, index) => (
                      <Box
                        key={drug.pharmacyDrugId}
                        sx={{
                          gridColumn:
                            drugsList.length % 2 !== 0 &&
                            index === drugsList.length - 1
                              ? "span 2"
                              : "span 1",
                        }}
                      >
                        <AlternativeDrugCard
                          drug={drug}
                          isSelected={selectedDrugs.some(
                            (d) => d.pharmacyDrugId === drug.pharmacyDrugId,
                          )}
                          onToggle={(d) => {
                            setSelectedDrugs((prev) =>
                              prev.some(
                                (item) =>
                                  item.pharmacyDrugId === d.pharmacyDrugId,
                              )
                                ? prev.filter(
                                    (item) =>
                                      item.pharmacyDrugId !== d.pharmacyDrugId,
                                  )
                                : [...prev, d],
                            );
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: "center",
                      bgcolor: "#f8fafc",
                      borderRadius: "12px",
                      border: "1px dashed #cbd5e1",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      لا توجد أدوية متاحة لهذه التركيبة
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        ) : (
          <Typography
            sx={{ p: 2, textAlign: "center", color: "#64748b", mt: 2 }}
          >
            ابحث عن المادة الفعالة...
          </Typography>
        )}
      </Box>

      {/* زر الإضافة الثابت في الأسفل */}
      {hasSelectedIngredients &&
        selectedDrugs.length > 0 &&
        !isDrugsLoading && (
          <Box sx={{ p: 2, borderTop: "1px solid #e2e8f0", bgcolor: "#fff" }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAddSelectedToInvoice}
              disabled={isAddingToInvoice}
              sx={{ borderRadius: "12px", py: 1.5, fontWeight: 700 }}
            >
              {isAddingToInvoice
                ? "جاري الإضافة..."
                : `إضافة (${selectedDrugs.length}) إلى الفاتورة`}
            </Button>
          </Box>
        )}
    </Box>
  );
};
