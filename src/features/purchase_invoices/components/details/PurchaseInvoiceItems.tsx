import { Box, Typography, Chip } from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import type { SupplierInvoiceItem } from "../../types/purchaseInvoiceDetails";
import { formatArabicDateTime } from "../../utils/formatArabicDateTime";
import { alpha } from "@mui/material/styles";
import theme from "../../../../shared/styles/mainTheme";

const PurchaseInvoiceItems = ({ items }: { items: SupplierInvoiceItem[] }) => {
  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      {items.map((item) => {
        // Calculate the total item quantity across all its batches
        const totalQuantity = item.batches
          ? item.batches.reduce(
              (acc, batch) => acc + (batch.initialQuantity || 0),
              0,
            )
          : 0;

        return (
          <Box
            key={item.supplierInvoiceItemId}
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E6F4F1",
              borderRadius: "12px",
              p: 2,
              borderRight: `4px solid ${theme.palette.secondary.main}`,
              //   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
            }}
          >
            {/* Header: Drug Information & Add Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              {/* Drug Title & Tags */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: "#EDF2F7",
                    borderRadius: "12px",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "secondary.main",
                  }}
                >
                  <LocalPharmacyIcon />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4A284B",
                      fontWeight: 700,
                      fontSize: "18px",
                      mb: 0.5,
                    }}
                  >
                    {"drug name needed"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Table Structure */}
            <Box sx={{ width: "100%" }}>
              {/* Table Header */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
                  p: 1.5,
                  bgcolor: alpha(theme.palette.primary.light, 0.2),
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#2D3748",
                  textAlign: "center",
                  mb: 1.5,
                }}
              >
                <Box>رقم الدفعة</Box>
                <Box>انتهاء الصلاحية</Box>
                <Box>الكمية</Box>
                <Box>تاريخ الاستلام</Box>
                <Box>الحالة</Box>
              </Box>

              {/* Table Rows (Batches) */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {item.batches &&
                  item.batches.map((batch) => (
                    <Box
                      key={batch.batchId}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {/* Batch Number Input Box */}
                      <Box sx={{ px: 1 }}>
                        <Box
                          sx={{
                            bgcolor: "#F3F4F6",
                            py: 1.2,
                            borderRadius: "8px",
                            fontSize: "13px",
                            color: "#4A5568",
                          }}
                        >
                          {batch.pharmacyDrugId}
                          {/* Fallback to look like image */}
                        </Box>
                      </Box>

                      {/* Expiry Date Input Box */}
                      <Box sx={{ px: 1 }}>
                        <Box
                          sx={{
                            bgcolor: "#F3F4F6",
                            py: 1.2,
                            borderRadius: "8px",
                            fontSize: "13px",
                            color: "#4A5568",
                          }}
                        >
                          {batch.expiryDate.split("T")[0]}
                        </Box>
                      </Box>
                      <Box sx={{ px: 1 }}>
                        <Box
                          sx={{
                            bgcolor: "#F3F4F6",
                            py: 1.2,
                            borderRadius: "8px",
                            fontSize: "13px",
                            color: "#4A5568",
                            fontWeight: 600,
                          }}
                        >
                          {batch.initialQuantity}
                        </Box>
                      </Box>
                      <Box sx={{ px: 1 }}>
                        <Box
                          sx={{
                            bgcolor: "#F3F4F6",
                            py: 1.2,
                            borderRadius: "8px",
                            fontSize: "13px",
                            color: "#4A5568",
                            fontWeight: 600,
                          }}
                        >
                            {batch.receivedDate.split("T")[0]}
                        </Box>
                      </Box>
                      <Box sx={{ px: 1 }}>
                        <Chip
                          label={batch?.status}
                          variant="filled"
                          color="success"
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>

            {/* Bottom Total Row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 2,
                gap: 2,
              }}
            >
              <Typography sx={{ color: "#718096", fontSize: "13px" }}>
                إجمالي الكمية للصنف:
              </Typography>
              <Typography
                sx={{ color: "#2E6A6A", fontWeight: 800, fontSize: "16px" }}
              >
                {totalQuantity}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PurchaseInvoiceItems;
