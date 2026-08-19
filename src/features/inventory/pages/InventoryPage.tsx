import React from "react";
import {
  Box,
  Grid,
  CircularProgress,
  Alert,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InventoryHeader } from "../components/InventoryHeader";
import { useInventoryData } from "../hooks/useInventoryData";
import { EmptyInventory } from "../components/inventory/EmptyInventory";
import { MedicineCard } from "../components/inventory/MedicineCard";

export const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    searchValue,
    activeTab,
    setActiveTab,
    currentPage,
    pharmacyDrugsList,
    totalPages,
    isLoading,
    isError,
    error,
    isInventoryEmpty,
    handleSearch,
    handlePageChange,
  } = useInventoryData(20);

  const handleNavigateToAdd = () => navigate("/pharmacy/inventory/add");

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          حدث خطأ أثناء تحميل بيانات المخزن: {error?.message}
        </Alert>
      </Box>
    );
  }

  if (isInventoryEmpty) {
    return <EmptyInventory onAddClick={handleNavigateToAdd} />;
  }

  return (
    <Box sx={{minHeight: "100vh" }}>
      {" "}
      <Box>
        <InventoryHeader
          onAddClick={handleNavigateToAdd}
          searchValue={searchValue}
          onSearchChange={handleSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box>
        {pharmacyDrugsList.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 8, color: "#64748b" }}>
            <Typography variant="body1">
              لا توجد أدوية مطابقة لبحثك الحالي.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ direction: "rtl" }}>
            {pharmacyDrugsList.map((drug) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={drug.pharmacyDrugId}>
                <MedicineCard medicine={drug} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 3,
            backgroundColor: "#f3fbfb",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            size="large"
            dir="ltr"
          />
        </Box>
      )}
    </Box>
  );
};

export default InventoryPage;
