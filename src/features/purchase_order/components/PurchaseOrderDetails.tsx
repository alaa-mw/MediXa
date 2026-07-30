import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import Inventory2Rounded from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import NotesRounded from "@mui/icons-material/NotesRounded";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../shared/hooks/useGetData";
import type { PurchaseOrderDetails } from "../types/purchaseOrder";
import getPurchaseOrderStatusLabel from "../utils/getPurchaseOrderStatusLabel";

const statusColor: Record<
  string,
  "default" | "warning" | "success" | "error" | "info"
> = {
  PENDING: "warning",
  CONFIRMED: "info",
  PARTIALLY_RECEIVED: "info",
  RECEIVED: "success",
  CANCELLED: "error",
};

const PurchaseOrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data } = useGetData<PurchaseOrderDetails>(
    `/purchase-order/${orderId}`,
  );

  const dto = data?.data;

  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: "#f8fafc", minHeight: "100vh", p: 2 }}
      dir="rtl"
    >
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
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#1e293b" }}>
              طلبية شراء # {dto?.purchaseOrderId ?? orderId}
            </Typography>
            <Chip
              label={getPurchaseOrderStatusLabel(dto?.orderStatus ?? "")}
              size="small"
              color={statusColor[dto?.orderStatus ?? ""] ?? "default"}
              sx={{ fontWeight: 700, borderRadius: "8px" }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
            عرض تفاصيل طلبية الشراء
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          fontSize: 13,
          textAlign: "center",
          alignItems: "stretch",
          gap: 1,
        }}
      >
        <Card
          sx={{
            p: 2.5,
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
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
                اسم المورد
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {dto?.supplier?.supplierName ?? "-"}
              </Typography>
            </Box>
            <LocalShippingRounded
              sx={{ fontSize: 40, color: "primary.main" }}
            />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
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
                تاريخ الطلب
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {dto?.orderDate?.split("T")[0] ?? "-"}
              </Typography>
            </Box>
            <CalendarTodayRounded
              sx={{ fontSize: 40, color: "secondary.main" }}
            />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
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
                حالة الطلب
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {getPurchaseOrderStatusLabel(dto?.orderStatus ?? "-")}
              </Typography>
            </Box>
            <NotesRounded sx={{ fontSize: 40, color: "tertiary.main" }} />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
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
                عدد الأصناف
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
                {dto?.items?.length ?? 0}
              </Typography>
            </Box>
            <Inventory2Rounded sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
          تفاصيل الأصناف: ({dto?.items?.length ?? 0})
        </Typography>

        {!dto?.items || dto.items.length === 0 ? (
          <Typography color="text.secondary">
            لا توجد أصناف في الطلب.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {dto.items.map((it) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={it.purchaseOrderItemId}
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
                            sx={{ fontWeight: 700, lineHeight: 1.3 }}
                          >
                            {it.tradeName ?? "-"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            ملاحظات: {it.notes ?? "-"}
                          </Typography>
                        </Box>
                        <Chip
                          label={getPurchaseOrderStatusLabel(it.status)}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 2 }}
                        />
                      </Stack>

                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "grey.100",
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          الكمية المطلوبة (علب)
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, mt: 0.5 }}
                        >
                          {it.orderedQuantityBoxes}
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

export default PurchaseOrderDetailsPage;
