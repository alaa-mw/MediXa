
import { Box, Grid, Typography, CircularProgress, Alert, Pagination } from "@mui/material";

import { useSaleInvoicesData } from "../hooks/useSaleInvoicesData";
import { SaleInvoiceHeader } from "../components/sales/SaleInvoiceHeader";
import { SaleInvoiceCard } from "../components/sales/SaleInvoiceCard";

export const SaleInvoicesPage: React.FC = () => {
  const {
    searchInput,
    currentPage,
    invoicesList,
    totalPages,
    isLoading,
    isError,
    error,
    rawFilters, 
    handleSearch,
    handlePageChange,
    handleAdvancedFiltersApply, 
    handleClearAllFilters,      
  } = useSaleInvoicesData(20);

  return (
    <Box sx={{ minHeight: "100vh"}}>
      {/* <Container maxWidth="xl"> */}
        {/* ربط الهيدر المطور بكامل الصلاحيات الفلترة */}
        <SaleInvoiceHeader
          onAddInvoiceClick={() => console.log("فتح نافذة نقاط البيع POS")}
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
            {error instanceof Error ? error.message : "فشل في جلب الفواتير من السيرفر."}
          </Alert>
        )}

        {/* عرض البيانات */}
        {!isLoading && !isError && (
          <>
            {invoicesList.length > 0 ? (
              <>
                <Grid container spacing={2.5}>
                  {invoicesList.map((invoice) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={invoice.saleInvoiceId}>
                      <SaleInvoiceCard 
                        invoice={invoice} 
                        onDetailsClick={(id) => console.log(`فتح تفاصيل الفاتورة رقم ${id}`)} 
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* الترقيم */}
                {totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 5, direction: "ltr" }}>
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
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 12, mt: 2 }}>
                <Typography sx={{ mb: 0.5 }}>
                  لا توجد فواتير مطابقة للفلاتر النشطة.
                </Typography>
              </Box>
            )}
          </>
        )}
      {/* </Container> */}
    </Box>
  );
};