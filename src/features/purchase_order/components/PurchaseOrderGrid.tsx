import { Add, FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import EmptyState from "../../../shared/layout/EmptyState";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import theme from "../../../shared/styles/mainTheme";
import type {
  PharmacyDrugSearch,
  PurchaseOrder,
  Supplier,
} from "../types/purchaseOrder";
import PurchaseOrderCard from "./PurchaseOrderCard";
import PurchaseOrderCardSkeleton from "./PurchaseOrderCardSkeleton";

const PurchaseOrderGrid = () => {
  const navigate = useNavigate();

  const [localFilters, setLocalFilters] = useState({
    page: 1,
    limit: 10,
    supplierId: "",
    pharmacyDrugId: "",
  });

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [selectedDrug, setSelectedDrug] = useState<PharmacyDrugSearch | null>(
    null,
  );
  const [searchMode, setSearchMode] = useState<"supplier" | "drug">("supplier");

  const { data, isLoading, setQueryParams } = useGetWithParams<PurchaseOrder[]>(
    "/purchase-order",
    localFilters,
  );

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
        String(params.searchQuery ?? "").trim().length >= 3,
    },
  );

  const {
    data: drugsSearch,
    queryParams: drugsQueryParams,
    setQueryParams: setDrugsQueryParams,
  } = useGetWithParams<PharmacyDrugSearch[]>(
    "/pharmacy-drugs/search-my-drugs/by-name",
    {
      name: "",
      page: "",
      limit: 10,
    },
    {
      shouldFetch: (params) => String(params.name ?? "").trim().length >= 3,
    },
  );

  const setFilterAndFetch = (patch: Partial<typeof localFilters>) => {
    const next = { ...localFilters, ...patch, page: 1 };
    setLocalFilters(next);
    setQueryParams(next);
  };

  const clearAllFilters = () => {
    const cleared = {
      page: 1,
      limit: 10,
      supplierId: "",
      pharmacyDrugId: "",
    };

    setSelectedSupplier(null);
    setSelectedDrug(null);
    setLocalFilters(cleared);
    setQueryParams(cleared);
  };

  const filterChips = useMemo(() => {
    const chips: { key: "supplierId" | "pharmacyDrugId"; label: string }[] = [];

    if (localFilters.supplierId && selectedSupplier) {
      chips.push({
        key: "supplierId",
        label: `المورد: ${selectedSupplier.supplierName}`,
      });
    }

    if (localFilters.pharmacyDrugId && selectedDrug) {
      chips.push({
        key: "pharmacyDrugId",
        label: `الدواء: ${selectedDrug.tradeName}`,
      });
    }

    return chips;
  }, [
    localFilters.supplierId,
    localFilters.pharmacyDrugId,
    selectedSupplier,
    selectedDrug,
  ]);

  const removeFilter = (key: "supplierId" | "pharmacyDrugId") => {
    if (key === "supplierId") {
      setSelectedSupplier(null);
    }

    if (key === "pharmacyDrugId") {
      setSelectedDrug(null);
    }

    setFilterAndFetch({ [key]: "" });
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
      <ToggleButton value="supplier">المورد</ToggleButton>
      <ToggleButton value="drug">الدواء</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        {searchMode === "supplier" ? (
          <SearchBarDynamic<Supplier>
            startAdornment={toggleAdornment}
            placeholder="ابحث عن المورد (3 أحرف على الأقل)"
            onChange={(term) =>
              setSuppliersQueryParams({
                ...suppliersQueryParams,
                searchQuery: term,
              })
            }
            results={suppliersSearch?.data ?? []}
            getOptionLabel={(supplier) => supplier.supplierName}
            onSelect={(supplier) => {
              setSelectedSupplier(supplier);
              setFilterAndFetch({ supplierId: String(supplier.supplierId) });
            }}
          />
        ) : (
          <SearchBarDynamic<PharmacyDrugSearch>
            startAdornment={toggleAdornment}
            placeholder="ابحث عن الدواء (3 أحرف على الأقل)"
            onChange={(term) =>
              setDrugsQueryParams({ ...drugsQueryParams, name: term })
            }
            results={drugsSearch?.data ?? []}
            getOptionLabel={(drug) => drug.tradeName}
            onSelect={(drug) => {
              setSelectedDrug(drug);
              setFilterAndFetch({
                pharmacyDrugId: String(drug.pharmacyDrugId),
              });
            }}
          />
        )}
        <Button
          variant="outlined"
          color="primary"
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
            whiteSpace: "nowrap",
          }}
        >
          طلب جديد
        </Button>
      </Stack>

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
          {filterChips.length > 0 && (
            <>
              {filterChips.map((chip) => (
                <Chip
                  key={chip.key}
                  label={chip.label}
                  color="success"
                  variant="filled"
                  onDelete={() => removeFilter(chip.key)}
                />
              ))}

              <Chip label="مسح الكل" color="error" onClick={clearAllFilters} />
            </>
          )}
        </Box>

        <Box
          sx={{ direction: "rtl", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={data?.meta?.totalPages ?? 1}
            page={data?.meta?.page ?? 1}
            size="small"
            onChange={(_, value) => {
              const next = { ...localFilters, page: value };
              setLocalFilters(next);
              setQueryParams(next);
            }}
          />
        </Box>
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
              <PurchaseOrderCardSkeleton key={i} />
            ))
          : (data?.data ?? []).map((order) => (
              <PurchaseOrderCard
                key={order.purchaseOrderId}
                data={order}
                onView={(id) => navigate(String(id))}
              />
            ))}
      </Box>

      {(data?.data?.length ?? 0) === 0 && !isLoading && (
        <EmptyState
          title="لا توجد طلبيات شراء"
          description="لا توجد طلبات مطابقة للفلاتر الحالية."
        />
      )}
    </Box>
  );
};

export default PurchaseOrderGrid;
