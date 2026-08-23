import { Box, Typography, Paper, Grid, Divider, Chip } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { RootState } from "../../../../shared/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalItemsPrice,
  updateField,
} from "../../store/purchaseInvoiceSlice";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function InvoiceConfirmation() {
  const dispatch = useDispatch();

  const purchaseInvoice = useSelector(
    (state: RootState) => state.purchaseInvoice,
  );

  const totalItemsPrice = useSelector(getTotalItemsPrice);
  const netTotal = purchaseInvoice.discount
    ? totalItemsPrice - purchaseInvoice.discount
    : totalItemsPrice;

  const handleDiscountChange = (value: string) => {
    dispatch(
      updateField({
        field: "discount",
        value: parseFloat(value),
      }),
    );
  };
  const handlePaymentStatusChange = (value: string) => {
    dispatch(
      updateField({
        field: "paymentStatus",
        value: value,
      }),
    );
  };
  const handlePaidAmountChange = (value: string) => {
    dispatch(
      updateField({
        field: "paidAmount",
        value: parseFloat(value),
      }),
    );
  };
  // const statusMap = getPaymentStatusMap(purchaseInvoice.paymentStatus);
  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid #EAF2F6",
              boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Inventory2OutlinedIcon />
                <Typography sx={{ fontWeight: 800 }}>
                  مراجعة الأصناف المضافة
                </Typography>
              </Box>
              <Chip
                label={`${purchaseInvoice.items.length} أصناف`}
                sx={{ bgcolor: "#316A75", color: "white" }}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr 1.5fr 1.5fr",
                bgcolor: "#EBF5F8",
                p: 2,
                borderRadius: 2,
                mb: 2,
                fontWeight: 700,
              }}
            >
              <Box>الصنف</Box>
              <Box sx={{ textAlign: "center" }}>الكمية</Box>
              <Box sx={{ textAlign: "center" }}>سعر الوحدة</Box>
              <Box sx={{ textAlign: "center" }}>الإجمالي</Box>
            </Box>

            {purchaseInvoice.items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr 1.5fr 1.5fr",
                  alignItems: "center",
                  bgcolor: "#FAFCFD",
                  p: 2,
                  borderRadius: 2,
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <MedicationOutlinedIcon sx={{ color: "#2D3A4D" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {item.drugName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#A0AEC0" }}>
                      {item.pharmacyDrugId}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ textAlign: "center" }}>
                  {item.quantity}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {item.netUnitPrice}
                </Typography>
                <Typography sx={{ textAlign: "center", fontWeight: 800 }}>
                  {item.quantity * item.netUnitPrice}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 4, bgcolor: "white" }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <ReceiptOutlinedIcon sx={{ color: "#CBD5E1" }} />
              <Typography sx={{ fontWeight: 700 }}>
                ملخص الفاتورة النهائي
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#2C394B",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyValue: "space-between",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography sx={{ color: "#CBD5E1" }}>
                    إجمالي الأصناف
                  </Typography>
                  <Typography>{totalItemsPrice}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyValue: "space-between",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    gap: 3,
                  }}
                >
                  <Typography sx={{ color: "#CBD5E1", whiteSpace: "nowrap" }}>
                    خصم خاص
                  </Typography>
                  <CustomTextField
                    type="number"
                    label=""
                    value={purchaseInvoice.discount}
                    onChange={(value) => handleDiscountChange(value)}
                    minNum={0}
                    padding="4px"
                  />
                </Box>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyValue: "space-between",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "#CBD5E1", fontSize: 11 }}>
                      الصافي المطلوب دفعه
                    </Typography>
                    <Chip
                      label="ل.س"
                      size="small"
                      sx={{
                        bgcolor: "#415065",
                        color: "white",
                        mt: 0.5,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: 900, fontSize: 26 }}>
                    {netTotal}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#EAF6FA",
                  border: "1px solid #D6EAF3",
                  boxShadow: "none",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <InfoOutlinedIcon sx={{ color: "#316A75" }} />
                  <Typography sx={{ fontWeight: 700, color: "#2D3A4D" }}>
                    بيانات المورد والدفع
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyValue: "space-between",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
                    المورد
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {purchaseInvoice.supplier.supplierName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyValue: "space-between",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
                    تاريخ الشراء
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {purchaseInvoice.invoiceDate}
                  </Typography>
                </Box>
                {/* حالة الدفع */}
                <Box
                  sx={{
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      fontWeight: 700,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    حالة الدفع
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[
                      { label: "مدفوع", value: "PAID" },
                      { label: "معلق", value: "PENDING" },
                      { label: "دفع جزئي", value: "PARTIAL" },
                    ].map((status) => {
                      const isSelected =
                        purchaseInvoice.paymentStatus === status.value;
                      return (
                        <Chip
                          key={status.value}
                          label={status.label}
                          onClick={() => {
                            handlePaymentStatusChange(status.value);
                          }}
                          icon={
                            isSelected ? (
                              <CheckCircleRoundedIcon
                                style={{ color: "white", fontSize: 16 }}
                              />
                            ) : undefined
                          }
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 2.5,
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: "pointer",
                            bgcolor: isSelected ? "#316A75" : "#F8FAFC",
                            color: isSelected ? "white" : "#475569",
                            border: isSelected ? "none" : "1px solid #E2E8F0",
                            "& .MuiChip-label": { px: 1 },
                            "&:hover": {
                              bgcolor: isSelected ? "#25535C" : "#F1F5F9",
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
                {/* حقل المبلغ المدفوع جزئياً */}
                {purchaseInvoice.paymentStatus === "PARTIAL" && (
                  <CustomTextField
                    label="المبلغ المدفوع جزئياً *"
                    placeholder="أدخل المبلغ المدفوع"
                    value={purchaseInvoice.paidAmount || ""}
                    onChange={(value) => handlePaidAmountChange(value)}
                    type="number"
                  />
                )}
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
