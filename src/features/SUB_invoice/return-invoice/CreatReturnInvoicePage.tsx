import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import InvoiceReturnSummary from "./components/InvoiceReturnSummary";
import { format } from "date-fns";
import SelectDrugReturnTable from "./components/SelectDrugReturnTable";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIdempotency } from "../../../shared/hooks/useIdempotency";
import { usePostData } from "../../../shared/hooks/usePostData";
import type { ReturnInvoiceResponse } from "./Types/returnInvoiceResponse";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

interface Props {
  items?: SaleInvoiceItem[];
  saleInvoiceDiscount?: number;
}
type ReturnInvoiceItem = SaleInvoiceItem & {
  checked: boolean;
  selectedQuantity: number;
  netTotalPrice: string;
  batches?: any[]; // قائمة الدفعات القادمة من الـ API
  selectedBatchId?: number; // الدفعة المختارة حالياً للإرسال
};

const toNumber = (value: string | number | undefined) =>
  Number.parseFloat(String(value ?? 0)) || 0;

const CreateReturnInvoicePage = ({
  items: propsItems,
  saleInvoiceDiscount: propsDiscount,
}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const saleInvoiceDiscount =
    propsDiscount ??
    location.state?.saleInvoiceDiscount ??
    location.state?.discount ??
    0;

  const items = location.state?.items || propsItems || [];
  const [invoiceItems, setInvoiceItems] = useState<ReturnInvoiceItem[]>([]);
  const [returnReason, setReturnReason] = useState<string>(
    "CUSTOMER_CHANGED_MIND",
  );

  const { showSnackbar } = useSnackbar();

  const returnReasonsList = [
    {
      value: "CUSTOMER_CHANGED_MIND",
      label: "تغيير رأي العميل (Customer Changed Mind)",
    },
    { value: "WRONG_ITEM", label: "صنف خاطئ (Wrong Item)" },
    { value: "DAMAGED", label: "تالف (Damaged)" },
    { value: "EXPIRED", label: "منتهي الصلاحية (Expired)" },
  ];

  const recalculateItemsWithDiscount = (itemsList: any[], discount: number) => {
    const totalItemsValue = itemsList.reduce((sum, item) => {
      const qty = item.selectedQuantity || 1;
      const unitPrice = toNumber(item.finalUnitPrice);
      return sum + qty * unitPrice;
    }, 0);

    return itemsList.map((item) => {
      const qty = item.selectedQuantity || 1;
      const unitPrice = toNumber(item.finalUnitPrice);
      const rowOriginalTotal = qty * unitPrice;

      let rowDiscountShare = 0;
      if (totalItemsValue > 0) {
        rowDiscountShare = (rowOriginalTotal / totalItemsValue) * discount;
      }

      const netTotal = Math.max(0, rowOriginalTotal - rowDiscountShare);

      return {
        ...item,
        displayQuantity: item.displayQuantity || qty,
        selectedQuantity: qty,
        totalPrice: rowOriginalTotal.toString(),
        netTotalPrice: netTotal.toFixed(2),
      };
    });
  };

  useEffect(() => {
    if (items && Array.isArray(items)) {
      const initialMapped = items.map((item: any) => {
        const qty = toNumber(item.displayQuantity) || 1;
        const unitPrice = toNumber(item.finalUnitPrice);

        const itemBatches = item.batches || item.batchAllocations || [];

        const defaultBatchId =
          itemBatches.length === 1
            ? itemBatches[0].saleInvoiceItemBatchId || itemBatches[0].batchId
            : undefined;

        return {
          ...item,
          displayQuantity: qty,
          selectedQuantity: qty,
          totalPrice: (qty * unitPrice).toString(),
          netTotalPrice: "0",
          checked: false,
          batches: itemBatches,
          selectedBatchId: defaultBatchId,
        };
      });

      setInvoiceItems(
        recalculateItemsWithDiscount(initialMapped, saleInvoiceDiscount),
      );
    }
  }, [items, saleInvoiceDiscount]);

  const handleSelectBatch = (saleInvoiceItemId: number, batchId: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item.saleInvoiceItemId === saleInvoiceItemId
          ? { ...item, selectedBatchId: batchId }
          : item,
      ),
    );
  };

  const handleToggleCheck = (saleInvoiceItemId: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item.saleInvoiceItemId === saleInvoiceItemId
          ? { ...item, checked: !item.checked }
          : item,
      ),
    );
  };

  const handleUpdateQuantity = (saleInvoiceItemId: number, delta: number) => {
    setInvoiceItems((prev) => {
      const updated = prev.map((item) => {
        if (item.saleInvoiceItemId !== saleInvoiceItemId) {
          return item;
        }

        const newQty = Math.max(
          1,
          Math.min(item.selectedQuantity + delta, item.displayQuantity),
        );

        return {
          ...item,
          selectedQuantity: newQty,
        };
      });

      return recalculateItemsWithDiscount(updated, saleInvoiceDiscount);
    });
  };

  const totalReturnValues = invoiceItems.reduce(
    (sum, item) => sum + toNumber(item.totalPrice),
    0,
  );

  const finalRefundAmount = invoiceItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + toNumber(item.netTotalPrice), 0);

  const todayDate = format(new Date(), "dd MMM yyyy");
  const { mutateAsync, isPending } = usePostData<ReturnInvoiceResponse>(
    "/return-invoice/create",
  );
  const { getKey, clearKey } = useIdempotency();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        bgcolor: "#f4f9fd",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Grid sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", gap: 1 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#0F172A" }}
                >
                  إنشاء فاتورة مرتجع
                </Typography>
              </Stack>
              <Typography
                color="text.secondary"
                sx={{ mt: 0.5, fontSize: "0.9rem" }}
              >
                Date : {todayDate}
              </Typography>
            </Box>

            <Box sx={{ minWidth: "220px" }}>
              <TextField
                select
                fullWidth
                size="small"
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                {returnReasonsList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Grid>
        <Paper
          elevation={0}
          sx={{ border: "1px solid #E2E8F0", borderRadius: "8px" }}
        >
          <SelectDrugReturnTable
            items={invoiceItems}
            onToggleCheck={handleToggleCheck}
            onUpdateQuantity={handleUpdateQuantity}
            onSelectBatch={handleSelectBatch} // <-- تأكد من وجود هذا السطر هنا
            saleInvoiceDiscount={saleInvoiceDiscount}
          />
        </Paper>
      </Box>

      <Box
        sx={{
          width: "25%",
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
        }}
      >
        <InvoiceReturnSummary
          totalReturnValues={totalReturnValues}
          totalDiscount={saleInvoiceDiscount}
          finalRefundAmount={finalRefundAmount}
          isLoading={isPending}
          onConfirm={async (notesValue) => {
            const selectedItems = invoiceItems.filter((i) => i.checked);

            if (selectedItems.length === 0) {
              showSnackbar(
                "يرجى اختيار صنف واحد على الأقل لإنشاء فاتورة المرتجع",
                "error",
              );
              return;
            }

            const finalReason =
              returnReason && returnReason.trim() !== ""
                ? returnReason
                : "OTHER";

            const requestBody = {
              idempotencyKey: getKey(),
              referenceSaleInvoiceId: items[0]?.saleInvoiceId,
              invoiceDate: new Date().toISOString(),
              notes: notesValue || "مرتجع من فاتورة بيع",
              items: selectedItems.map((item) => {
                // التحقق من أن المستخدم قد اختار دفعة إذا كان هناك أكثر من دفعة
                const batchId =
                  item.selectedBatchId ||
                  item.batches?.[0]?.saleInvoiceItemBatchId ||
                  item.saleInvoiceItemId;

                return {
                  saleInvoiceItemBatchId: batchId, // إرسال الـ ID الصحيح للدفعة المختارة
                  unitType: item.unitType,
                  displayQuantity: item.selectedQuantity,
                  returnReason: finalReason,
                  restockToInventory: true,
                };
              }),
            };

            try {
              // 2. إرسال الريكوست باستخدام mutateAsync وعرض رسالة النجاح
              await mutateAsync(requestBody);
              clearKey(); // مسح الـ idempotency key عند النجاح

              showSnackbar("تم إنشاء فاتورة المرتجع بنجاح", "success");

              // يمكنك توجيه المستخدم لصفحة أخرى بعد النجاح إن أردت
              // setTimeout(() => navigate(-1), 1500);
            } catch (error: any) {
              console.error("Error creating return invoice:", error.message);
              if (
                error.message ===
                "Returned quantity exceeds sold quantity for saleInvoiceItemBatchId 1"
              ) {
                showSnackbar(
                  `الكمية المرتجعة للصنف أكبر من الكمية المباعة `,
                  "error",
                );
              } else {
                showSnackbar("حدث خطأ أثناء إنشاء فاتورة المرتجع", "error");
              }
            }
          }}
          onCancel={() => navigate(-1)}
        />
      </Box>
    </Box>
  );
};

export default CreateReturnInvoicePage;
