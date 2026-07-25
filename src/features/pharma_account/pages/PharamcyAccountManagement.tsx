import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  AllPharmaciesResponse,
  Pharmacy,
} from "../types/allPharmaciesResponse";
import PharmaStatsCards from "../components/PharmaStats";
import PharmaciesTable from "../components/PharmaciesTable";
import PharmaInfoCard from "../components/PharmaInfoCard";

export const PharmacyManagement = () => {
  const { data, isLoading, refetch, setQueryParams } =
    useGetWithParams<AllPharmaciesResponse>("/pharmacy/get-all", {
      page: 1,
      limit: 10,
      name: "", // إضافة بارامتر البحث الأولي
      status: "", // إضافة بارامتر الحالة الأولي
    });

  const allPharmacies = data?.data.data ?? [];
  const paginationMeta = data?.data.meta;

  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleShowDetails = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsOpenDetails(true);
  };

  // 💡 التعامل مع البحث عند كل حرف وتحديث البارامترات وإعادة الصفحة إلى 1
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryParams((prev) => ({
      ...prev,
      name: value,
      page: 1, // العودة للصفحة الأولى عند البحث لتجنب فراغ النتائج
    }));
  };

  // 💡 التعامل مع تغيير فلتر الحالة
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryParams((prev) => ({
      ...prev,
      status: value,
      page: 1, // العودة للصفحة الأولى عند الفلترة
    }));
  };

  const textFieldStyles = {
    bgcolor: "#ffffff",
    borderRadius: 1,
    "& .MuiInputBase-input": {
      color: "#0F172A",
      textAlign: "right",
    },
    "& .MuiInputLabel-root": {
      right: 30,
      left: "auto",
      transformOrigin: "right",
      bottom: 20,
      color: "#8b6c64",
    },
    "& .MuiInputLabel-shrink": {
      right: 30,
      left: "auto",
    },
    "& .MuiSelect-icon": {
      right: "auto",
      left: 8,
    },
  };

  return (
    <Box>
      <Box>
        {/* Header */}
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#0F172A" }}
            >
              إدارة الصيدليات
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              إدارة الصيدليات في النظام وتتبع حالتها وحالة الاشتراك
            </Typography>
          </Box>
          <Box>
            <PharmaStatsCards
              numberOfPharmacies={paginationMeta?.total ?? 0}
              numberOfActiveSubscriptions={0}
            />
          </Box>
        </Stack>

        {/* أدوات البحث والفلترة فوق الجدول */}
        <Box
          sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "flex-start" }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="ابحث عن صيدلية أو مالك ... "
            // نقرأ القيمة الحالية للـ name من الـ queryParams أو نضع قيمة فارغة
            onChange={handleSearchChange}
            sx={{ width: 300, ...textFieldStyles }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            size="small"
            label="الحالات"
            defaultValue=""
            onChange={handleStatusChange}
            sx={{ width: 150, ...textFieldStyles }}
          >
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="ACTIVE">نشط</MenuItem>
            <MenuItem value="PENDING">قيد الانتظار</MenuItem>
            <MenuItem value="SUSPENDED">معلق</MenuItem>
            <MenuItem value="REJECTED">مرفوض</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="الاشتراك"
            defaultValue=""
            onChange={(e) => {
              // إذا كان الـ Backend يدعم فلترة الاشتراك أضفها هنا
              const value = e.target.value;
              setQueryParams((prev) => ({
                ...prev,
                subscription: value,
                page: 1,
              }));
            }}
            sx={{
              width: 150,
              ...textFieldStyles,
            }}
          >
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="جاري">جاري</MenuItem>
            <MenuItem value="منتهي">منتهي</MenuItem>
          </TextField>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{ display: "flex", gap: 3, alignItems: "stretch" }}
        >
          <Grid sx={{ flex: 3 }}>
            <Paper
              elevation={0}
              sx={{ border: "1px solid #E2E8F0", borderRadius: "8px" }}
            >
              {/* نمرر البيانات القادمة من الباكيند مباشرة بدون .filter() */}
              <PharmaciesTable
                data={allPharmacies}
                onShowDetails={handleShowDetails}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Paper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              <Pagination
                page={paginationMeta?.page ?? 1}
                count={paginationMeta?.totalPages ?? 1}
                color="primary"
                onChange={(_, page) => {
                  setQueryParams((prev) => ({
                    ...prev,
                    page,
                  }));
                }}
              />
            </Box>
          </Grid>
          {isOpenDetails && selectedPharmacy && (
            <Grid sx={{ flex: 1 }}>
              <PharmaInfoCard
                pharmacy={selectedPharmacy}
                onClose={() => setIsOpenDetails(false)}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default PharmacyManagement;
