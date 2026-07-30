import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import CustomerOrderCard from "./CustomerOrderCard";
import CustomerOrderCardSkeleton from "./CustomerOrderCardSkeleton";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import EmptyState from "../../../shared/layout/EmptyState";
import type {
  CustomerOrder,
  CustomerRequestStatus,
} from "../types/customerOrder";
import FilterDropDown from "./FilterDropdown";
import type { PharmacyDrugSearch } from "../../purchase_invoices/components/PurchaseInvoiceGrid";
import BarcodeMyDrugs from "../../../shared/layout/BarcodeMyDrugs";
import theme from "../../../shared/styles/mainTheme";

const CustomerOrderGrid = () => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [localFilters, setLocalFilters] = useState({
    page: "",
    limit: "",
    status: "" as CustomerRequestStatus,
    search: "",
    fromDate: "",
    toDate: "",
    pharmacyDrugId: "",
  });
  const [searchMode, setSearchMode] = useState<"customer" | "drug">("customer");

  const [selectedSearch, setSelectedSearch] =
    useState<PharmacyDrugSearch | null>(null);

  const { data, isLoading, queryParams, setQueryParams } = useGetWithParams<
    CustomerOrder[]
  >("customer-request", localFilters);

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
      page: "",
      limit: "",
      status: "" as CustomerRequestStatus,
      search: "",
      fromDate: "",
      toDate: "",
      pharmacyDrugId: "",
    };
    setLocalFilters(clearedFilters);
    setQueryParams(clearedFilters);
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    setQueryParams({ ...newFilters, page: 1 });
  };

  // تأخير الفلترات المعقدة للتطبيق
  const applyAdvancedFilters = () => {
    setQueryParams(localFilters);
  };

  const getFilterChips = () => {
    const chips = [];

    if (localFilters.status) {
      chips.push({
        key: "status",
        label: `حالة الفاتورة: ${localFilters.status}`,
      });
    }

    if (localFilters.pharmacyDrugId && (selectedSearch as PharmacyDrugSearch)) {
      chips.push({
        key: "pharmacyDrugId",
        label: `الدواء: ${(selectedSearch as PharmacyDrugSearch)?.tradeName}`,
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
      <ToggleButton value="customer">الزبون</ToggleButton>
      <ToggleButton value="drug">الدواء</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {searchMode === "customer" ? (
          <SearchBarDynamic
            startAdornment={toggleAdornment}
            placeholder="ابحث عن طلب زبون (اسم أو رقم)..."
            onChange={(term) => {
              handleFilterChange("search", term);
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
          طلب جديد
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
          ? Array.from({ length: 6 }).map((_, i) => (
              <CustomerOrderCardSkeleton key={i} />
            ))
          : data?.data.map((order) => (
              <CustomerOrderCard
                key={order.customerRequestId}
                data={order}
                onView={(id) => navigate(String(id))}
              />
            ))}
      </Box>

      {data?.data.length === 0 && !isLoading && (
        <EmptyState
          title="لا توجد طلبات"
          description="لا توجد طلبات لعرضها حالياً."
        />
      )}

      <FilterDropDown
        anchorEl={filterAnchorEl}
        filters={localFilters}
        onChange={(newFilters) =>
          setLocalFilters((prev) => ({ ...prev, ...newFilters }))
        }
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

export default CustomerOrderGrid;
