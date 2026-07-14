import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceReturnsTable from "./components/InvoicReturnsTable";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import InvoiceSaleTable from "./components/InvoiceTableItem";
import ReturnTableWithHeader from "./components/ReturnTableWithHeader";
import InvoiceSummaryBar from "./components/InvoiceSummaryBar";
import { Save } from "@mui/icons-material";
import CreatReturnInvoice from "./components/InvoiceSummaryBar";

// الداتا المرفقة بطلبك مباشرة كـ Mock Data للتمثيل والاستخدام العلمي
const apiResponse = {
  success: true,
  statusCode: 200,
  message: "Request completed successfully",
  timestamp: "2026-06-18T02:40:33.758Z",
  path: "/api/sale-invoice/6",
  data: {
    saleInvoiceId: 6,
    pharmacyInvoiceId: 7,
    paymentStatus: "PAID",
    saleType: "NORMAL",
    subtotal: "475",
    discount: "0",
    totalAmount: "475",
    createdAt: "2026-06-18T01:14:09.574Z",
    updatedAt: "2026-06-18T01:14:09.574Z",
    pharmacyInvoice: {
      pharmacyInvoiceId: 7,
      pharmacyId: 1,
      patientId: 4,
      invoiceType: "SALE",
      invoiceDate: "2026-06-18T00:00:00.000Z",
      status: "POSTED",
      notes: null,
      idempotencyKey: null,
      createdAt: "2026-06-18T01:14:09.567Z",
      updatedAt: "2026-06-18T01:14:09.567Z",
      patient: {
        patientId: 4,
        pharmacyId: 1,
        fullName: "Ahmad Ali",
        nationalId: "123456789",
        phone: "0999999999",
        createdAt: "2026-06-17T02:38:32.289Z",
        updatedAt: "2026-06-17T02:38:32.289Z",
      },
    },
    items: [
      {
        saleInvoiceItemId: 6,
        saleInvoiceId: 6,
        pharmacyDrugId: 1,
        unitType: "STRIP",
        baseQuantity: 1,
        unitFactorToBase: 1,
        baseUnitPrice: "475",
        extraPercentage: "20",
        finalUnitPrice: "475",
        totalPrice: "475",
        createdAt: "2026-06-18T01:14:09.581Z",
        updatedAt: "2026-06-18T01:14:09.581Z",
        pharmacyDrug: {
          pharmacyDrugId: 1,
          pharmacyId: 1,
          drugId: 1,
          minStockAlert: 10,
          sellPart: true,
          netPrice: "7000",
          consumerPrice: "9500",
          expiryDateAlarm: 60,
          isActive: true,
          notes: "دواء مضاف من الكتالوج العام",
          createdAt: "2026-06-17T02:22:50.752Z",
          updatedAt: "2026-06-17T02:22:50.752Z",
          drug: {
            drugId: 1,
            source: "GENERAL",
            createdAt: "2026-06-17T02:21:06.969Z",
            updatedAt: "2026-06-17T02:21:06.969Z",
            generalDrug: {
              generalDrugId: 1,
              drugId: 1,
              dosageFormId: 1,
              tradeName: "cetamol",
              barcode: "123456789012398",
              unitsPerBox: 24,
              netPrice: "5.5",
              consumerPrice: "7",
              isRx: false,
              isActive: true,
              createdAt: "2026-06-17T02:21:06.969Z",
              updatedAt: "2026-06-17T02:21:06.969Z",
            },
            privateDrug: null,
          },
        },
        batchAllocations: [
          {
            saleInvoiceItemBatchId: 6,
            saleInvoiceItemId: 6,
            batchId: 1,
            baseQuantity: 1,
            unitCostAtSale: null,
            createdAt: "2026-06-18T01:14:09.587Z",
            batch: {
              batchId: 1,
              pharmacyDrugId: 1,
              supplierInvoiceItemId: null,
              expiryDate: "2027-05-01T00:00:00.000Z",
              initialQuantity: 30,
              soldQuantity: 29,
              receivedDate: "2025-01-10T00:00:00.000Z",
              status: "ACTIVE",
              createdAt: "2026-06-17T02:25:09.755Z",
              updatedAt: "2026-06-17T02:25:09.755Z",
            },
            displayQuantityFromThisBatch: 1,
          },
        ],
        displayQuantity: 1,
      },
      {
        saleInvoiceItemId: 7,
        saleInvoiceId: 6,
        pharmacyDrugId: 1,
        unitType: "STRIP",
        baseQuantity: 1,
        unitFactorToBase: 1,
        baseUnitPrice: "475",
        extraPercentage: "20",
        finalUnitPrice: "475",
        totalPrice: "475",
        createdAt: "2026-06-18T01:14:09.581Z",
        updatedAt: "2026-06-18T01:14:09.581Z",
        pharmacyDrug: {
          pharmacyDrugId: 1,
          pharmacyId: 1,
          drugId: 1,
          minStockAlert: 10,
          sellPart: true,
          netPrice: "7000",
          consumerPrice: "9500",
          expiryDateAlarm: 60,
          isActive: true,
          notes: "دواء مضاف من الكتالوج العام",
          createdAt: "2026-06-17T02:22:50.752Z",
          updatedAt: "2026-06-17T02:22:50.752Z",
          drug: {
            drugId: 1,
            source: "GENERAL",
            createdAt: "2026-06-17T02:21:06.969Z",
            updatedAt: "2026-06-17T02:21:06.969Z",
            generalDrug: {
              generalDrugId: 1,
              drugId: 1,
              dosageFormId: 1,
              tradeName: "unadol",
              barcode: "123456789012398",
              unitsPerBox: 24,
              netPrice: "5.5",
              consumerPrice: "7",
              isRx: false,
              isActive: true,
              createdAt: "2026-06-17T02:21:06.969Z",
              updatedAt: "2026-06-17T02:21:06.969Z",
            },
            privateDrug: null,
          },
        },
        batchAllocations: [
          {
            saleInvoiceItemBatchId: 6,
            saleInvoiceItemId: 6,
            batchId: 1,
            baseQuantity: 1,
            unitCostAtSale: null,
            createdAt: "2026-06-18T01:14:09.587Z",
            batch: {
              batchId: 1,
              pharmacyDrugId: 1,
              supplierInvoiceItemId: null,
              expiryDate: "2027-05-01T00:00:00.000Z",
              initialQuantity: 30,
              soldQuantity: 29,
              receivedDate: "2025-01-10T00:00:00.000Z",
              status: "ACTIVE",
              createdAt: "2026-06-17T02:25:09.755Z",
              updatedAt: "2026-06-17T02:25:09.755Z",
            },
            displayQuantityFromThisBatch: 1,
          },
        ],
        displayQuantity: 1,
      },
    ],
    returns: [
      {
        returnInvoiceId: 2,
        pharmacyInvoiceId: 8,
        referenceSaleInvoiceId: 6,
        subtotalRefund: "475",
        createdAt: "2026-06-18T02:40:04.414Z",
        updatedAt: "2026-06-18T02:40:04.414Z",
        pharmacyInvoice: {
          pharmacyInvoiceId: 8,
          pharmacyId: 1,
          patientId: null,
          invoiceType: "RETURN",
          invoiceDate: "2026-06-18T00:00:00.000Z",
          status: "POSTED",
          notes: "مرتجع من فاتورة بيع",
          idempotencyKey: "return-uuid-001",
          createdAt: "2026-06-18T02:40:04.406Z",
          updatedAt: "2026-06-18T02:40:04.406Z",
        },
        items: [
          {
            returnInvoiceItemId: 3,
            returnInvoiceId: 2,
            pharmacyDrugId: 1,
            saleInvoiceItemBatchId: 6,
            unitType: "STRIP",
            baseQuantity: 1,
            unitFactorToBase: 1,
            unitPrice: "475",
            totalPrice: "475",
            returnReason: "CUSTOMER_CHANGED_MIND",
            restockToInventory: true,
            createdAt: "2026-06-18T02:40:04.420Z",
            pharmacyDrug: {
              pharmacyDrugId: 1,
              pharmacyId: 1,
              drugId: 1,
              minStockAlert: 10,
              sellPart: true,
              netPrice: "7000",
              consumerPrice: "9500",
              expiryDateAlarm: 60,
              isActive: true,
              notes: "دواء مضاف من الكتالوج العام",
              createdAt: "2026-06-17T02:22:50.752Z",
              updatedAt: "2026-06-17T02:22:50.752Z",
            },
            saleInvoiceItemBatch: {
              saleInvoiceItemBatchId: 6,
              saleInvoiceItemId: 6,
              batchId: 1,
              baseQuantity: 1,
              unitCostAtSale: null,
              createdAt: "2026-06-18T01:14:09.587Z",
              batch: {
                batchId: 1,
                pharmacyDrugId: 1,
                supplierInvoiceItemId: null,
                expiryDate: "2027-05-01T00:00:00.000Z",
                initialQuantity: 30,
                soldQuantity: 29,
                receivedDate: "2025-01-10T00:00:00.000Z",
                status: "ACTIVE",
                createdAt: "2026-06-17T02:25:09.755Z",
                updatedAt: "2026-06-17T02:25:09.755Z",
              },
              saleInvoiceItem: {
                saleInvoiceItemId: 6,
                saleInvoiceId: 6,
                pharmacyDrugId: 1,
                unitType: "STRIP",
                baseQuantity: 1,
                unitFactorToBase: 1,
                baseUnitPrice: "475",
                extraPercentage: "20",
                finalUnitPrice: "475",
                totalPrice: "475",
                createdAt: "2026-06-18T01:14:09.581Z",
                updatedAt: "2026-06-18T01:14:09.581Z",
              },
            },
          },
        ],
      },
    ],
  },
};

