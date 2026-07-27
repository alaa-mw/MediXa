import { useEffect, useState } from "react";
import { Box, Button, Chip, Pagination, Stack } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import CustomerOrderCard from "./CustomerOrderCard";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import EmptyState from "../../../shared/layout/EmptyState";
// import FilterDialog from "../purchase_invoices/components/FilterDialog";
import type { CustomerOrder, OrderStatus } from "../types/customerOrder";
import FilterDropDown from "./FilterDropdown";

const CustomerOrderGrid = () => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [localFilters, setLocalFilters] = useState({
    page: "",
    limit: "",
    status: "" as OrderStatus,
    search: "",
    fromDate: "",
    toDate: "",
    pharmacyDrugId: "",
  });

  const { data, isLoading, queryParams, setQueryParams } = useGetWithParams<
    CustomerOrder[]
  >("customer-request", localFilters);

  useEffect(() => {
    // keep query params in sync for debugging
    // console.log("customer orders filters", localFilters, queryParams);
  }, [localFilters, queryParams]);

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    setQueryParams({ ...newFilters, page: 1 });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <SearchBarDynamic
          placeholder="ابحث عن طلب (اسم أو رقم)..."
          onChange={(term) => {
            handleFilterChange("searchQuery", term);
          }}
        />

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

      <Stack direction="row" sx={{ my: 1, gap: 1, flexWrap: "wrap" }}>
        {localFilters.status && (
          <Chip
            label={`الحالة: ${localFilters.status}`}
            onDelete={() => handleFilterChange("status", "")}
          />
        )}
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
              <Box
                key={i}
                sx={{ bgcolor: "#f5f5f5", height: 120, borderRadius: 2 }}
              />
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
        onChange={(newFilters: any) => setLocalFilters(newFilters)}
        onApply={() => {
          setQueryParams(localFilters);
          setFilterAnchorEl(null);
        }}
        onClose={() => setFilterAnchorEl(null)}
      />
    </Box>
  );
};

export default CustomerOrderGrid;
