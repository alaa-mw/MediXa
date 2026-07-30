import React from "react";
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
import type { CustomerOrderDet } from "../types/customerOrder";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import LocalPharmacyRounded from "@mui/icons-material/LocalPharmacyRounded";
import { format } from "date-fns";
import getOrderStatusLabel from "../utils/getOrderStatusLabel";

const statusColor: Record<string, string> = {
  PENDING: "warning",
  PARTIALLY_FULFILLED: "info",
  READY_FOR_PICKUP: "primary",
  COMPLETED: "success",
  CANCELLED: "error",
};

const CustomerOrderDetails = () => {
  const { orderId } = useParams();

  const { data } = useGetData<CustomerOrderDet>(`/customer-request/${orderId}`);

  const dto = data?.data;

  const formatDate = (s?: string | null) =>
    s ? format(new Date(s), "PPpp") : "-";

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
              طلب العميل # {dto?.customerRequestId ?? orderId}
            </Typography>
            <Chip
              label={getOrderStatusLabel(dto?.status ?? "")}
              size="small"
              color={
                (statusColor[dto?.status ?? ""] as
                  | "default"
                  | "primary"
                  | "secondary"
                  | "error"
                  | "info"
                  | "success"
                  | "warning") ?? "default"
              }
              sx={{ fontWeight: 700, borderRadius: "8px" }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
            عرض تفاصيل طلب العميل
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
                اسم العميل
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {dto?.customerName ?? "-"}
              </Typography>
            </Box>
            <Person2Rounded sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            height: "100%",
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
                رقم الهاتف
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {dto?.customerPhone ?? "-"}
              </Typography>
            </Box>
            <PhoneRounded sx={{ fontSize: 40, color: "secondary.main" }} />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            height: "100%",
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
                الطلب بتاريخ
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5 }}>
                {formatDate(dto?.requestedAt)}
              </Typography>
            </Box>
            <CalendarTodayRounded
              sx={{ fontSize: 40, color: "tertiary.main" }}
            />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2.5,
            height: "100%",
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
            <LocalPharmacyRounded
              sx={{ fontSize: 40, color: "primary.main" }}
            />
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
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={it.customerRequestItemId}>
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
                          label={it.status}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 2 }}
                        />
                      </Stack>

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
                            الكمية المطلوبة
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, mt: 0.5 }}
                          >
                            {it.requestedQuantity}
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
                            الكمية المنفذة
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mt: 0.5 }}
                          >
                            {it.fulfilledQuantity}
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
                            الحالة
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            sx={{ fontWeight: 700, mt: 0.5 }}
                          >
                            {getOrderStatusLabel(it.status)}
                          </Typography>
                        </Box>
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

export default CustomerOrderDetails;
