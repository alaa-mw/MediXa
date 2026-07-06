import { DeleteOutlined, ErrorOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  alpha,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetData from "../../../../shared/hooks/useGetData";
import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";
import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
import theme from "../../../../shared/styles/mainTheme";
import {
  addBatch,
  addItem,
  printState,
  removeBatch,
  removeItem,
  updateBatch,
  updateItemNetUnitPrice,
  updateItemQuantity,
} from "../../store/purchaseInvoiceSlice";
// import type { RootState } from "../store";
import type { RootState } from "../../store";
import type { PurchaseInvoiceItemRequest } from "../../types/purchaseInvoiceStore";
import DrugSearch from "./DrugSearch";
import type { PharmacyDrug } from "../../types/searchDrug";

export default function BatchManagementForm() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.purchaseInvoice.items);
  const invoiceNumber = useSelector(
    (state: RootState) => state.purchaseInvoice.invoiceNumber,
  );

  // ============ معالجات العناصر (Items) ============

  // إضافة دواء جديد
  const handleAddDrug = (pharmacyDrug: PharmacyDrug) => {
    if (!pharmacyDrug) return;

    const newItem: PurchaseInvoiceItemRequest = {
      pharmacyDrugId: pharmacyDrug.pharmacyDrugId,
      drugName: pharmacyDrug.tradeName,
      quantity: 1,
      netUnitPrice: 0,
      batches: [
        {
          initialQuantity: 1,
          expiryDate: new Date().toISOString().split("T")[0],
        },
      ],
    };

    dispatch(addItem(newItem));
  };

  // تحديث الكمية الإجمالية للصنف
  const handleQuantityChange = (itemIndex: number, value: number) => {
    dispatch(
      updateItemQuantity({
        index: itemIndex,
        quantity: value,
      }),
    );
  };

  // تحديث سعر الوحدة للصنف
  const handleNetUnitPriceChange = (itemIndex: number, value: number) => {
    dispatch(
      updateItemNetUnitPrice({
        index: itemIndex,
        netUnitPrice: value,
      }),
    );
  };

  // حذف صنف
  const handleRemoveItem = (itemIndex: number) => {
    dispatch(removeItem(itemIndex));
  };

  // ============ معالجات الدفعات (Batches) ============

  // إضافة دفعة جديدة
  const handleAddBatch = (itemIndex: number) => {
    const newBatch = {
      initialQuantity: 1,
      expiryDate: new Date().toISOString().split("T")[0],
    };
    dispatch(
      addBatch({
        itemIndex,
        batch: newBatch,
      }),
    );
  };

  // تحديث كمية الدفعة
  const handleBatchQuantityChange = (
    itemIndex: number,
    batchIndex: number,
    value: number,
  ) => {
    const item = items[itemIndex];
    if (!item) return;

    const updatedBatch = {
      ...item.batches[batchIndex],
      initialQuantity: value,
    };

    dispatch(
      updateBatch({
        itemIndex,
        batchIndex,
        updatedBatch,
      }),
    );
  };

  // تحديث تاريخ انتهاء الدفعة
  const handleBatchExpiryChange = (
    itemIndex: number,
    batchIndex: number,
    date: string,
  ) => {
    const item = items[itemIndex];
    if (!item) return;

    const updatedBatch = {
      ...item.batches[batchIndex],
      expiryDate: date,
    };

    dispatch(
      updateBatch({
        itemIndex,
        batchIndex,
        updatedBatch,
      }),
    );
  };

  // حذف دفعة
  const handleRemoveBatch = (itemIndex: number, batchIndex: number) => {
    dispatch(
      removeBatch({
        itemIndex,
        batchIndex,
      }),
    );
  };

  useEffect(() => {
    dispatch(printState());
  }, [items]);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <DrugSearch onSelect={handleAddDrug}/> 
      
      {/* Active Filled Card Block */}
      {items.length > 0 ? items.map((item, index) => (
        <Paper
          key={index}
          sx={{
            p: 3,
            borderRadius: 4,
            my: 1,
            borderRight: `6px solid ${theme.palette.primary.main}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ bgcolor: "#F0F4F8", p: 1, borderRadius: 2 }}>
                <LocalPharmacyIcon sx={{ color: "#316A75" }} />
              </Box>
              <Typography
                sx={{ fontWeight: 700, color: "#2D3A4D", fontSize: 16 }}
              >
                {`${item.drugName}`}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", width: "50%", gap: 1 }}>
              <CustomTextField
                label="الكمية الاجمالية"
                value={item.quantity}
                onChange={(value) =>
                  handleQuantityChange(index, parseInt(value))
                }
                padding="8px"
              />
              <CustomTextField
                label="سعر الوحدة"
                value={item.netUnitPrice}
                onChange={(value) =>
                  handleNetUnitPriceChange(index, parseFloat(value))
                }
                padding="8px"
              />

              <IconButton color="error" onClick={() => handleRemoveItem(index)}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "2.5fr 2.5fr  1fr ",
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              p: 1.5,
              borderRadius: 2,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 13,
              mb: 1,
            }}
          >
            <Box>الكمية (علبة)</Box>
            <Box>تاريخ الانتهاء</Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ ml: 1, mr: 0 }} />}
                onClick={() => handleAddBatch(index)}
                sx={{
                  borderRadius: 5,
                  fontSize: "0.7rem",
                }}
              >
                إضافة دفعة
              </Button>
            </Box>
          </Box>

          {item.batches.map((row, idx) => (
            <Box
              key={idx}
              sx={{
                display: "grid",
                gridTemplateColumns: "2.5fr 2.5fr  1fr",
                alignItems: "center",
                mb: 1,
                textAlign: "center",
              }}
            >
              <Box sx={{ px: 1 }}>
                <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
                  <CustomCounterField
                    value={row.initialQuantity}
                    onChange={(value) =>
                      handleBatchQuantityChange(index, idx, value)
                    }
                    height="32px"
                  />
                </Box>
              </Box>
              <Box sx={{ px: 1 }}>
                <Box
                  sx={{
                    bgcolor: "#F1F5F9",
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  <RTLDatePicker
                    value={row.expiryDate}
                    onChange={(date) =>
                      handleBatchExpiryChange(index, idx, date)
                    }
                    padding="0px 8px"
                  />
                </Box>
              </Box>
              <IconButton
                color="error"
                onClick={() => handleRemoveBatch(index, idx)}
              >
                <DeleteOutlined />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )):(
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            لا توجد دفعات مضافة بعد
          </Typography>
        </Box>
      )}
      {/* Info Footnotes layout rows */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
          mt: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#EBF8F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#234E46" }} />
          <Typography sx={{ fontSize: 12, color: "#234E46" }}>
            نظام إدارة الدفعات يضمن تتبع دقيق للصلاحية
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#FFF5F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <ErrorOutlined sx={{ color: "#9B2C2C" }} />
          <Typography sx={{ fontSize: 12, color: "#9B2C2C" }}>
            سيتم تنبيهك تلقائياً عند اقتراب انتهاء صلاحية أي دفعة
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#F7FAFC",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#4A5568" }} />
          <Typography sx={{ fontSize: 12, color: "#4A5568" }}>
            تاريخ الانتهاء هو العامل الأساسي في قاعدة صرف الأدوية FEFO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
