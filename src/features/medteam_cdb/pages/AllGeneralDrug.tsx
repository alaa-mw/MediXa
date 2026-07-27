import {
  Box,
  Card,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GeneralDrugTable from "../components/GeneralDrugTable";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { GeneralDrug, PaginatedData } from "../types/allGeneralDrugType";
import { useState } from "react";
import type { DosageForm } from "../types/dosageFormType";

const AllGeneralDrug = () => {
  // 1. تعريف حالة الصفحة الحالية (تفتتح بالصفحة 1 وبحد 10 عناصر لكل صفحة)
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });

  // 2. استخدام الهوك لجلب البيانات الحقيقية من السيرفر
  const {
    data: response,
    isLoading,
    isError,
  } = useGetWithParams<PaginatedData<GeneralDrug>>(
    "/general-drugs",
    queryParams,
  );

  const paginatedResult = response?.data;
  const drugsList = paginatedResult?.data || [];
  const totalPages = paginatedResult?.pages || 1;
  const totalItems = paginatedResult?.total || 0;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <Box>
      <Box>
        {/* Header */}
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box
            sx={{
              mb: 4,
              textAlign: "right",
              // display: "flex",
              // justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#0F172A" }}
            >
              مراجعة الأدوية
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              ابحث عن معلومات شاملة عن الأدوية والبدائل والرؤى السريرية
            </Typography>
          </Box>
          <Card
            sx={{
              p: "8px 16px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
              border: "1px solid #3d9197",
              backgroundColor: "transparent",
              direction: "rtl",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              height: "80px",
              minHeight: "unset",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // التوسط العمودي للنصوص والرقم
                justifyContent: "center",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                }}
              >
                إجمالي الأدوية
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#3d9197", // استخدام نفس لون البوردر المتناسق
                  fontFamily: "sans-serif",
                  fontSize: "1.6rem", // حجم ممتاز وسلس
                  lineHeight: 1, // يمنع حجز مساحة خفيفة أسفل الرقم
                  display: "inline-block",
                }}
              >
                {totalItems}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                دواء في القاعدة المركزية
              </Typography>
            </Box>
          </Card>
        </Stack>

        {/* أدوات البحث والفلترة فوق الجدول */}
        <Box
          sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "flex-start" }}
        >
          {/* <TextField
            variant="outlined"
            size="small"
            placeholder="ابحث عن صيدلية أو مالك ... "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          /> */}
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
              <GeneralDrugTable
                drugs={drugsList}
                isLoading={isLoading}
                isError={isError}
              />
            </Paper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              {totalPages > 1 && (
                <Pagination
                  page={paginatedResult?.page || 1}
                  count={totalPages}
                  color="primary"
                  onChange={handlePageChange}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AllGeneralDrug;
