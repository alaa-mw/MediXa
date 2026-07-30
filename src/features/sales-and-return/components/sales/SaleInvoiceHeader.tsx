import React, { useState, useMemo } from "react";
import {
  Box,
  Chip,
  Button,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { SaleInvoiceFilters } from "../../hooks/useSaleInvoicesData";
import { FilterButton } from "../../../inventory/components/FilterButton";
import { FilterDropdown } from "./FilterDropdown";
import { AddMedicineButton } from "../../../inventory/components/AddMedicineButton";
import { SearchBar } from "../../../inventory/components/SearchBar";

interface SaleInvoiceHeaderProps {
  onAddInvoiceClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  rawFilters: SaleInvoiceFilters;
  onApplyFilters: (
    filters: Partial<Record<keyof SaleInvoiceFilters, string>>,
  ) => void;
  onClearAllFilters: () => void;
  sx?: SxProps<Theme>;
}

export const SaleInvoiceHeader: React.FC<SaleInvoiceHeaderProps> = ({
  onAddInvoiceClick,
  searchValue,
  onSearchChange,
  rawFilters,
  onApplyFilters,
  onClearAllFilters,
}) => {
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleRemoveSingleFilter = (key: keyof SaleInvoiceFilters) => {
    if (key === "fromDate" || key === "toDate") {
      onApplyFilters({ fromDate: "", toDate: "" });
    } else if (key === "minTotal" || key === "maxTotal") {
      onApplyFilters({ minTotal: "", maxTotal: "" });
    }
    else if (key === "pharmacyDrugId") {
      onApplyFilters({ pharmacyDrugId: "", drugName: "" });}
       else {
      onApplyFilters({ [key]: "" });
    }
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (rawFilters.paymentStatus && rawFilters.paymentStatus !== "ALL") count++;
      if (rawFilters.saleType) count++;
        if (rawFilters.fromDate || rawFilters.toDate) count++;
    if (rawFilters.minTotal || rawFilters.maxTotal) count++;
    if (rawFilters.pharmacyDrugId) count++; 
    return count;
  }, [rawFilters]);

  const statusLabels: Record<string, string> = {
    PENDING: "معلقة",
    PARTIAL: "جزئية",
    PAID: "مدفوعة",
  };
    const saleTypeLabels: Record<string, string> = {
    NORMAL: "بيع طبيعي",
    CUSTOMER_REQUEST: "طلب عميل",
  };

  // 💡 نمط التنسيق المطابق تماماً للصورة المرفقة (هيبة وأناقة متناهية)
  const premiumChipStyles: SxProps<Theme> = {
    bgcolor: "#f5fef5", // الخلفية المعتمدة لديكِ
    color: "#000000", // لون النص
    borderRadius: "100px", // حواف دائرية بالكامل (تصميم الكبسولة)
    height: "37px", // الارتفاع المعتمد لديكِ
    transition: "all 0.2s ease-in-out",
    border: "1px solid #e2e8f0", // 💡 تم تنعيم الـ border بلون خفيف ولطيف بدلاً من اللون الداكن الحاد
    display: "inline-flex",
    alignItems: "center",

    // تحسين الـ padding والمساحة الداخلية للنص
    "& .MuiChip-label": {
      px: "16px",
      display: "flex",
      alignItems: "center",
      height: "100%",
    },

    // 💡 هندسة وتكبير زر الإغلاق (الـ Avatar والأيقونة) ليكون واضحاً ومهيباً
    "& .MuiChip-deleteIcon": {
      color: "#ffffff !important", // لون إشارة الـ X بيضاء ناصعة
      bgcolor: "secondary.main", // لون حاوية الـ Avatar الخلفية
      borderRadius: "50%",
      p: "1px", // 💡 زيادة الـ padding لتكبير حجم الـ Avatar (الدائرة المحيطة)
      fontSize: "20px !important", // 💡 تكبير حجم أيقونة الـ X نفسها لتتناسب مع الـ Avatar الجديد
      ml: "10px !important", // مسافة مريحة متناسقة مع الـ RTL
      mr: "-4px !important",
      opacity: 0.9,
      transition: "transform 0.2s ease, opacity 0.2s",
      "&:hover": {
        opacity: 1,
        transform: "scale(1.5)", // تأثير حركي ناعم عند التمرير فوقه
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 4,
      }}
    >
      {/* سطر البحث والأزرار */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}
      >
        {/* حقل السيرش*/}
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder="ابحث عن اسم المريض أو امسح الباركود" />

        <Box
          sx={
            activeFiltersCount > 0
              ? {
                  "& button, & .MuiButton-root": {
                    borderColor: "primary.main !important",
                    bgcolor: "primary.lighter !important",
                    color: "primary.main !important",
                  },
                }
              : {}
          }
        >
          <FilterButton
            onClick={handleOpenFilter}
            ariaDescribedBy={filterAnchorEl ? "filter-popover" : undefined}
          />
        </Box>

        <FilterDropdown
          anchorEl={filterAnchorEl}
          onClose={handleCloseFilter}
          rawFilters={rawFilters}
          onApplyFilters={onApplyFilters}
        />

        {/* زر إنشاء فاتورة */}
        <AddMedicineButton onClick={onAddInvoiceClick} label="إنشاء فاتورة" />
      </Box>

      {/* قسم الـ Chips الحية المفلترة النظيفة بالألوان المتناسقة الموحدة */}
      {activeFiltersCount > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            flexWrap: "wrap",
           
          }}
        >
          {/*  حالة الدفع */}
          {rawFilters.paymentStatus && rawFilters.paymentStatus !== "ALL" && (
            <Chip
              label={`الحالة: ${statusLabels[rawFilters.paymentStatus] || rawFilters.paymentStatus}`}
              onDelete={() => handleRemoveSingleFilter("paymentStatus")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}


          {/*  حالة الدفع */}
          {rawFilters.saleType && (
            <Chip
              label={`النوع: ${saleTypeLabels[rawFilters.saleType] || rawFilters.saleType}`}
              onDelete={() => handleRemoveSingleFilter("saleType")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}

            
          {/*  المدى الزمني بالتصميم السهمي   */}
          {(rawFilters.fromDate || rawFilters.toDate) && (
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.fromDate || "البداية"}
                  </Typography>
                  <ArrowBackIcon
                    sx={{ fontSize: 14, mx: 0.2, color: "inherit" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.toDate || "اليوم"}
                  </Typography>
                </Box>
              }
              onDelete={() => handleRemoveSingleFilter("fromDate")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}


           {/* 💊  الدواء المحدد */}
          {rawFilters.pharmacyDrugId && (
            <Chip
              label={`الدواء: ${rawFilters.drugName || "دواء محدد"}`}
              onDelete={() => handleRemoveSingleFilter("pharmacyDrugId")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}



          {/*  مدى إجمالي الفاتورة المالي */}
          {(rawFilters.minTotal || rawFilters.maxTotal) && (
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.minTotal
                      ? `${Number(rawFilters.minTotal).toLocaleString()} ل.س`
                      : "0"}
                  </Typography>
                  <ArrowBackIcon
                    sx={{ fontSize: 14, mx: 0.2, color: "inherit" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.maxTotal
                      ? `${Number(rawFilters.maxTotal).toLocaleString()} ل.س`
                      : "∞"}
                  </Typography>
                </Box>
              }
              onDelete={() => handleRemoveSingleFilter("minTotal")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}


          {/* زر مسح الكل */}
          <Button
            variant="text"
            size="small"
            onClick={onClearAllFilters}
            sx={{
              bgcolor: "#f9eaea",
              ml: "auto",
              color: "#dc2626",
              textTransform: "none",
              p: "6px 12px",
              minWidth: "auto",
              borderRadius: "100px",
              border: "1px solid #dc2626",

              "&:hover": {
                bgcolor: "#fbe3e3",
                borderColor: "#b91c1c",
              },
            }}
          >
            مسح الكل
          </Button>


        </Box>
      )}
    </Box>
  );
};
