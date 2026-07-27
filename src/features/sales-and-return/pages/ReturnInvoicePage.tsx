import React from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";

import { useReturnInvoicesData } from "../hooks/useReturnInvoicesData";
import { ReturnInvoiceHeader } from "../components/return/ReturnInvoiceHeader";
import { ReturnInvoiceCard } from "../components/return/ReturnInvoiceCard";
import { useNavigate } from "react-router-dom";

export const ReturnInvoicesPage: React.FC = () => {
  const {
    searchInput,
    currentPage,
    returnInvoicesList, // اسم المصفوفة الخاصة بالمرتجع حسب الهوك لديكِ
    totalPages,
    isLoading,
    isError,
    error,
    rawFilters,
    handleSearch,
    handlePageChange,
    handleAdvancedFiltersApply,
    handleClearAllFilters,
  } = useReturnInvoicesData(20);

  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* ربط هيدر المرتجعات المطور بكامل صلاحيات الفلترة */}
      <ReturnInvoiceHeader
        onAddReturnClick={() => console.log("فتح نافذة إنشاء مرتجع جديد")}
        searchValue={searchInput}
        onSearchChange={handleSearch}
        rawFilters={rawFilters}
        onApplyFilters={handleAdvancedFiltersApply}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* معالجة حالة التحميل */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* معالجة حالة الخطأ */}
      {isError && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: "8px" }}>
          {error instanceof Error
            ? error.message
            : "فشل في جلب فواتير المرتجعات من السيرفر."}
        </Alert>
      )}

      {/* عرض البيانات */}
      {!isLoading && !isError && (
        <>
          {returnInvoicesList.length > 0 ? (
            <>
              {/* شبكة الكروت مع الـ Grid المطور */}
              <Grid container spacing={2.5}>
                {returnInvoicesList.map((invoice) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={invoice.returnInvoiceId}
                  >
                    <ReturnInvoiceCard
                      invoice={invoice}
                      onDetailsClick={(id) =>
                        navigate(`/pharmacy/sales/return-details/${id}`)
                      }
                    />
                  </Grid>
                ))}
              </Grid>

              {/* الترقيم (Pagination) */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                    direction: "ltr",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </>
          ) : (
            /* حالة عدم وجود نتائج */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyBox: "center",
                py: 12,
                mt: 2,
              }}
            >
              <Typography sx={{ mb: 0.5 }}>
                لا توجد فواتير مرتجعات مطابقة للفلاتر النشطة.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ReturnInvoicesPage;
