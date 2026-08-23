import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
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
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import { useGetFile } from "../../../shared/hooks/useGetFile";
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
  const { showSnackbar } = useSnackbar();

  const { mutate: exportExcel, isPending: isExporting } = useGetFile<Blob>(
    `/purchase-order/${String(data.purchaseOrderId)}/export-excel`,
  );

  const handleExportExcel = () => {
    exportExcel(undefined, {
      onSuccess: (response) => {
        const blob =
          response instanceof Blob
            ? response
            : new Blob([response as unknown as BlobPart], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });

        const fileUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `purchase-order-${String(data.purchaseOrderId)}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileUrl);

        showSnackbar("تم تصدير ملف الإكسل بنجاح، واعتبار الطلب قيد الاستلام", "success");
      },
      onError: () => {
        showSnackbar("حدث خطأ أثناء تصدير ملف الإكسل", "error");
      },
    });
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

          <Stack sx={{ flexDirection: "row", gap: 1 }}>
          

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
              onClick={() =>
                onView?.(`details/${String(data.purchaseOrderId)}`)
              }
            >
              عرض الطلب
            </Button>
              <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadRounded />}
              onClick={handleExportExcel}
              disabled={isExporting}
              sx={{
                height: 44,
                borderRadius: 2.5,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {isExporting ? "جاري التصدير..." : "تصدير "}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderCard;
