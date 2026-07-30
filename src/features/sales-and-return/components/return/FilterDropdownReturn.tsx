import React, { useState, useEffect } from "react";
import {
  Popover,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDatePickerField } from "../../../../shared/components/FiltterDatePicker";
import type { ReturnInvoiceFilters } from "../../types/returnInvoice";

interface FilterDropdownProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  rawFilters: ReturnInvoiceFilters;
  onApplyFilters: (
    filters: Partial<Record<keyof ReturnInvoiceFilters, string>>,
  ) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  anchorEl,
  onClose,
  rawFilters,
  onApplyFilters,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  // 💡 الحالات المحلية مطابقة تماماً لمعاملات المرتجع وبدون أي مظهر للـ Ids
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [restockToInventory, setRestockToInventory] = useState<string>("");
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [minRefund, setMinRefund] = useState<string>("");
  const [maxRefund, setMaxRefund] = useState<string>("");

  // التحقق من منطقية النطاق المالي للمرتجع
  const isError = Boolean(
    minRefund && maxRefund && Number(maxRefund) < Number(minRefund),
  );

  // مزامنة البيانات وتعبئتها داخل الفورم تلقائياً عند فتح الفلتر من الـ URL
  useEffect(() => {
    if (open) {
      setSelectedStatus(
        rawFilters.invoiceStatus === "ALL" ? "" : rawFilters.invoiceStatus || "",
      );
      setSelectedUnit(rawFilters.unitType || "");
      setSelectedReason(rawFilters.returnReason || "");
      setRestockToInventory(rawFilters.restockToInventory ?? "");
      setFromDate(rawFilters.fromDate || null);
      setToDate(rawFilters.toDate || null);
      setMinRefund(rawFilters.minRefund || "");
      setMaxRefund(rawFilters.maxRefund || "");
    }
  }, [open, rawFilters]);

  // دالة تجميع الحقول وتمريرها للأعلى لتحديث الـ URL دفعة واحدة
  const handleApplyClick = () => {
    onApplyFilters({
      invoiceStatus: selectedStatus || "ALL",
      unitType: selectedUnit || "",
      returnReason: selectedReason || "",
      restockToInventory: restockToInventory,
      fromDate: fromDate || "",
      toDate: toDate || "",
      minRefund: minRefund || "",
      maxRefund: maxRefund || "",
    });
    onClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={(_e, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          sx: {
            width: "360px",
            borderRadius: "16px",
            boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.08)",
            p: 3,
            mt: 1,
            direction: "rtl",
            fontFamily: "inherit",
          },
        },
      }}
    >
      {/* الرأس */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e293b", fontSize: "18px" }}>
          تصفية المرتجعات
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ backgroundColor: "#f1f5f9", "&:hover": { backgroundColor: "#e2e8f0" } }}
        >
          <CloseIcon fontSize="small" sx={{ color: "#64748b" }} />
        </IconButton>
      </Box>

      {/* 1. فلترة حسب حالة الفاتورة المرجوعة */}
      {/* <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          حالة فاتورة المرتجع
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "DRAFT", label: "مسودة" },
            { key: "POSTED", label: "مثبتة" },
            { key: "CANCELLED", label: "ملغاة" },
          ].map((item) => {
            const isSelected = selectedStatus === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setSelectedStatus(isSelected ? "" : item.key)}
                sx={{
                  borderRadius: "20px", px: 2.5, py: 0.5, fontSize: "13px", fontWeight: "500", textTransform: "none",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": { borderColor: "primary.main", backgroundColor: isSelected ? "primary.lighter" : "#f8fafc" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box> */}

      {/* 2. فلترة حسب نوع الوحدة */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          فلترة حسب نوع الوحدة
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "BOX", label: "علبة" },
            { key: "STRIP", label: "ظرف" },
            { key: "TABLET", label: "حبة" },
          ].map((item) => {
            const isSelected = selectedUnit === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setSelectedUnit(isSelected ? "" : item.key)}
                sx={{
                  borderRadius: "20px", px: 2.5, py: 0.5, fontSize: "13px", fontWeight: "500", textTransform: "none",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": { borderColor: "primary.main", backgroundColor: isSelected ? "primary.lighter" : "#f8fafc" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* 3. فلترة حسب سبب الإرجاع */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          سبب الارتجاع
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "CUSTOMER_CHANGED_MIND", label: "تغيير رأي الزبون" },
            { key: "EXPIRED_DISCARD", label: "منتهي / إتلاف" },
            { key: "DAMAGED_GOODS", label: "بضاعة تالفة" },
          ].map((item) => {
            const isSelected = selectedReason === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setSelectedReason(isSelected ? "" : item.key)}
                sx={{
                  borderRadius: "20px", px: 2, py: 0.5, fontSize: "13px", fontWeight: "500",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": { borderColor: "primary.main", backgroundColor: isSelected ? "primary.lighter" : "#f8fafc" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* 4. فلترة حسب إعادة التذخير للمخزن */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          إعادة تذخير للمخزن؟
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "true", label: "نعم (تمت الإعادة)" },
            { key: "false", label: "لا (إتلاف)" },
          ].map((item) => {
            const isSelected = restockToInventory === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setRestockToInventory(isSelected ? "" : item.key)}
                sx={{
                  borderRadius: "20px", px: 2.5, py: 0.5, fontSize: "13px", fontWeight: "500",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": { borderColor: "primary.main", backgroundColor: isSelected ? "primary.lighter" : "#f8fafc" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* 5. تصفية المدة الزمنية للمرتجع */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          تصفية المدة الزمنية للمرتجع
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, width: "100%", alignItems: "center" }}>
          <CustomDatePickerField
            value={fromDate}
            onChange={(date) => {
              setFromDate(date);
              if (date && toDate && date > toDate) setToDate("");
            }}
          />
          <Typography sx={{ color: "#64748b", fontSize: "13px", fontWeight: "500", whiteSpace: "nowrap" }}>
            إلى
          </Typography>
          <CustomDatePickerField
            value={toDate}
            onChange={(date) => setToDate(date)}
            minDate={fromDate || undefined}
          />
        </Box>
      </Box>

      {/* 6. قيمة مبلغ الارتجاع (Refund Amount) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: "600", mb: 1.5, fontSize: "12px" }}>
          قيمة المبلغ المعاد للمريض
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, width: "100%", alignItems: "flex-start" }}>
          <TextField
            variant="outlined"
            placeholder="الحد الأدنى"
            type="number"
            size="small"
            fullWidth
            value={minRefund}
            onChange={(e) => setMinRefund(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", height: "32px" } }}
          />
          <TextField
            variant="outlined"
            placeholder="الحد الأعلى"
            type="number"
            size="small"
            fullWidth
            value={maxRefund}
            onChange={(e) => setMaxRefund(e.target.value)}
            error={isError}
            helperText={isError ? `يجب اختيار قيمة أعلى من ${minRefund}` : ""}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", height: "32px" },
              "& .MuiFormHelperText-root": { mx: 0, mt: 0.5, textAlign: "right" },
            }}
          />
        </Box>
      </Box>

      {/* أزرار العمليات التفاعلية السفلية */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            flex: 1, color: "#64748b", borderColor: "#e2e8f0", fontWeight: "600", fontSize: "13px", borderRadius: "8px", py: 0.7, textTransform: "none",
            "&:hover": { backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#334155" },
          }}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleApplyClick}
          sx={{ flex: 1, backgroundColor: "primary.main", color: "#ffffff", fontWeight: "600", fontSize: "13px", borderRadius: "8px", py: 0.7, textTransform: "none" }}
        >
          تطبيق
        </Button>
      </Box>
    </Popover>
  );
};