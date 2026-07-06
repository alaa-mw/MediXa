
import React, { useState } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material"; // أضفنا Alert هنا

import { AddMedicineSearchBar } from "../components/AddMedicine/TitleAndSearchBar";
import { MedicineSearchResult } from "../components/AddMedicine/MedicineSearchResult";
import { FoundMedicineDialog } from "../components/AddMedicine/MedicineFoundDialog";
import { NotFoundMedicineDialog } from "../components/AddMedicine/MedicineNotFoundDialog";
import { useSearchCentralDrug } from "../hooks/useSearchCentralDrug";

export const AddMedicinePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [openFoundDialog, setOpenFoundDialog] = useState(false);
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);

  const { searchDrugByBarcode, loading, foundDrug, searchResult, error } =
    useSearchCentralDrug();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    searchDrugByBarcode(searchQuery);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f8fafc",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AddMedicineSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />

        <Box sx={{ flexGrow: 1, display: "flex", width: "100%", mt: 2 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                gap: 2,
              }}
            >
              <CircularProgress size={50} sx={{ color: "primary.main" }} />
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                جاري فحص السجلات المركزية...
              </Typography>
            </Box>
          ) : error ? (
            <Box sx={{ width: "100%", mt: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          ) : (
            <MedicineSearchResult
              hasSearched={hasSearched}
              searchResult={searchResult}
              foundDrug={foundDrug}
              onOpenFound={() => setOpenFoundDialog(true)}
              onOpenNotFound={() => setOpenNotFoundDialog(true)}
            />
          )}
        </Box>
      </Box>

      <FoundMedicineDialog
        open={openFoundDialog}
        onClose={() => setOpenFoundDialog(false)}
        foundDrug={foundDrug}
      />

      <NotFoundMedicineDialog
        open={openNotFoundDialog}
        onClose={() => setOpenNotFoundDialog(false)}
        barcode={searchQuery}
      />
    </Box>
  );
};

export default AddMedicinePage;
