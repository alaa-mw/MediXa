import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import type { PurchaseOrder } from "../types/purchaseOrder";
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

const PurchaseOrderCard = ({
  data,
  onView,
}: {
  data: PurchaseOrder;
  onView?: (id: string) => void;
}) => {
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
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                {data.orderDate?.split("T")[0]}
              </Typography>
            </Stack>

            <Chip
              label={getPurchaseOrderStatusLabel(data.orderStatus)}
              color={statusColor[data.orderStatus] ?? "default"}
              size="small"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            />
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}
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
                <LocalShippingRounded sx={{ fontSize: 24, color: "#506680" }} />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#34495E" }}
                >
                  {data.supplier?.supplierName ?? "-"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  المورد
                </Typography>
              </Box>
            </Stack>

            <Box
              sx={{
                bgcolor: "grey.100",
                p: 1,
                borderRadius: 2,
                textAlign: "center",
                minWidth: 64,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                الأصناف
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {data.itemsCount}
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<VisibilityRounded />}
            sx={{
              height: 44,
              borderRadius: 2.5,
              fontWeight: 700,
              textTransform: "none",
            }}
            onClick={() => onView?.(`details/${String(data.purchaseOrderId)}`)}
          >
            عرض الطلب
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderCard;
