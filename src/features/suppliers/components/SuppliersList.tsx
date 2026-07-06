import { Add, Search } from "@mui/icons-material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetWithParams } from "../../../shared/hooks/useGetWithParams";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import theme from "../../../shared/styles/mainTheme";
import type { Supplier } from "../types/supplier";
import SupplierCard from "./SupplierCard";
import EmptyState from "../../../shared/layout/EmptyState";

const SuppliersList = () => {
  const { data, isLoading, refetch, queryParams, setQueryParams } =
    useGetWithParams<Supplier[]>("/supplier", {
      searchQuery: null,
    });

  useEffect(() => {
    console.log("queryParams:", queryParams);
  }, [queryParams]);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 2,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1e103c", mb: 1 }}
          >
            قائمة الموردين
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            إدارة وتتبع علاقات الموردين وسجلات التواصل
          </Typography>
        </Box>

        {/* Total Suppliers Card */}
        <Box
          sx={{
            background: `${theme.palette.gradient.secondary}`,
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
            إجمالي عدد الموردين
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {data?.data.length || 0}
          </Typography>
        </Box>
      </Box>

      {/* Controls & Filters Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        <SearchBarDynamic<Supplier>
          placeholder="ابحث عن  مورد (عبر الاسم , رقم الموبايل)..."
          onChange={(term) => setQueryParams({ searchQuery: term })}
        />
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
          مورد جديد
        </Button>
      </Box>

      {/* Grid Section */}
      <Grid container spacing={3}>
        {data?.data.map((supplier) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={supplier.supplierId}
          >
            <SupplierCard supplier={supplier} refetch={refetch} />
          </Grid>
        ))}
      </Grid>
      {data?.data.length === 0 && !isLoading && (
        <EmptyState
          icon={<Search sx={{ fontSize: 60, color: "#64748b" }} />}
          title="لا يوجد نتائح للبحث"
          description="لا توجد موردين لعرضها حالياً, يمكنك تعديل معايير البحث لمحاولة العثور على موردين أو إضافة مورد جديد من خلال الضغط على زر 'إضافة مورد' أعلاه.  "
        />
      )}
    </Box>
  );
};

export default SuppliersList;
