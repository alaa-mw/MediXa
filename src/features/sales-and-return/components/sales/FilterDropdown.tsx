

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
import { CustomDatePickerField} from "../CustomDatePickerField";
import type { SaleInvoiceFilters } from "../../hooks/useSaleInvoicesData";

interface FilterDropdownProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  rawFilters: SaleInvoiceFilters;
  onApplyFilters: (
    filters: Partial<Record<keyof SaleInvoiceFilters, string>>,
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

  // 💡 نربط الـ local states بالـ rawFilters القادمة حياً من الرابط مباشرة لمنع التضارب
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedSaleType, setSelectedSaleType] = useState<string>("");
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  // التحقق مما إذا كان الحد الأعلى أصغر من الحد الأدنى
  const isError = Boolean(
    minAmount && maxAmount && Number(maxAmount) < Number(minAmount),
  );

  // مزامنة البيانات وتعبئتها داخل الفورم تلقائياً عند قيام المستخدم بفتح الفلتر
  useEffect(() => {
    if (open) {
      setSelectedStatus(
        rawFilters.paymentStatus === "ALL" ? "" : rawFilters.paymentStatus,
      );
      setSelectedUnit(rawFilters.unitType || "");
      setSelectedSaleType(rawFilters.saleType || "");
      setFromDate(rawFilters.fromDate || null);
      setToDate(rawFilters.toDate || null);
      setMinAmount(rawFilters.minTotal || "");
      setMaxAmount(rawFilters.maxTotal || "");
    }
  }, [open, rawFilters]);

  // دالة تجميع الحقول وتمريرها للأعلى لتحديث الـ URL دفعة واحدة
  const handleApplyClick = () => {
    onApplyFilters({
      paymentStatus: selectedStatus || "ALL",
      unitType: selectedUnit || "",
      saleType: selectedSaleType || "",
      fromDate: fromDate || "",
      toDate: toDate || "",
      minTotal: minAmount || "",
      maxTotal: maxAmount || "",
    });
    onClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={( reason) => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#1e293b", fontSize: "18px" }}
        >
          تصفية الفواتير
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            backgroundColor: "#f1f5f9",
            "&:hover": { backgroundColor: "#e2e8f0" },
          }}
        >
          <CloseIcon fontSize="small" sx={{ color: "#64748b" }} />
        </IconButton>
      </Box>

      {/* فلترة حسب حالة الدفع */}
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
          حالة دفع الفاتورة
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "PENDING", label: "معلقة" },
            { key: "PARTIAL", label: "جزئية" },
            { key: "PAID", label: "مدفوعة" },
          ].map((item) => {
            const isSelected = selectedStatus === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setSelectedStatus(isSelected ? "" : item.key)} // ضغطة ثانية تلغي التحديد
                sx={{
                  borderRadius: "20px",
                  px: 2.5,
                  py: 0.5,
                  fontSize: "13px",
                  fontWeight: "500",
                  textTransform: "none",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: isSelected ? "primary.lighter" : "#f8fafc",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* فلترة حسب نوع الوحدة */}
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
                  borderRadius: "20px",
                  px: 2.5,
                  py: 0.5,
                  fontSize: "13px",
                  fontWeight: "500",
                  textTransform: "none",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: isSelected ? "primary.lighter" : "#f8fafc",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* نوع البيع */}
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
          نوع عملية البيع
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { key: "NORMAL", label: "بيع طبيعي" },
            { key: "CUSTOMER_REQUEST", label: "طلب عميل" },
          ].map((item) => {
            const isSelected = selectedSaleType === item.key;
            return (
              <Button
                key={item.key}
                variant="outlined"
                onClick={() => setSelectedSaleType(isSelected ? "" : item.key)}
                sx={{
                  borderRadius: "20px",
                  px: 2.5,
                  py: 0.5,
                  fontSize: "13px",
                  fontWeight: "500",
                  borderColor: isSelected ? "primary.main" : "#e2e8f0",
                  backgroundColor: isSelected ? "primary.lighter" : "#ffffff",
                  color: isSelected ? "primary.main" : "#475569",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: isSelected ? "primary.lighter" : "#f8fafc",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* تصفية المدة الزمنية */}
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
            gap: 1.5,
            width: "100%",
            alignItems: "center",
          }}
        >
          <CustomDatePickerField
            value={fromDate}
            onChange={(date) => {
              setFromDate(date);
              if (date && toDate && date > toDate) setToDate("");
            }}
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
            value={toDate}
            onChange={(date) => setToDate(date)}
            minDate={fromDate || undefined}
          />
        </Box>
      </Box>

      {/* قيمة الإجمالي */}
      <Box sx={{ mb: 4 }}>
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
          قيمة الإجمالي للفاتورة
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="الحد الأدنى"
            type="number"
            size="small"
            fullWidth
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontSize: "13px",
                height: "32px",
              },
            }}
          />
          <TextField
            variant="outlined"
            placeholder="الحد الأعلى"
            type="number"
            size="small"
            fullWidth
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            error={isError}
            helperText={isError ? `يجب اختيار قيمة أعلى من ${minAmount}` : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontSize: "13px",
                height: "32px",
              },
              "& .MuiFormHelperText-root": {
                mx: 0,
                mt: 0.5,
                textAlign: "right",
              },
            }}
          />
        </Box>
      </Box>
      {/* أزرار العمليات للـ Popover */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            flex: 1,
            color: "#64748b",
            borderColor: "#e2e8f0",
            fontWeight: "600",
            fontSize: "13px",
            borderRadius: "8px",
            py: 0.7,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f8fafc",
              borderColor: "#cbd5e1",
              color: "#334155",
            },
          }}
        >
          إلغاء
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={handleApplyClick}
          sx={{
            flex: 1,
            backgroundColor: "primary.main",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "13px",
            borderRadius: "8px",
            py: 0.7,
            textTransform: "none",
          }}
        >
          تطبيق
        </Button>
      </Box>
    </Popover>
  );
};
