import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type { PurchaseInvoiceDetails } from "../../types/purchaseInvoiceDetails";
import type { InvoiceStatus, PaymentStatus } from "../../types/enums";
import PurchaseInvoiceCard from "./PurchaseInvoiceCard";
import { SearchBar } from "../../../../shared/layout/SearchBar";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { useState } from "react";
import FilterDialog from "./FilterDialog";
import PurchaseInvoiceCardSkeleton from "./PurchaseInvoiceCardSkeleton";
import { useNavigate } from "react-router-dom";

const PurchaseInvoiceList = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "" as InvoiceStatus, // delete?
    supplierId: "",
    paymentStatus: "",
    fromDate: "",
    toDate: "",
  });

  const {
    data: invoices,
    isLoading,
    refetch,
    setQueryParams,
  } = useGetWithParams<PurchaseInvoiceDetails[]>("/supplier-invoice", filters);

  const paymentStatusLabels: Record<string, string> = {
    PAID: "مدفوع",
    PENDING: "معلق",
    PARTIAL: "مدفوع جزئياً",
  };

  const getFilterChips = () => {
    const chips = [];

    if (filters.supplierId) {
      chips.push({
        key: "supplierId",
        label: `المورد: ${filters.supplierId}`,
      });
    }

    if (filters.paymentStatus) {
      chips.push({
        key: "paymentStatus",
        label: `الدفع: ${
          paymentStatusLabels[filters.paymentStatus] ?? filters.paymentStatus
        }`,
      });
    }

    if (filters.fromDate) {
      chips.push({
        key: "fromDate",
        label: `من: ${filters.fromDate}`,
      });
    }

    if (filters.toDate) {
      chips.push({
        key: "toDate",
        label: `إلى: ${filters.toDate}`,
      });
    }

    return chips;
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: "",
    }));

    setQueryParams((prev) => ({
      ...prev,
      [key]: "",
    }));
  };
  const data = {
    success: true,
    statusCode: 200,
    message: "Request completed successfully",
    timestamp: "2026-06-15T01:37:52.895Z",
    path: "/api/supplier-invoice?supplierId=1&status=PENDING&paymentStatus=PENDING&fromDate=2026-01-01&toDate=2026-06-30",
    data: [
      {
        supplierInvoiceId: 5,
        supplierId: 1,
        invoiceNumber: "INV-2026-003",
        invoiceDate: "2026-06-09T00:00:00.000Z",
        paymentStatus: "PENDING" as PaymentStatus,
        subtotal: "300000",
        discount: "0",
        totalPrice: "300000",
        notes: "فاتورة بدون دفعات",
        status: "PENDING" as InvoiceStatus,
        createdAt: "2026-06-15T01:34:27.886Z",
        updatedAt: "2026-06-15T01:34:27.886Z",
        supplier: {
          supplierId: 1,
          pharmacyId: 1,
          supplierName: "Al Noor Supplier",
          phone: "0790000000",
          address: "Amman, Jordan",
          notes: "First batch supplier",
          createdAt: "2026-06-09T01:19:02.602Z",
          updatedAt: "2026-06-09T01:19:02.602Z",
        },
      },
      {
        supplierInvoiceId: 1,
        supplierId: 1,
        invoiceNumber: "INV-2026-002",
        invoiceDate: "2026-06-09T00:00:00.000Z",
        paymentStatus: "PENDING" as PaymentStatus,
        subtotal: "300000",
        discount: "0",
        totalPrice: "300000",
        notes: "فاتورة مع فرد مباشر للمخزون",
        status: "PENDING" as InvoiceStatus,
        createdAt: "2026-06-15T01:27:34.548Z",
        updatedAt: "2026-06-15T01:27:34.548Z",
        supplier: {
          supplierId: 1,
          pharmacyId: 1,
          supplierName: "Al Noor Supplier",
          phone: "0790000000",
          address: "Amman, Jordan",
          notes: "First batch supplier",
          createdAt: "2026-06-09T01:19:02.602Z",
          updatedAt: "2026-06-09T01:19:02.602Z",
        },
      },
      {
        supplierInvoiceId: 1,
        supplierId: 1,
        invoiceNumber: "INV-2026-002",
        invoiceDate: "2026-06-09T00:00:00.000Z",
        paymentStatus: "PENDING" as PaymentStatus,
        subtotal: "300000",
        discount: "0",
        totalPrice: "300000",
        notes: "فاتورة مع فرد مباشر للمخزون",
        status: "PENDING" as InvoiceStatus,
        createdAt: "2026-06-15T01:27:34.548Z",
        updatedAt: "2026-06-15T01:27:34.548Z",
        supplier: {
          supplierId: 1,
          pharmacyId: 1,
          supplierName: "Al Noor Supplier",
          phone: "0790000000",
          address: "Amman, Jordan",
          notes: "First batch supplier",
          createdAt: "2026-06-09T01:19:02.602Z",
          updatedAt: "2026-06-09T01:19:02.602Z",
        },
      },
      {
        supplierInvoiceId: 1,
        supplierId: 1,
        invoiceNumber: "INV-2026-002",
        invoiceDate: "2026-06-09T00:00:00.000Z",
        paymentStatus: "PENDING" as PaymentStatus,
        subtotal: "300000",
        discount: "0",
        totalPrice: "300000",
        notes: "فاتورة مع فرد مباشر للمخزون",
        status: "PENDING" as InvoiceStatus,
        createdAt: "2026-06-15T01:27:34.548Z",
        updatedAt: "2026-06-15T01:27:34.548Z",
        supplier: {
          supplierId: 1,
          pharmacyId: 1,
          supplierName: "Al Noor Supplier",
          phone: "0790000000",
          address: "Amman, Jordan",
          notes: "First batch supplier",
          createdAt: "2026-06-09T01:19:02.602Z",
          updatedAt: "2026-06-09T01:19:02.602Z",
        },
      },
      {
        supplierInvoiceId: 1,
        supplierId: 1,
        invoiceNumber: "INV-2026-002",
        invoiceDate: "2026-06-09T00:00:00.000Z",
        paymentStatus: "PENDING" as PaymentStatus,
        subtotal: "300000",
        discount: "0",
        totalPrice: "300000",
        notes: "فاتورة مع فرد مباشر للمخزون",
        status: "PENDING" as InvoiceStatus,
        createdAt: "2026-06-15T01:27:34.548Z",
        updatedAt: "2026-06-15T01:27:34.548Z",
        supplier: {
          supplierId: 1,
          pharmacyId: 1,
          supplierName: "Al Noor Supplier",
          phone: "0790000000",
          address: "Amman, Jordan",
          notes: "First batch supplier",
          createdAt: "2026-06-09T01:19:02.602Z",
          updatedAt: "2026-06-09T01:19:02.602Z",
        },
      },
    ],
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
        <SearchBar value={"hi"} onChange={() => console.log("search")} />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setFilterOpen(true)}
          startIcon={<FilterList />}
          sx={{
            minWidth: 100,
            height: 40,
            borderRadius: 2,
            fontWeight: "bold",
            bgcolor: "background.paper",
          }}
        >
          تصفية
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("add")}
          startIcon={<Add />}
          sx={{
            minWidth: 130,
            height: 40,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
           فاتورة شراء
        </Button>
      </Box>
      {getFilterChips().length > 0 ? (
        <Stack
          direction="row"
          sx={{
            spacing: 1,
            flexWrap: "wrap",
            mt: 2,
            mb: 2,
            gap: 1,
          }}
        >
          {getFilterChips().map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              color="success"
              variant="filled"
              onDelete={() => removeFilter(chip.key)}
            />
          ))}

          <Chip
            label="مسح الكل"
            color="error"
            onClick={() => {
              const clearedFilters = {
                status: "" as InvoiceStatus,
                supplierId: "",
                paymentStatus: "",
                fromDate: "",
                toDate: "",
              };

              setFilters(clearedFilters);
              setQueryParams(clearedFilters);
            }}
          />
        </Stack>
      ) : (
        <Box
          sx={{
            height: 32,
            mt: 2,
            mb: 2,
          }}
        />
      )}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <PurchaseInvoiceCardSkeleton key={index} />
            ))
          : data?.data.map((invoice) => (
              <PurchaseInvoiceCard
                key={invoice.supplierInvoiceId}
                data={invoice}
              />
            ))}
      </Box>
      <FilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onApply={() => {
          setQueryParams((prev) => ({
            ...prev,
            supplierId: filters.supplierId,
            paymentStatus: filters.paymentStatus,
            fromDate: filters.fromDate,
            toDate: filters.toDate,
          }));

          setFilterOpen(false);
          refetch();
        }}
      />
    </Box>
  );
};

export default PurchaseInvoiceList;
