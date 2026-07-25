import { Info, Note } from "@mui/icons-material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../shared/hooks/useGetData";
import type { DamageInvoiceDetails } from "../types/damageInvoice";
const DamageInvoiceDetails = () => {
  const { invoiceId } = useParams();
  const { data } = useGetData<DamageInvoiceDetails>(
    `/damage-invoices/${invoiceId}`,
  );

  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: "#f8fafc", minHeight: "100vh", p: 2 }}
      dir="rtl"
    >
      {/* هيدر الصفحة الرئيسي */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 3,
          borderBottom: "1px solid #e2e8f0",
          mb: 2,
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "900", color: "#1e293b" }}
            >
              {data?.data.invoiceNumber}
            </Typography>
            <Chip
              label={data?.data.status}
              size="small"
              sx={{
                backgroundColor: "#f3e8ff",
                color: "#6b21a8",
                border: "1px solid #e9d5ff",
                fontWeight: "700",
                borderRadius: "8px",
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
            الاطلاع على تفاصيل فاتورة الإتلاف
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          // p: 1.2,
          fontSize: 13,
          textAlign: "center",
          alignItems: "stretch",
          gap: 1,
        }}
      >
        <Card
          sx={{
            p: 2.5,
            height: "100%",
            borderRadius: "14px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
            backgroundColor: "#fdfefe",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 700 }}
              >
                إجمالي الفاتورة
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
                {data?.data.formattedTotalInvoicePrice ?? "-"} ل.س
              </Typography>
            </Box>
            <MonetizationOnIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
        </Card>
        <Card
          sx={{
            p: 2.5,
            height: "100%",
            borderRadius: "14px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
            backgroundColor: "#fdfefe",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 700 }}
              >
                إجمالي الكمية التالفة
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
                {data?.data.totalDamagedQuantity ?? 0}
              </Typography>
            </Box>
            <Inventory2Icon sx={{ fontSize: 40, color: "secondary.main" }} />
          </Box>
        </Card>
        <Card
          sx={{
            p: 2.5,
            height: "100%",
            borderRadius: "14px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
            backgroundColor: "#fdfefe",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 700 }}
              >
                سبب الإتلاف
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
                {data?.data?.damageReason}
              </Typography>
            </Box>
            <Info sx={{ fontSize: 40, color: "tertiary.main" }} />
          </Box>
        </Card>
        <Card
          sx={{
            p: 2.5,
            height: "100%",
            borderRadius: "14px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
            backgroundColor: "#fdfefe",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", fontWeight: 700 }}
              >
                ملاحظات عامة
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
                {data?.data?.notes}
              </Typography>
            </Box>
            <Note sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
          تفاصيل الأصناف: ({data?.data.itemsCount ?? 0})
        </Typography>

        {!data?.data.items || data?.data.items.length === 0 ? (
          <Typography color="text.secondary">
            لا توجد أصناف في الفاتورة.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {data!.data.items.map((it) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={it.damageInvoiceItemId}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              lineHeight: 1.3,
                            }}
                          >
                            {it.drug?.tradeName ?? "-"}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            رقم الدفعة #{it.batchId}
                          </Typography>
                        </Box>

                        <Chip
                          label={it.supplier?.supplierName ?? "-"}
                          color="primary"
                          // variant="soft"
                          size="small"
                          sx={{
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                        />
                      </Stack>

                      <Divider />

                      {/* Statistics */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3,1fr)",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "grey.100",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            الكمية
                          </Typography>

                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              mt: 0.5,
                            }}
                          >
                            {it.quantityDamaged}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "grey.100",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            سعر الوحدة
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              mt: 0.5,
                            }}
                          >
                            {it.formattedUnitConsumerPrice}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "primary.50",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            الإجمالي
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            sx={{
                              fontWeight: 700,
                              mt: 0.5,
                            }}
                          >
                            {it.formattedTotalLinePrice}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Notes */}
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "grey.50",
                          border: "1px dashed",
                          borderColor: "divider",
                          minHeight: 70,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 600 }}
                        >
                          الملاحظات
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.75,
                            color: "text.primary",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {it.notes || "لا توجد ملاحظات"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DamageInvoiceDetails;
