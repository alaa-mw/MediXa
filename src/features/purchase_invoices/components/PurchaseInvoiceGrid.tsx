import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  PurchaseInvoiceDetails,
  Supplier,
} from "../types/purchaseInvoice";
import type { PaymentStatus, SupplierInvoiceStatus } from "../types/enums";
import PurchaseInvoiceCard from "./PurchaseInvoiceCard";
import {
  Box,
  Button,
  Chip,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FilterDialog from "./FilterDialog";
import PurchaseInvoiceCardSkeleton from "./PurchaseInvoiceCardSkeleton";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../shared/layout/EmptyState";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import theme from "../../../shared/styles/mainTheme";
import BarcodeMyDrugs from "../../../shared/layout/BarcodeMyDrugs";

export interface PharmacyDrugSearch {
  pharmacyDrugId: string;
  tradeName: string;
}

const PurchaseInvoiceGrid = () => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [localFilters, setLocalFilters] = useState({
    status: "" as SupplierInvoiceStatus,
    paymentStatus: "" as PaymentStatus | "",
    fromDate: "",
    toDate: "",
    supplierId: "",
    pharmacyDrugId: "",
  });
  const [searchMode, setSearchMode] = useState<"supplier" | "drug">("supplier");
  const [selectedSearch, setSelectedSearch] = useState<
    PharmacyDrugSearch | Supplier | null
  >(null);
  const { data, isLoading, queryParams, setQueryParams } = useGetWithParams<
    PurchaseInvoiceDetails[]
  >("/supplier-invoice", localFilters);

  const {
    data: suppliersSearch,
    queryParams: suppliersQueryParams,
    setQueryParams: setSuppliersQueryParams,
  } = useGetWithParams<Supplier[]>(
    "/supplier",
    {
      searchQuery: "",
    },
    {
      shouldFetch: (params) =>
        String(params.searchQuery ?? "").trim().length >= 3 &&
        searchMode === "supplier",
    },
  );

  const {
    data: phDrugsSearch,
    // queryParams: phDrugsQueryParams,
    setQueryParams: setphDrugsQueryParams,
  } = useGetWithParams<PharmacyDrugSearch[]>(
    "/pharmacy-drugs/search-my-drugs/by-name",
    {
      name: "",
      page: "", //later
      limit: 10,
    },
    {
      shouldFetch: (params) =>
        String(params.name ?? "").trim().length >= 3 && searchMode === "drug",
    },
  );

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

    if (localFilters.supplierId && (selectedSearch as Supplier)) {
      chips.push({
        key: "supplierId",
        label: `المورد: ${(selectedSearch as Supplier)?.supplierName}`,
      });
    }
    if (localFilters.pharmacyDrugId && (selectedSearch as PharmacyDrugSearch)) {
      chips.push({
        key: "pharmacyDrugId",
        label: `الدواء: ${(selectedSearch as PharmacyDrugSearch)?.tradeName}`,
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
      page: "", // reset page to 1 when removing a filter
    };
    setLocalFilters(newFilters);
    setQueryParams(newFilters);
  };

  const removeAllFilters = () => {
    const clearedFilters = {
      status: "" as SupplierInvoiceStatus,
      paymentStatus: "" as PaymentStatus | "",
      fromDate: "",
      toDate: "",
      supplierId: "",
      pharmacyDrugId: "",
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

  const toggleAdornment = (
    <ToggleButtonGroup
      size="small"
      value={searchMode}
      exclusive
      onChange={(_, v) => v && setSearchMode(v)}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "12px",
        width: "fit-content",
        boxShadow: "none",
        "& .MuiToggleButton-root": {
          border: "none",
          borderRadius: "12px !important",
          fontWeight: "bold",
          color: "text.primary",
          transition: "all 0.3s ease",
          "&.Mui-selected": {
            backgroundColor: theme.palette?.tertiary?.light,
            color: "white",
          },
        },
      }}
    >
      <ToggleButton value="supplier">المورد</ToggleButton>
      <ToggleButton value="drug">الدواء</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {searchMode === "supplier" ? (
          <SearchBarDynamic<Supplier>
            startAdornment={toggleAdornment}
            placeholder="ابحث عن فاتورة مورد (عبر الاسم , رقم الموبايل)..."
            onChange={(term) => setSuppliersQueryParams({ searchQuery: term })}
            results={suppliersSearch?.data || []}
            getOptionLabel={(supplier) => supplier.supplierName}
            onSelect={(supplier) => {
              handleFilterChange("supplierId", supplier.supplierId);
              setSelectedSearch(supplier);
            }}
          />
        ) : (
          <SearchBarDynamic<PharmacyDrugSearch>
            startAdornment={toggleAdornment}
            placeholder="ابحث عن دواء فاتورة (عبر الاسم)..."
            onChange={(term) => setphDrugsQueryParams({ name: term })}
            results={phDrugsSearch?.data || []}
            getOptionLabel={(drug) => drug.tradeName}
            onSelect={(drug) => {
              handleFilterChange("pharmacyDrugId", drug.pharmacyDrugId);
              setSelectedSearch({
                pharmacyDrugId: drug.pharmacyDrugId,
                tradeName: drug.tradeName,
              });
            }}
            barcodeComponent={
              <BarcodeMyDrugs
                onFindResult={(result) => {
                  console.log("تم العثور على الدواء:", result);
                  handleFilterChange("pharmacyDrugId", result.id);
                  setSelectedSearch({
                    pharmacyDrugId: result.id,
                    tradeName: result.tradeName,
                  });
                }}
              />
            }
          />
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={(event) => setFilterAnchorEl(event.currentTarget)}
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
      {/* filters bar */}
      <Stack
        direction="row"
        sx={{
          spacing: 1,
          flexWrap: "wrap",
          my: 1,
          gap: 1,
          height: 32,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {getFilterChips().length > 0 && (
            <>
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
            </>
          )}
        </Box>
        {/* {(data?.meta?.totalPages ?? 1) > 1 && ( */}
        <Box sx={{ direction: "rtl" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={data?.meta?.totalPages ?? 1}
              page={data?.meta?.page ?? 1}
              size="small"
              onChange={(_, value) =>
                setQueryParams({ ...queryParams, page: value })
              }
            />
          </Box>
        </Box>
        {/* )} */}
      </Stack>
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
        anchorEl={filterAnchorEl}
        filters={localFilters}
        onChange={(newFilters) => setLocalFilters(newFilters)}
        onApply={() => {
          applyAdvancedFilters();
          setFilterAnchorEl(null);
        }}
        onClose={() => {
          removeAllFilters();
          setFilterAnchorEl(null);
        }}
      />
    </Box>
  );
};

export default PurchaseInvoiceGrid;
