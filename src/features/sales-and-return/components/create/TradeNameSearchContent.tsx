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
  useTradeDrugSearch,
  useDrugAlternatives,
} from "../../hooks/useTradeNameSearch";
import useGetData from "../../../../shared/hooks/useGetData";
import { AlternativeDrugCard } from "./AlternativeDrugCard";
import type { PharmacyDrug } from "../../types/drug";
import { useSaleInvoice } from "../../hooks/useSaleInvoice";

interface Props {
  debouncedSearchTerm: string;
  userTypingSignal: number;
  onDrugSelectedUpdateText: (name: string) => void;
  onCloseDropdown: () => void;
}

type InvoiceDrugMetadata = {
  dosageFormName?: string;
  dosageForm?: {
    dosageFormName?: string;
  };
  requiresPrescription?: boolean;
};

type SimilarNameDrug = {
  pharmacyDrugId: number;
  tradeName: string;
};

export const TradeNameSearchContent = ({
  debouncedSearchTerm,
  userTypingSignal,
  onDrugSelectedUpdateText,
  onCloseDropdown,
}: Props) => {
  const [selectedDrugId, setSelectedDrugId] = useState<number | null>(null);
  const [selectedDrugName, setSelectedDrugName] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState<PharmacyDrug[]>([]);
  const [isAddingToInvoice, setIsAddingToInvoice] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // استخراج الدالة من كائن actions الخاص بالـ Facade Hook
  const {
    actions: { addDrug },
  } = useSaleInvoice();

  // تصفير الاختيارات عند تغيير مدخلات البحث
  useEffect(() => {
    setSelectedDrugId(null);
    setSelectedDrugName("");
    setSelectedDrugs([]);
  }, [userTypingSignal]);

  const { allResults, isLoading, isFetching, hasMore, loadMore } =
    useTradeDrugSearch(debouncedSearchTerm);
  const { data: alternativesData, isLoading: isAlternativesLoading } =
    useDrugAlternatives(selectedDrugId);

  const trimmedSelectedDrugName = selectedDrugName.trim();
  const lasaEndpoint =
    selectedDrugId && trimmedSelectedDrugName.length >= 3
      ? `/pharmacy-drugs/search-my-drugs/similar-names?name=${encodeURIComponent(trimmedSelectedDrugName)}`
      : "";

  const { data: lasaResponse } = useGetData<SimilarNameDrug[]>(lasaEndpoint);

  const lasaSuggestions =
    lasaResponse?.data?.filter(
      (item) =>
        item.tradeName.trim().toLowerCase() !==
        trimmedSelectedDrugName.toLowerCase(),
    ) || [];

  // منطق التحديد (Toggle Selection)
  const toggleDrugSelection = (drug: PharmacyDrug) => {
    setSelectedDrugs((prev) => {
      const isSelected = prev.some(
        (d) => d.pharmacyDrugId === drug.pharmacyDrugId,
      );
      if (isSelected) {
        return prev.filter((d) => d.pharmacyDrugId !== drug.pharmacyDrugId);
      }
      return [...prev, drug];
    });
  };

  // إضافة الأدوية للفاتورة بالتوازي
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

  // Intersection Observer للتمرير اللانهائي
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 },
    );
    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasMore, isFetching, loadMore]);

  const handleSelectTargetDrug = (drugId: number, drugName: string) => {
    setSelectedDrugId(drugId);
    setSelectedDrugName(drugName);
    onDrugSelectedUpdateText(drugName);
  };

  // 1. جاري تحميل البدائل
  if (selectedDrugId && isAlternativesLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  // 2. عرض الدواء المطلوب والبدائل
  if (selectedDrugId && alternativesData?.data) {
    const { targetDrug, alternatives } = alternativesData.data;
    const hasAlternatives = alternatives && alternatives.items.length > 0;
    const isTargetOutOfStock =
      !targetDrug.stock?.isAvailable ||
      targetDrug.stock?.availableBaseQuantity <= 0;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "70vh",
        }}
      >
        {/* منطقة المحتوى القابل للتمرير */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
          {lasaSuggestions.length > 0 && (
            <>
              <Divider
                textAlign="left"
                sx={{ "&::before": { display: "none" }, mb: 1.5 }}
              >
                <Chip
                  label="أسماء أدوية مشابهة !"
                  size="small"
                  sx={{ bgcolor: "#f1f5f9", color: "#64748b", fontWeight: 600 }}
                />
              </Divider>

              <Box
                sx={{
                  p: 1.5,
                  mb: 2,
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                  {lasaSuggestions.map((item) => item.tradeName).join(", ")}
                </Typography>
              </Box>
            </>
          )}

          <Divider
            textAlign="left"
            sx={{ "&::before": { display: "none" }, mb: 1.5 }}
          >
            <Chip
              label="الدواء المطلوب"
              size="small"
              sx={{ bgcolor: "#f1f5f9", color: "#64748b", fontWeight: 600 }}
            />
          </Divider>

          <AlternativeDrugCard
            drug={targetDrug}
            onToggle={toggleDrugSelection}
            isSelected={selectedDrugs.some(
              (d) => d.pharmacyDrugId === targetDrug.pharmacyDrugId,
            )}
            isTarget={true}
          />

          {/* رسائل التنبيه في حال عدم توفر الدواء المطلوب */}
          {isTargetOutOfStock && hasAlternatives && (
            <Typography
              variant="caption"
              sx={{
                color: "#e59797",
                textAlign: "center",
                display: "block",
                mb: 1,
              }}
            >
              الدواء المطلوب غير متوفر .
            </Typography>
          )}
          {isTargetOutOfStock && !hasAlternatives && (
            <Typography
              variant="caption"
              sx={{
                color: "#e59797",
                textAlign: "center",
                display: "block",
                mb: 1,
              }}
            >
              الدواء المطلوب غير متوفر، ولا يوجد له بدائل حالياً.
            </Typography>
          )}

          <Divider
            textAlign="left"
            sx={{ "&::before": { display: "none" }, my: 2 }}
          >
            <Chip
              label="البدائل المتاحة"
              size="small"
              sx={{ bgcolor: "#f1f5f9", color: "#64748b", fontWeight: 600 }}
            />
          </Divider>

          {hasAlternatives ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1.5,
              }}
            >
              {alternatives.items.map((alt, index) => (
                <Box
                  key={alt.pharmacyDrugId}
                  sx={{
                    gridColumn:
                      alternatives.items.length % 2 !== 0 &&
                      index === alternatives.items.length - 1
                        ? "span 2"
                        : "span 1",
                  }}
                >
                  <AlternativeDrugCard
                    drug={alt}
                    onToggle={toggleDrugSelection}
                    isSelected={selectedDrugs.some(
                      (d) => d.pharmacyDrugId === alt.pharmacyDrugId,
                    )}
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
                لا توجد بدائل متاحة لهذا الدواء
              </Typography>
            </Box>
          )}
        </Box>

        {/* زر الإضافة الثابت في الأسفل يظهر فقط عند تحديد عناصر */}
        {selectedDrugs.length > 0 && (
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
  }

  // 3. عرض نتائج البحث المبدئية
  return (
    <>
      {isLoading && allResults.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress size={24} />
        </Box>
      ) : allResults.length > 0 ? (
        <Box sx={{ flex: 1 }}>
          {allResults.map((drug, index) => (
            <Box
              key={`${drug.pharmacyDrugId}-${index}`}
              onClick={() =>
                handleSelectTargetDrug(drug.pharmacyDrugId, drug.tradeName)
              }
              sx={{
                p: 1.5,
                cursor: "pointer",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{drug.tradeName}</Typography>
            </Box>
          ))}

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
              {isFetching && <CircularProgress size={20} />}
            </Box>
          )}
        </Box>
      ) : (
        !isLoading && (
          <Typography sx={{ p: 2, textAlign: "center", color: "#64748b" }}>
            لا توجد نتائج
          </Typography>
        )
      )}
    </>
  );
};
