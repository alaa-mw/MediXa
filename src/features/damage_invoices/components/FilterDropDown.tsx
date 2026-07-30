import { Button, Popover, Box, Typography, IconButton } from "@mui/material";
import type { PharmacyInvoiceStatus } from "../types/enums";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDatePickerField } from "../../../shared/components/FiltterDatePicker";

interface FilterValues {
  status: PharmacyInvoiceStatus;
  fromDate: string;
  toDate: string;
}

interface FilterDialogProps {
  // open: boolean;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onApply: () => void;
  onClose?: () => void;
  anchorEl?: HTMLButtonElement | null;
}
const InvoiceStatuses: { value: PharmacyInvoiceStatus  | ""; label: string }[] =
  [ 
    { value: "DRAFT", label: "مسودة" },
    { value: "POSTED", label: "مكتملة" },
    { value: "CANCELLED", label: "ملغاة" },
    { value: "", label: "❌" }, // "جميع حالات الفواتير"
  ];

const FilterDropDown = ({
  // open,
  filters,
  onChange,
  onApply,
  onClose,
  anchorEl,
}: FilterDialogProps) => {
  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  const handleChange = (field: keyof FilterValues, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={(reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        // onClose && onClose();
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
        {onClose && (
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
        )}
      </Box>
      {/* حالة الفاتورة */}
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
          حالة الفاتورة
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {InvoiceStatuses.map((s) => {
            const isSelected = filters.status === s.value;
            return (
              <Button
                key={s.label}
                variant="outlined"
                onClick={() =>
                  handleChange("status", isSelected ? "" : s.value)
                }
                sx={{
                  borderRadius: "20px",
                  px: 1.7,
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
                {s.label}
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
            // label="من تاريخ"
            value={filters.fromDate}
            onChange={(value) => handleChange("fromDate", value)}
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
            value={filters.toDate}
            onChange={(value) => handleChange("toDate", value)}
            minDate={filters.fromDate}
          />
        </Box>
      </Box>

      {/* أزرار العمليات للـ Popover */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={() => onClose && onClose()} // تعني إغلاق الـ Popover بدون تطبيق أي تغييرات
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
          onClick={() => {
            onApply();
            // onClose && onClose();
          }}
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

export default FilterDropDown;
