import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
import type { InvoiceStatus, PaymentStatus } from "../../types/enums";

interface FilterValues {
  status:InvoiceStatus;
  supplierId: string;
  paymentStatus: string;
  fromDate: string;
  toDate: string;
}

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onApply: () => void;
}

const suppliers = [
  { id: "", name: "كل الموردين" },
  { id: "1", name: "مورد 1" },
  { id: "2", name: "مورد 2" },
];

const paymentStatuses: { value: PaymentStatus | "", label: string }[] = [
  { value: "", label: "جميع حالات الدفع" },
  { value: "PAID", label: "مدفوع" },
  { value: "PENDING", label: "غير مدفوع" },
  { value: "PARTIAL", label: "مدفوع جزئياً" },
];

export default function FilterDialog({
  open,
  onClose,
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>تصفية الفواتير</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
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
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>حالة الدفع</InputLabel>
            <Select
              value={filters.paymentStatus}
              label="حالة الدفع"
              onChange={(e) =>
                handleChange("paymentStatus", e.target.value)
              }
            >
              {paymentStatuses.map((status) => (
                <MenuItem
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <RTLDatePicker
            label="من تاريخ"
            value={filters.fromDate}
            onChange={(value) =>
              handleChange("fromDate", value)
            }
          />

          <RTLDatePicker
            label="إلى تاريخ"
            value={filters.toDate}
            onChange={(value) =>
              handleChange("toDate", value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          إلغاء
        </Button>

        <Button
          variant="contained"
          onClick={onApply}
        >
          تطبيق
        </Button>
      </DialogActions>
    </Dialog>
  );
}