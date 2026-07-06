import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { RTLDatePicker } from "../../../shared/layout/RTLDatePicker";
import type {
  PaymentStatus,
  SupplierInvoiceStatus,
} from "../types/enums";
import { CustomAutocomplete } from "../../../shared/layout/CustomAutocomplete";

interface FilterValues {
  status: SupplierInvoiceStatus;
  supplierId: string;
  paymentStatus: PaymentStatus | "";
  fromDate: string;
  toDate: string;
}

interface FilterDialogProps {
  open: boolean;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onApply: () => void;
}

const InvoiceStatuses: { value: SupplierInvoiceStatus | ""; label: string }[] =
  [
    { value: "", label: "جميع حالات الفواتير" },
    { value: "PENDING", label: "قيد الانتظار" },
    { value: "PARTIALLY_STOCKED", label: "مخزون جزئي" },
    { value: "STOCKED", label: "مخزون كامل" },
    { value: "CANCELLED", label: "ملغاة" },
  ];

const paymentStatuses: { value: PaymentStatus | ""; label: string }[] = [
  { value: "", label: "جميع حالات الدفع" },
  { value: "PAID", label: "مدفوع" },
  { value: "PENDING", label: "غير مدفوع" },
  { value: "PARTIAL", label: "مدفوع جزئياً" },
];

export default function FilterDialog({
  open,
  filters,
  onChange,
  onApply,
}: FilterDialogProps) {
  const handleChange = (field: keyof FilterValues, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>تصفية الفواتير</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* <FormControl fullWidth>
            <InputLabel>المورد</InputLabel>
            <Select
              value={filters.supplierId}
              label="المورد"
              onChange={(e) =>
                handleChange("supplierId", e.target.value)
              }
            >
              {suppliers.map((supplier) => (
                <MenuItem
                  key={supplier.id}
                  value={supplier.id}
                >
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <CustomAutocomplete
            label="حالة الفاتورة"
            value={filters.status}
            options={InvoiceStatuses.map((status) => status.label)}
            onChange={(newValue) =>
              handleChange(
                "status",
                InvoiceStatuses.find((status) => status.label === newValue)
                  ?.value || "",
              )
            }
          />

          <CustomAutocomplete
            label="حالة الدفع"
            value={filters.paymentStatus}
            options={paymentStatuses.map((status) => status.label)}
            onChange={(newValue) =>
              handleChange(
                "paymentStatus",
                paymentStatuses.find((status) => status.label === newValue)
                  ?.value || "",
              )
            }
          />

          <RTLDatePicker
            label="من تاريخ"
            value={filters.fromDate}
            onChange={(value) => handleChange("fromDate", value)}
          />

          <RTLDatePicker
            label="إلى تاريخ"
            value={filters.toDate}
            onChange={(value) => handleChange("toDate", value)}
            minDate={filters.fromDate}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onApply}>
          تطبيق
        </Button>
      </DialogActions>
    </Dialog>
  );
}
