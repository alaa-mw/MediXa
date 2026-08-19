import React from "react";
import {
  Box,
  Grid,
  Alert,
  Pagination,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { MedicationLiquid, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MedicineCard } from "../components/inventory/MedicineCard";
import { MedicineCardSkeleton } from "../components/inventory/MedicineCardSkeleton"; // 👈 استيراد الـ Skeleton
import { AddMedicineButton } from "../components/AddMedicineButton";
import { FilterButton } from "../components/FilterButton";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import BarcodeMyDrugs from "../../../shared/layout/BarcodeMyDrugs";
import EmptyState from "../../../shared/layout/EmptyState";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { PharmacyDrug, PharmacyDrugsDataPayload } from "../types/pharnacyDrug";

export const InventoryPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    error,
    queryParams,
    setQueryParams,
  } = useGetWithParams<PharmacyDrugsDataPayload>(
    "/pharmacy-drugs/get-all-pharmacy-drugs",
    {
      name: "",
    }
  );

  const rawList = response?.data?.pharmacyDrugs;
  const pharmacyDrugsList: PharmacyDrug[] = Array.isArray(rawList) ? rawList : [];

  const totalPages = response?.data?.pages || 1;
  const currentPage = response?.data?.page || 1;
  const totalCount = response?.data?.total || 0;

  const handleNavigateToAdd = () => navigate("/pharmacy/inventory/add");

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setQueryParams((prev) => ({ ...prev, page: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* 1️⃣ Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1e103c", mb: 1 }}
          >
            إدارة المخزون
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            متابعة وإدارة الأدوية والمستلزمات الطبية المتوفرة في الصيدلية
          </Typography>
        </Box>

        {/* Total Items Card */}
        <Box
          sx={{
            background:
              theme.palette.gradient?.secondary ||
              "linear-gradient(135deg, #1e103c 0%, #3b1c71 100%)",
            borderRadius: 2,
            px: 4,
            py: 2,
            color: "white",
            textAlign: "center",
            minWidth: 200,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            إجمالي عدد الأدوية
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {totalCount}
          </Typography>
        </Box>
      </Box>

      {/* 2️⃣ Inventory Search & Controls Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
        >
          <SearchBarDynamic
            placeholder="ابحث عن الدواء (عبر الاسم أو الباركود)..."
            value={queryParams.name || ""}
            onChange={(term) =>
              setQueryParams((prev) => ({ ...prev, name: term, page: 1 }))
            }
            barcodeComponent={
              <BarcodeMyDrugs
                onFindResult={(result) => {
                  setQueryParams((prev) => ({
                    ...prev,
                    name: result.tradeName,
                    page: 1,
                  }));
                }}
              />
            }
          />
          <FilterButton />
          <AddMedicineButton
            onClick={handleNavigateToAdd}
            label="إضافة دواء جديد"
          />
        </Box>
      </Box>

      {/* 3️⃣ Pagination Bar */}
      <Stack
        direction="row"
        sx={{
          spacing: 1,
          flexWrap: "wrap",
          my: 1,
          mb: 3,
          gap: 1,
          height: 32,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ direction: "rtl" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              size="small"
              onChange={handlePageChange}
              disabled={isLoading}
            />
          </Box>
        </Box>
      </Stack>

      {/* 4️⃣ Main Content Area */}
      {isLoading ? (
        /* 🟢 عرض 8 كاردات Skeleton أثناء التحميل */
        <Grid container spacing={3} sx={{ direction: "rtl" }}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <MedicineCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Box sx={{ py: 2 }}>
          <Alert severity="error">
            حدث خطأ أثناء تحميل بيانات المخزن: {error?.message || "Internal Server Error"}
          </Alert>
        </Box>
      ) : (
        <>
          {/* Grid Section */}
          <Grid container spacing={3} sx={{ direction: "rtl" }}>
            {pharmacyDrugsList.map((drug) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={drug.pharmacyDrugId}>
                <MedicineCard medicine={drug} />
              </Grid>
            ))}
          </Grid>

          {/* Empty State Conditional Rendering */}
          {pharmacyDrugsList.length === 0 && (
            queryParams.name ? (
              <EmptyState
                icon={<Search sx={{ fontSize: 60, color: "#64748b" }} />}
                title="لا توجد نتائج للبحث"
                description="لا توجد أدوية مطابقة لمعايير البحث حالياً، يمكنك تعديل خيارات البحث أو إضافة دواء جديد بالضغط على زر 'إضافة دواء جديد' أعلاه."
              />
            ) : (
              <EmptyState
                icon={<MedicationLiquid sx={{ fontSize: 60, color: "#64748b" }} />}
                title="لا توجد أدوية في المخزن"
                description="لا توجد أدوية متوفرة في مخزن الصيدلية حالياً، يمكنك البدء بإضافة أول دواء بالضغط على زر 'إضافة دواء جديد' أعلاه."
              />
            )
          )}
        </>
      )}
    </Box>
  );
};

export default InventoryPage;