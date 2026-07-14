import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import InvoiceReturnSummary from "./components/InvoiceReturnSummary";
import { format } from "date-fns";
import SelectDrugReturnTable from "./components/SelectDrugReturnTable";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIdempotency } from "../../../shared/hooks/useIdempotency";
import { usePostData } from "../../../shared/hooks/usePostData";
import type { ReturnInvoiceResponse } from "../Types/returnInvoiceResponse";

interface Props {
  items?: SaleInvoiceItem[];
  discount?: string;
}

// إضافة checked للنوع لتتبع الاختيار
type ReturnInvoiceItem = SaleInvoiceItem & {
  checked: boolean;
};

const toNumber = (value: string | number | undefined) =>
  Number.parseFloat(String(value ?? 0)) || 0;

const CreateReturnInvoicePage = ({ items: propsItems, discount }: Props) => {
  const location = useLocation();

  // جلب البيانات من الـ state أو الـ props
  const items = location.state?.items || propsItems || [];

  const [invoiceItems, setInvoiceItems] = useState<ReturnInvoiceItem[]>([]);

  useEffect(() => {
    if (items && Array.isArray(items)) {
      setInvoiceItems(
        items.map((item: SaleInvoiceItem) => {
          const qty = toNumber(item.displayQuantity) || 1;
          const unitPrice = toNumber(item.finalUnitPrice);
          return {
            ...item,
            displayQuantity: qty,
            totalPrice: (qty * unitPrice).toString(), // تهيئة السعر الإجمالي بناءً على الكمية الحالية
            checked: false,
          };
        }),
      );
    }
  }, [items]);

  // دالة تحديد/إلغاء تحديد الدواء
  const handleToggleCheck = (saleInvoiceItemId: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item.saleInvoiceItemId === saleInvoiceItemId
          ? { ...item, checked: !item.checked }
          : item,
      ),
    );
  };

  // دالة تحديث الكمية وتحديث السعر الإجمالي للسطر لحظياً
  const handleUpdateQuantity = (saleInvoiceItemId: number, delta: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) => {
        if (item.saleInvoiceItemId === saleInvoiceItemId) {
          const currentQty = toNumber(item.displayQuantity);
          const newQty = Math.max(1, currentQty + delta);
          const unitPrice = toNumber(item.finalUnitPrice);

          return {
            ...item,
            displayQuantity: newQty,
            // الكود المعدل: تحويل الناتج الرقمي إلى string ليطابق الـ Type الأصلي
            totalPrice: (newQty * unitPrice).toString(),
          };
        }
        return item;
      }),
    );
  };

  // إجمالي قيمة المرتجعات (لكل العناصر بغض النظر عن تحديد الـ Checkbox)
  const totalReturnValues = invoiceItems.reduce(
    (sum, item) => sum + toNumber(item.totalPrice),
    0,
  );

  // المبلغ المسترد الفعلي (فقط للعناصر المحددة بالـ Checkbox)
  const finalRefundAmount = invoiceItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + toNumber(item.totalPrice), 0);

  const todayDate = format(new Date(), "dd MMM yyyy");
  const createReturnInvoiceMutation = usePostData<ReturnInvoiceResponse>(
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
              alignItems: "flex-end",
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

            <Box
              sx={{
                textAlign: "left",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                py: 1,
                px: 2,
                bgcolor: "#ffffff",
                fontSize: "0.85rem",
              }}
            >
              CUSTOMER_CHANGED_MIND
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
          />
        </Paper>
      </Box>

      <Box
        sx={{
          width: "25%",
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch", // مهم
        }}
      >
        <InvoiceReturnSummary
          totalReturnValues={totalReturnValues}
          totalDiscount={toNumber(discount)}
          finalRefundAmount={finalRefundAmount}
          onConfirm={async (notesValue) => {
            const selectedItems = invoiceItems.filter((i) => i.checked);

            const requestBody = {
              idempotencyKey: getKey(),
              referenceSaleInvoiceId: items[0]?.saleInvoiceId,
              invoiceDate: new Date().toISOString(),
              notes: notesValue || "مرتجع من فاتورة بيع",
              items: selectedItems.map((item) => {
                const batchId =
                  item.batchAllocations?.[0]?.saleInvoiceItemBatchId ||
                  item.saleInvoiceItemId;

                return {
                  saleInvoiceItemBatchId: batchId,
                  unitType: item.unitType,
                  displayQuantity: item.displayQuantity,
                  returnReason: "CUSTOMER_CHANGED_MIND",
                  restockToInventory: true,
                };
              }),
            };

            try {
              console.log("Request Body for Return Invoice:", requestBody);
              // await createReturnInvoiceMutation.mutateAsync(requestBody);
              // // نجاح
              // clearKey();
            } catch (error) {
              // لا تحذف المفتاح

              console.error(error);
            }
          }}
          onCancel={() => console.log("Cancelled")}
        />
      </Box>
    </Box>
  );
};

export default CreateReturnInvoicePage;
