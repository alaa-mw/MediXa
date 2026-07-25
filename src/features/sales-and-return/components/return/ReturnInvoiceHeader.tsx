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
import { FilterButton } from "../../../inventory/components/FilterButton";
import { SearchBar } from "../../../inventory/components/SearchBar";
import type { ReturnInvoiceFilters } from "../../types/returnInvoice";
import { FilterDropdown } from "./FilterDropdownReturn";

interface ReturnInvoiceHeaderProps {
  onAddReturnClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  rawFilters: ReturnInvoiceFilters;
  onApplyFilters: (
    filters: Partial<Record<keyof ReturnInvoiceFilters, string>>,
  ) => void;
  onClearAllFilters: () => void;
  sx?: SxProps<Theme>;
}

export const ReturnInvoiceHeader: React.FC<ReturnInvoiceHeaderProps> = ({
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

  const handleRemoveSingleFilter = (key: keyof ReturnInvoiceFilters) => {
    if (key === "fromDate" || key === "toDate") {
      onApplyFilters({ fromDate: "", toDate: "" });
    } else if (key === "minRefund" || key === "maxRefund") {
      onApplyFilters({ minRefund: "", maxRefund: "" });
    } else {
      onApplyFilters({ [key]: "" });
    }
  };

  // احتساب الفلاتر الفعالة للمرتجعات (بدون الـ IDs)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (rawFilters.invoiceStatus && rawFilters.invoiceStatus !== "ALL") count++;
    if (rawFilters.unitType) count++;
    if (rawFilters.returnReason) count++;
    if (rawFilters.restockToInventory !== "") count++;
    if (rawFilters.fromDate || rawFilters.toDate) count++;
    if (rawFilters.minRefund || rawFilters.maxRefund) count++;
    return count;
  }, [rawFilters]);

  // القواميس النصية للـ Chips المترجمة للمرتجعات
//   const statusLabels: Record<string, string> = {
//     DRAFT: "مسودة",
//     POSTED: "مثبتة",
//     CANCELLED: "ملغاة",
//   };
  
  const unitLabels: Record<string, string> = {
    BOX: "علبة",
    STRIP: "ظرف",
    TABLET: "حبة",
  };

  const reasonLabels: Record<string, string> = {
    CUSTOMER_CHANGED_MIND: "تغيير رأي الزبون",
    EXPIRED_DISCARD: "منتهي / إتلاف",
    DAMAGED_GOODS: "بضاعة تالفة",
  };

  // نفس الستايل المهيب والأنيق المعتمد لديكِ
  const premiumChipStyles: SxProps<Theme> = {
    bgcolor: "#f5fef5",
    color: "#000000",
    borderRadius: "100px",
    height: "37px",
    transition: "all 0.2s ease-in-out",
    border: "1px solid #e2e8f0",
    display: "inline-flex",
    alignItems: "center",

    "& .MuiChip-label": {
      px: "16px",
      display: "flex",
      alignItems: "center",
      height: "100%",
    },

    "& .MuiChip-deleteIcon": {
      color: "#ffffff !important",
      bgcolor: "secondary.main",
      borderRadius: "50%",
      p: "1px",
      fontSize: "20px !important",
      ml: "10px !important",
      mr: "-4px !important",
      opacity: 0.9,
      transition: "transform 0.2s ease, opacity 0.2s",
      "&:hover": {
        opacity: 1,
        transform: "scale(1.5)",
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
        <SearchBar value={searchValue} onChange={onSearchChange} />

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

      </Box>

      {/* قسم الـ Chips الحية للمرتجعات */}
      {activeFiltersCount > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            flexWrap: "wrap",
          }}
        >
          {/* Chip حالة الفاتورة */}
          {/* {rawFilters.invoiceStatus && rawFilters.invoiceStatus !== "ALL" && (
            <Chip
              label={`الحالة: ${statusLabels[rawFilters.invoiceStatus] || rawFilters.invoiceStatus}`}
              onDelete={() => handleRemoveSingleFilter("invoiceStatus")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )} */}

          {/* Chip نوع الوحدة */}
          {rawFilters.unitType && (
            <Chip
              label={`الوحدة: ${unitLabels[rawFilters.unitType] || rawFilters.unitType}`}
              onDelete={() => handleRemoveSingleFilter("unitType")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}

          {/* Chip سبب المرتجع */}
          {rawFilters.returnReason && (
            <Chip
              label={`السبب: ${reasonLabels[rawFilters.returnReason] || rawFilters.returnReason}`}
              onDelete={() => handleRemoveSingleFilter("returnReason")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}

          {/* Chip إعادة التذخير للمخزن */}
          {rawFilters.restockToInventory !== "" && (
            <Chip
              label={`إعادة للمخزن: ${rawFilters.restockToInventory === "true" ? "نعم" : "لا"}`}
              onDelete={() => handleRemoveSingleFilter("restockToInventory")}
              deleteIcon={<CloseIcon />}
              sx={premiumChipStyles}
            />
          )}

          {/* Chip المدى الزمني */}
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

          {/* Chip مدى المبلع المرتجع ماليًا */}
          {(rawFilters.minRefund || rawFilters.maxRefund) && (
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.minRefund
                      ? `${Number(rawFilters.minRefund).toLocaleString()} ل.س`
                      : "0"}
                  </Typography>
                  <ArrowBackIcon
                    sx={{ fontSize: 14, mx: 0.2, color: "inherit" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "inherit", fontSize: "14px" }}
                  >
                    {rawFilters.maxRefund
                      ? `${Number(rawFilters.maxRefund).toLocaleString()} ل.س`
                      : "∞"}
                  </Typography>
                </Box>
              }
              onDelete={() => handleRemoveSingleFilter("minRefund")}
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