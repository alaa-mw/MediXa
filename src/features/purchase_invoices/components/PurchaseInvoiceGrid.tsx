import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  PurchaseInvoiceDetails,
  Supplier,
} from "../types/purchaseInvoiceDetails";
import type { PaymentStatus, SupplierInvoiceStatus } from "../types/enums";
import PurchaseInvoiceCard from "./PurchaseInvoiceCard";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FilterDialog from "./FilterDialog";
import PurchaseInvoiceCardSkeleton from "./PurchaseInvoiceCardSkeleton";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../shared/layout/EmptyState";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";

const PurchaseInvoiceGrid = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    status: "" as SupplierInvoiceStatus,
    supplierId: "",
    paymentStatus: "" as PaymentStatus | "",
    fromDate: "",
    toDate: "",
  });

  const { data, isLoading, queryParams, setQueryParams } = useGetWithParams<
    PurchaseInvoiceDetails[]
  >("/supplier-invoice", localFilters);

  const {
    data: suppliersSearch,
    queryParams: suppliersQueryParams,
    setQueryParams: setSuppliersQueryParams,
  } = useGetWithParams<Supplier[]>("/supplier", {
    searchQuery: "",
  });

  const paymentStatusLabels: Record<PaymentStatus, string> = {
    PAID: "مدفوع",
    PENDING: "معلق",
    PARTIAL: "مدفوع جزئياً",
  };

  const getFilterChips = () => {
    const chips = [];

    if (localFilters.status) {
      chips.push({
        key: "status",
        label: `حالة الفاتورة: ${localFilters.status}`,
      });
    }

    if (localFilters.supplierId) {
      chips.push({
        key: "supplierId",
        label: `المورد: ${localFilters.supplierId}`,
      });
    }

    if (localFilters.paymentStatus) {
      chips.push({
        key: "paymentStatus",
        label: `الدفع: ${
          paymentStatusLabels[localFilters.paymentStatus] ??
          localFilters.paymentStatus
        }`,
      });
    }

    if (localFilters.fromDate) {
      chips.push({
        key: "fromDate",
        label: `من: ${localFilters.fromDate}`,
      });
    }

    if (localFilters.toDate) {
      chips.push({
        key: "toDate",
        label: `إلى: ${localFilters.toDate}`,
      });
    }

    return chips;
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(newFilters);
    setQueryParams(newFilters);
  };

  const removeFilter = (key: string) => {
    const newFilters = {
      ...localFilters,
      [key]: "",
    };
    setLocalFilters(newFilters);
    setQueryParams(newFilters);
  };

  const removeAllFilters = () => {
    const clearedFilters = {
      status: "" as SupplierInvoiceStatus,
      supplierId: "",
      paymentStatus: "" as PaymentStatus | "",
      fromDate: "",
      toDate: "",
    };
    setLocalFilters(clearedFilters);
    setQueryParams(clearedFilters);
  };

  // تأخير الفلترات المعقدة للتطبيق
  const applyAdvancedFilters = () => {
    setQueryParams(localFilters);
  };

  useEffect(() => {
    console.log("Current filters:", localFilters);
    console.log("Current query params:", queryParams);
    console.log("Current query params:", suppliersQueryParams);
  }, [localFilters, queryParams, suppliersQueryParams]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <SearchBarDynamic<Supplier>
          placeholder="ابحث عن فاتورة مورد (عبر الاسم , رقم الموبايل)..."
          onChange={(term) => setSuppliersQueryParams({ searchQuery: term })}
          results={suppliersSearch?.data || []}
          getOptionLabel={(supplier) => supplier.supplierName}
          onSelect={(supplier) => {
            handleFilterChange("supplierId", supplier.supplierId);
          }}
        />

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

          <Chip label="مسح الكل" color="error" onClick={removeAllFilters} />
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
      {data?.data.length === 0 && !isLoading && (
        <EmptyState
          title="لا توجد فواتير شراء"
          description="لا توجد فواتير شراء لعرضها حالياً, يمكنك إضافة فاتورة شراء جديدة من خلال الضغط على زر 'فاتورة شراء' أعلاه.  "
        />
      )}
      <FilterDialog
        open={filterOpen}
        filters={localFilters}
        onChange={(newFilters) => setLocalFilters(newFilters)}
        onApply={() => {
          applyAdvancedFilters();
          setFilterOpen(false);
        }}
      />
    </Box>
  );
};

export default PurchaseInvoiceGrid;
