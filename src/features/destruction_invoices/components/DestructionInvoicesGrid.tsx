import React from 'react'

import { Box, Button, Chip, Stack } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import SearchBarDynamic from '../../../shared/layout/SearchBarDynamic';
import EmptyState from '../../../shared/layout/EmptyState';

const DestructionInvoicesGrid = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <SearchBarDynamic<T>
          placeholder="ابحث عن فاتورة مورد (عبر الاسم , رقم الموبايل)..."
          onChange={(term) => setSuppliersQueryParams({ searchQuery: term })}
          results={suppliersSearch?.data || []}
          getOptionLabel={(supplier) => supplier.supplierName}
          onSelect={(supplier) => {
            handleFilterChange("supplierId", supplier.supplierId);
          }}
        />

        <Button
          variant="outlined"
          color="primary"
        //   onClick={() => setFilterOpen(true)}
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
          فاتورة إتلاف
        </Button>
      </Box>
      {getFilterChips().length > 0 ? (
        <Stack
          direction="row"
          sx={{
            spacing: 1,
            flexWrap: "wrap",
            mt: 2,
            mb: 2,
            gap: 1,
          }}
        >
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
        </Stack>
      ) : (
        <Box
          sx={{
            height: 32,
            mt: 2,
            mb: 2,
          }}
        />
      )}
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
              <PurchaseInvoiceCardSkeleton key={index} />
            ))
          : data?.data.map((invoice) => (
              <PurchaseInvoiceCard
                key={invoice.supplierInvoiceId}
                data={invoice}
              />
            ))}
      </Box>
      {data?.data.length === 0 && !isLoading && (
        <EmptyState
          title="لا توجد فواتير إتلاف"
          description="لا توجد فواتير إتلاف لعرضها حالياً, يمكنك إضافة فاتورة إتلاف جديدة من خلال الضغط على زر 'فاتورة إتلاف' أعلاه.  "
        />
      )}
      <FilterDialog
        open={filterOpen}
        filters={localFilters}
        onChange={(newFilters) => setLocalFilters(newFilters)}
        onApply={() => {
          applyAdvancedFilters();
          setFilterOpen(false);
        }}
      />
    </Box>
  )
}

export default DestructionInvoicesGrid