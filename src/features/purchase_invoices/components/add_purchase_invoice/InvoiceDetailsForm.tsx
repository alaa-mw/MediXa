import { Box, Typography, Paper, Grid } from "@mui/material";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type { Supplier } from "../../types/purchaseInvoice";
import { CustomAutocomplete } from "../../../../shared/layout/CustomAutocomplete";
import { useEffect } from "react";
import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
import type { RootState } from "../../../../shared/store";
import { useDispatch, useSelector } from "react-redux";
import type { SliceState } from "../../types/purchaseInvoiceStore";
import {
  printState,
  setSupplier,
  updateField,
} from "../../store/purchaseInvoiceSlice";

export default function InvoiceDetailsForm() {
  const purchaseInvoice = useSelector(
    (state: RootState) => state.purchaseInvoice,
  );
  const dispatch = useDispatch();
  const { data: suppliers } = useGetWithParams<Supplier[]>("/supplier", {
    searchQuery: "",
  });

  const handleFieldChange = <K extends keyof SliceState>(
    field: K,
    value: SliceState[K],
  ) => {
    dispatch(
      updateField({
        field,
        value,
      }),
    );
  };

  const handleSupplierChange = (supplierId: number, supplierName: string) => {
    const newSupplier = {
      supplierId: supplierId,
      pharmacyId: -1,
      supplierName: supplierName,
    };
    dispatch(setSupplier(newSupplier));
  };

  useEffect(() => {
    dispatch(printState());
  }, [dispatch, purchaseInvoice]);

  return (
    <Box sx={{ maxWidth: 800, height: "auto", mx: "auto" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          mb: 3,
          border: "1px solid #EAF2F6",
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
          يرجى إدخال بيانات المورد و تفاصيل الفاتورة الأساسية للمتابعة
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              label="رقم الفاتورة"
              placeholder="أدخل رقم الفاتورة..."
              value={purchaseInvoice.invoiceNumber}
              onChange={(value) => handleFieldChange("invoiceNumber", value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomAutocomplete
              label="اسم المورد"
              options={
                suppliers?.data.map(
                  (supplier) =>
                    `${supplier.supplierName}-${supplier.supplierId}`,
                ) || []
              }
              value={purchaseInvoice.supplier.supplierName}
              onChange={(newValue) => {
                handleFieldChange(
                  "supplierId",
                  parseInt(newValue.trim().split("-").pop() || "-1", 10),
                ); // take just supplierId
                handleSupplierChange(
                  parseInt(newValue.trim().split("-").pop() || "-1", 10),
                  newValue.trim().split("-").shift() || "",
                );
              }}
              placeholder={"ابحث عن مورد مسجل أو أدخل اسماً جديداً..."}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <RTLDatePicker
              label="تاريخ الفاتورة"
              value={purchaseInvoice.invoiceDate}
              onChange={(newValue) =>
                handleFieldChange("invoiceDate", newValue || "")
              }
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
             <CustomAutocomplete
                label=" حالة الدفع"
            />
          </Grid> */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              label="ملاحظات إضافية (اختياري)"
              placeholder="أي تفاصيل أخرى متعلقة بهذه الفاتورة..."
              value={purchaseInvoice.notes}
              onChange={(value) => handleFieldChange("notes", value)}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

// export default InvoiceDetailsForm;
