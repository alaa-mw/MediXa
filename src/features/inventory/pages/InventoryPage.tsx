// src/features/inventory/pages/InventoryPage.tsx
import React, { useState } from "react";
import { Box, Grid, CircularProgress, Alert, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetWithParams } from "../../../shared/hooks/useGetWithParams";
import { InventoryHeader } from "../components/InventoryHeader";
import { MedicineCard } from "../components/inventory/MedicineCard";
import type {
  PharmacyDrug,
  PharmacyDrugsResponse,
} from "../types/inventory.types";
import { EmptyInventory } from "../components/inventory/EmptyInventory";

export const InventoryPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("الكل");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  const { data, isLoading, isError, error } =
    useGetWithParams<PharmacyDrugsResponse>(
      "/pharmacy-drugs/get-all-pharmacy-drugs",
      {
        page: currentPage,
        limit: itemsPerPage,
        name: searchValue.trim() || undefined,
      },
    );

  const apiResponse = data as unknown as PharmacyDrugsResponse;
  const pharmacyDrugsList: PharmacyDrug[] =
    apiResponse?.data?.pharmacyDrugs || [];
  const totalPages: number = apiResponse?.data?.pages || 1;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <CircularProgress color="primary" />
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

  // 🟢 حالة الشرط: إذا كان المخزن فارغاً حقيقةً وليس بسبب نص كتابة في البحث
  const isInventoryEmpty =
    pharmacyDrugsList.length === 0 && !searchValue.trim();

  if (isInventoryEmpty) {
    return (
      <EmptyInventory onAddClick={() => navigate("/pharmacy/inventory/add")} />
    );
  }

  // 🟢 في حال وجود بيانات (أو وجود نص بحث لم يجد نتائج)، يظهر الهيدر والجدول الطبيعي
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f3fbfb",
      }}
    >
      <Box sx={{ p: 4, pb: 2, zIndex: 10 }}>
        <InventoryHeader
          onAddClick={() => navigate("/pharmacy/inventory/add")}
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 4, pb: 2 }}>
        {pharmacyDrugsList.length === 0 ? (
          // هذه تظهر فقط إذا كان المستخدم "يبحث عن دواء معين" ولم يجد نتائج
          <Box sx={{ textAlign: "center", mt: 8, color: "#64748b" }}>
            لا توجد أدوية مطابقة لبحثك الحالي.
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
