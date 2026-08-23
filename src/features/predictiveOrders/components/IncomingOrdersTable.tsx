import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import useGetData from "../../../shared/hooks/useGetData";
import type { IncomingOrderItem } from "../types/predictiveOrders.types";

const formatReceiptDate = (isoDate: string, daysUntilReceipt: number) => {
  const parsedDate = new Date(isoDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  if (daysUntilReceipt < 0) {
    return `${parsedDate.toLocaleDateString("ar-EG")} (متأخر ${Math.abs(daysUntilReceipt)} يوم)`;
  }

  if (daysUntilReceipt === 0) {
    return "اليوم";
  }

  if (daysUntilReceipt === 1) {
    return "غداً";
  }

  return parsedDate.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
  });
};

const IncomingOrdersTable = () => {
  const { data } = useGetData<IncomingOrderItem[]>(
    "/purchase-order/incoming-orders",
  );

  const incomingOrders = useMemo(() => data?.data ?? [], [data]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        border: "1px solid #E6EEF7",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          mb: 1.5,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <LocalShippingRoundedIcon sx={{ color: "#4F3C63" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#2C2540", fontSize: "1.1rem" }}
          >
            تتبع الطلبات القادمة
          </Typography>
        </Stack>

        {/* <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 2,
            px: 1.5,
            fontWeight: 700,
            borderColor: "#D4E3EE",
            color: "#3E6A7A",
          }}
        >
          عرض جميع الشحنات
        </Button> */}
      </Stack>

      <TableContainer>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>اسم الصنف</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>المورد</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>الكمية</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>تاريخ التوصيل</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {incomingOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", py: 2.5 }}>
                  <Typography sx={{ color: "#667085" }}>
                    لا توجد طلبات قادمة حالياً
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              incomingOrders.map((item) => {
                const isUrgent = item.daysUntilReceipt <= 1;

                return (
                  <TableRow
                    key={item.purchaseOrderItemId}
                    hover
                    sx={{
                      backgroundColor: isUrgent ? "#FFF7F7" : "transparent",
                    }}
                  >
                    <TableCell>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 0.75 }}
                      >
                        {isUrgent ? (
                          <WarningAmberRoundedIcon
                            sx={{ color: "#C62828", fontSize: 18 }}
                          />
                        ) : null}
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: isUrgent ? "#C62828" : "#2E3440",
                          }}
                        >
                          {item.drugName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ color: "#667085" }}>
                      {item.supplierName}
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700, color: "#2C2540" }}>
                      {item.orderedQuantityBoxes} علبة
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: isUrgent ? "#C62828" : "#3F5F75",
                      }}
                    >
                      {formatReceiptDate(
                        item.expectedReceiptDate,
                        item.daysUntilReceipt,
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 1.25, color: "#667085", fontSize: "0.85rem" }}>
        إجمالي الطلبات القادمة: {incomingOrders.length}
      </Box>
    </Paper>
  );
};

export default IncomingOrdersTable;
