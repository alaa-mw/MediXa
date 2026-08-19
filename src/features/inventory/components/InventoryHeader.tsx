// features/inventory/components/InventoryHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import { AddMedicineButton } from "./AddMedicineButton";
import { FilterButton } from "./FilterButton";
import { SearchBar } from "./SearchBar";
import SearchBarDynamic from "../../../shared/layout/SearchBarDynamic";
import BarcodeMyDrugs from "../../../shared/layout/BarcodeMyDrugs";

interface InventoryHeaderProps {
  onAddClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onAddClick,
  searchValue,
  onSearchChange,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mb: 4,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        {/* <SearchBar value={searchValue} onChange={onSearchChange} /> */}
        <SearchBarDynamic
          placeholder="ابحث عن الدواء (عبر الاسم أو الباركود)..."
          onChange={onSearchChange} 
          barcodeComponent={
            <BarcodeMyDrugs 
              onFindResult={(result) => {
                console.log("تم العثور على الدواء:", result);
                onSearchChange(result.tradeName); 
                // later ask oula
              }}
            />
          }
        />
        <FilterButton />
        <AddMedicineButton onClick={onAddClick} label="إضافة دواء جديد" />
      </Box>
    </Box>
  );
};
