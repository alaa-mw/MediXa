import { ErrorOutlined } from "@mui/icons-material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import type { RootState } from "../../../../shared/store";
import type { PurchaseInvoiceItemRequest } from "../../types/purchaseInvoiceStore";
import DrugSearch from "./DrugSearch";
import BatchItemCard from "./BatchItemCard";
import type { PharmacyDrug, PharmacyDrugResult } from "../../types/searchDrug";

export default function BatchManagementForm() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.purchaseInvoice.items);
  const invoiceNumber = useSelector(
    (state: RootState) => state.purchaseInvoice.invoiceNumber,
  );

  // ============ معالجات العناصر (Items) ============

  // إضافة دواء جديد
  const handleAddDrug = (pharmacyDrug: PharmacyDrugResult) => {
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

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  console.log("Width of the BatchManagementForm:", width);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }} ref={ref}>
      <DrugSearch onSelect={handleAddDrug} width={width} />
      <Box sx={{ width: "inherit", mt: 6 }} />
      {/* Active Filled Card Block */}
      {items.length > 0 ? (
        items.map((item, index) => (
          <BatchItemCard
            key={index}
            item={item}
            index={index}
            onQuantityChange={handleQuantityChange}
            onNetUnitPriceChange={handleNetUnitPriceChange}
            onRemoveItem={handleRemoveItem}
            onAddBatch={handleAddBatch}
            onBatchQuantityChange={handleBatchQuantityChange}
            onBatchExpiryChange={handleBatchExpiryChange}
            onRemoveBatch={handleRemoveBatch}
          />
        ))
      ) : (
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
