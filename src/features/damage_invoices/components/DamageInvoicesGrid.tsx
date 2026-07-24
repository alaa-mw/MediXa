import { Add, FilterList } from "@mui/icons-material";
import { Box, Button, Chip, Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import EmptyState from "../../../shared/layout/EmptyState";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import type { PharmacyDrugSearch } from "../../purchase_invoices/components/PurchaseInvoiceGrid";
import type {
  DamageInvoice,
} from "../types/damageInvoice";
import type { PharmacyInvoiceStatus } from "../types/enums";
import DamageInvoiceCard from "./DamageInvoiceCard";
import DamageInvoiceCardSkeleton from "./DamageInvoiceCardSkeleton";
import FilterDropDown from "./FilterDropDown";

const DamageInvoicesGrid = () => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const [localFilters, setLocalFilters] = useState({
    page: "", // default = 20
    limit: "8",
    status: "" as PharmacyInvoiceStatus,
    fromDate: "",
    toDate: "",
    pharmacyDrugId: "",
  });

  const { data, isLoading, setQueryParams, queryParams } = useGetWithParams<
    DamageInvoice[]
  >("/damage-invoices", localFilters);

  const {
    data: phDrugsSearch,
    // queryParams: phDrugsQueryParams,
    setQueryParams: setphDrugsQueryParams,
  } = useGetWithParams<PharmacyDrugSearch[]>(
    "/pharmacy-drugs/search-my-drugs/by-name",
    {
      name: "",
      page: "", //later
      limit: "",
    },
    {
      shouldFetch: (params) => String(params.name ?? "").trim().length >= 3,
    },
  );
  const handleFilterChange = (field: string, value: string) => {
    const newFilters = {
      ...localFilters,
      [field]: value,
      page: "", // reset page to 1 when filters change
    };
    setLocalFilters(newFilters);
    setQueryParams(newFilters);
  };

  const removeFilter = (key: string) => {
    const newFilters = {
      ...localFilters,
      [key]: "",
      page: "", // reset page to 1 when filters change
    };
    setLocalFilters(newFilters);
    setQueryParams(newFilters);
  };

  const removeAllFilters = () => {
    const clearedFilters = {
      page: "",
      limit: "",
      status: "" as PharmacyInvoiceStatus,
      fromDate: "",
      toDate: "",
      pharmacyDrugId: "",
    };
    setLocalFilters(clearedFilters);
    setQueryParams(clearedFilters);
  };

  const getFilterChips = () => {
    const chips = [];

    if (localFilters.status) {
      chips.push({
        key: "status",
        label: `حالة الفاتورة: ${localFilters.status}`,
      });
    }

    if (localFilters.pharmacyDrugId) {
      chips.push({
        key: "pharmacyDrugId",
        label: `الدواء: ${localFilters.pharmacyDrugId}`,
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <SearchBarDynamic<PharmacyDrugSearch>
          placeholder="ابحث عن دواء فاتورة (عبر الاسم)..."
          onChange={(term) => setphDrugsQueryParams({ name: term })} // page & limit reset (latet to fix, thought that is true)
          results={phDrugsSearch?.data || []}
          getOptionLabel={(drug) => drug.tradeName}
          onSelect={(drug) => {
            handleFilterChange("pharmacyDrugId", drug.pharmacyDrugId);
          }}
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={(event) =>
            setFilterAnchorEl((prev) => (prev ? null : event.currentTarget))
          }
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
          فاتورة إتلاف
        </Button>
      </Box>

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
        {(data?.meta?.totalPages ?? 1) > 1 && (
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
        )}
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
              <DamageInvoiceCardSkeleton key={index} />
            ))
          : data?.data.map((invoice) => (
              <DamageInvoiceCard key={invoice.damageInvoiceId} data={invoice} />
            ))}
      </Box>
      {data?.data.length === 0 && !isLoading && (
        <EmptyState
          title="لا توجد فواتير إتلاف"
          description="لا توجد فواتير إتلاف لعرضها حالياً, يمكنك إضافة فاتورة إتلاف جديدة من خلال الضغط على زر 'فاتورة إتلاف' أعلاه.  "
        />
      )}
      <FilterDropDown
        anchorEl={filterAnchorEl}
        filters={localFilters}
        onChange={(newFilters) =>
          setLocalFilters((prev) => ({ ...prev, ...newFilters, page: "" }))
        }
        onApply={() => {
          setQueryParams(localFilters);
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

export default DamageInvoicesGrid;
