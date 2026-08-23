import { useMemo, useState } from "react";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import { useNavigate } from "react-router-dom";
import type { PredictiveOrderItem } from "../types/predictiveOrders.types";
import useGetData from "../../../shared/hooks/useGetData";

type PrefillOrderItem = {
  pharmacyDrugId: number | string;
  tradeName: string;
};

// const formatStockWithBoxes = (units: number, looseUnits: number) => {
//   return ` (${units} ${looseUnits > 0 ? ` + ${looseUnits} وحدة` : "وحدة"})`;
// };

const PredictiveOrdersTable = () => {
  const navigate = useNavigate();

  const { data, refetch } = useGetData<PredictiveOrderItem[]>(
    "/purchase-order/smart-suggestions",
  );
  const predictiveData = useMemo(() => data?.data ?? [], [data]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedItems = useMemo(
    () =>
      predictiveData.filter((item) =>
        selectedIds.includes(item.pharmacyDrugId),
      ),
    [predictiveData, selectedIds],
  );

  const handleToggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleCreatePurchaseOrder = () => {
    if (selectedItems.length === 0) return;

    const prefillItems: PrefillOrderItem[] = selectedItems.map((item) => ({
      pharmacyDrugId: item.pharmacyDrugId,
      tradeName: item.drugName,
    }));

    navigate("/pharmacy/orders/purchase/add", {
      state: {
        prefillItems,
      },
    });
  };

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
          gap: 1.5,
          mb: 1.5,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <AutoAwesomeRoundedIcon sx={{ color: "#5F4B8B" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#2C2540", fontSize: "1.15rem" }}
          >
            الأدوية المقترحة للطلب
          </Typography>
          <Button
            size="small"
            startIcon={<RefreshRoundedIcon />}
            onClick={() => refetch()}
            sx={{
              minWidth: "auto",
              borderRadius: 999,
              px: 1.25,
              py: 0.4,
              backgroundColor: "#DFF7FF",
              color: "#3A7D91",
              fontWeight: 700,
              textTransform: "none",
              "& .MuiButton-startIcon": { color: "#3A7D91", mr: 0.5 },
              "&:hover": {
                backgroundColor: "#CFEFFA",
              },
            }}
          >
            تحديث
          </Button>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddShoppingCartRoundedIcon />}
          onClick={handleCreatePurchaseOrder}
          disabled={selectedItems.length === 0}
          sx={{
            alignSelf: { xs: "flex-start", sm: "auto" },
            borderRadius: 2,
            px: 2.5,
            fontWeight: 800,
            backgroundColor: "#5A3C75",
            "&:hover": {
              backgroundColor: "#4C3264",
            },
          }}
        >
          إنشاء طلب توريد جديد
        </Button>
      </Stack>

      <TableContainer>
        <Table size="small" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>الاختيار</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>اسم الدواء</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>المخزون الحالي</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>المخزون المتوقع</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>الحد الآمن</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>
                الكمية المقترحة للشراء
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {predictiveData.map((item) => {
              const isSelected = selectedIds.includes(item.pharmacyDrugId);
              const isRisky = item.projectedStock < item.safetyStock;

              return (
                <TableRow key={item.pharmacyDrugId} hover>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={() =>
                        handleToggleSelection(item.pharmacyDrugId)
                      }
                      size="small"
                      sx={{
                        color: "#9DDCF2",
                        "&.Mui-checked": {
                          color: "#2E6F74",
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ color: "#2E3440", fontWeight: 600 }}>
                    {item.drugName}
                  </TableCell>

                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: isRisky ? "#D32F2F" : "#273043",
                      }}
                    >
                      {item.currentFullBoxes}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ color: "#667085", ml: 0.5 }}
                    >
                      {" "}
                      علبة
                    </Typography>
                    <Typography sx={{ color: "#667085", fontSize: "0.8rem" }}>
                      {/* {formatStockWithBoxes(
                        item.currentStock,
                        item.currentLooseUnits,
                      )} */}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: "#475467" }}>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: isRisky ? "#D32F2F" : "#273043",
                      }}
                    >
                      {item.projectedFullBoxes}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ color: "#667085", ml: 0.5 }}
                    >
                      {" "}
                      علبة
                    </Typography>
                    <Typography sx={{ color: "#667085", fontSize: "0.8rem" }}>
                      {item.projectedStock < 0
                        ? `متوقع نقص ${Math.abs(item.projectedFullBoxes)} علبة`
                        : item.projectedStock > 0
                          ? `متوقع زيادة غير كافية ${Math.abs(item.projectedFullBoxes)} علبة`
                          : ` متوقع انتهاء الكمية يجب الوصول للحد الآمن`}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: "#475467" }}>
                    {item.safetyStockBoxes} علبة
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={`${item.recommendedBoxes} علبة`}
                      size="small"
                      sx={{
                        backgroundColor: "#C5F1F4",
                        color: "#1D6468",
                        fontWeight: 800,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 1.5, color: "#667085", fontSize: "0.85rem" }}>
        العناصر المحددة حالياً: {selectedIds.length}
      </Box>
    </Paper>
  );
};

export default PredictiveOrdersTable;