const SaleInvoiceDetails = () => {
  const invoice = apiResponse.data;
  return (
    <Box sx={{ p: 1, width: "100%" }}>
      {/* 1. الهيدر العلوي */}
      <InvoiceHeader
        invoiceId={invoice.saleInvoiceId}
        createdAt={invoice.createdAt}
        paymentStatus={invoice.paymentStatus}
        saleType={invoice.saleType}
        totalAmount={invoice.totalAmount}
        subTotal={invoice.subtotal}
        discount={invoice.discount}
        isFive={invoice.paymentStatus == "PARTIAL" ? true : false}
      />

      {/* 3. تفاصيل محتوى الفاتورة والمرتجع */}
      <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
        <Grid sx={{ p: "0px !important", xs: 12, md: 12 }}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              width: "100%",
              mb: 3,
            }}
          >
            <InvoiceSaleTable data={invoice.items} />
          </Paper>

          {/* جدول المرتجعات */}
          {invoice.returns.length > 0 &&
            invoice.returns.map((returnInvoice) => (
              <ReturnTableWithHeader
                key={returnInvoice.returnInvoiceId}
                returnInvoice={returnInvoice}
              />
            ))}
        </Grid>
      </Grid>

      {/* 2. شريط ملخص الفاتورة السفلي */}
      {/* 2. شريط ملخص الفاتورة السفلي مرري له الـ items */}
      <CreatReturnInvoice items={invoice.items} discount={invoice.discount} />
    </Box>
  );
};

export default SaleInvoiceDetails;
