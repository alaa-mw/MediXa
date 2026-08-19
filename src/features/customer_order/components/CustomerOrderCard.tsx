import {
  CalendarTodayRounded,
  Person2Rounded,
  PhoneRounded,
  VisibilityRounded,
  CancelRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import type { CustomerOrder } from "../types/customerOrder";
import getOrderStatusLabel from "../utils/getOrderStatusLabel";
import OrderStatusProgress from "./OrderStatusProgress";
import usePostData from "../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const statusColor: Record<string, "default" | "warning" | "success" | "error"> =
  {
    PENDING: "warning",
    CONFIRMED: "success",
    CANCELLED: "error",
  };

const CustomerOrderCard = ({
  data,
  onView,
  refetch,
}: {
  data: CustomerOrder;
  onView?: (id: string) => void;
  refetch: () => void;
}) => {
  const { showSnackbar } = useSnackbar();
  const { mutate: cancelOrder } = usePostData(
    `/customer-request/${data.customerRequestId}/cancel`,
  );
  const handleCancelOrder = () => {
    cancelOrder(
      {},
      {
        onSuccess: () => {
          showSnackbar("تم إلغاء الطلب بنجاح", "success");
          refetch();
        },
        onError: (error) => {
          console.log("error:", error);
          const errorDetails = (error as Error & { details?: string }).details;
          if (errorDetails)
            showSnackbar(error.message + ": " + errorDetails, "error");
          else showSnackbar(error.message, "error");
        },
      },
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        border: "1px solid #EEF2F5",
        boxShadow: "0px 4px 18px rgba(0,0,0,0.03)",
        transition: "all .2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0,0,0,.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          {/* Header */}
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              <CalendarTodayRounded
                sx={{ fontSize: 16, color: "text.secondary" }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {data.createdAt.split("T")[0]}
              </Typography>
            </Stack>

            <Chip
              label={getOrderStatusLabel(data.status)}
              color={statusColor[data.status] ?? "default"}
              size="small"
              sx={{
                color: `${statusColor[data.status]}.dark`,
                fontWeight: 700,
                borderRadius: 2,
              }}
            />
          </Stack>

          {/* Customer */}
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{ flexDirection: "row", gap: 1.5, alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "#F3F7FA",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Person2Rounded sx={{ fontSize: 24, color: "#506680" }} />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#34495E" }}
                >
                  {data.customerName}
                </Typography>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}
                >
                  <PhoneRounded
                    sx={{ fontSize: 14, color: "text.secondary" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    {data.customerPhone}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Box
              sx={{
                bgcolor: "grey.100",
                p: 1,
                borderRadius: 2,
                textAlign: "center",
                minWidth: 60,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                عدد الأصناف
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {data.itemsCount}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ pt: 1 }}>
            <OrderStatusProgress data={data} />
          </Box>

          {/* Action: primary full button + small cancel icon button */}
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<VisibilityRounded />}
              sx={{
                height: 44,
                borderRadius: 2.5,
                fontWeight: 700,
                textTransform: "none",
                flex: 1,
              }}
              onClick={() =>
                onView?.(`details/${String(data.customerRequestId)}`)
              }
            >
              عرض الطلب
            </Button>

            <IconButton
              aria-label="cancel"
              onClick={handleCancelOrder}
              sx={{
                height: 44,
                width: 44,
                bgcolor: "#eae6e6",
                color: "common.white",
                "&:hover": { bgcolor: "secondary.dark" },
              }}
            >
              <CancelRounded />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderCard;
