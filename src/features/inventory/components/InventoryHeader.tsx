// features/inventory/components/InventoryHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import { AddMedicineButton } from "./AddMedicineButton";
import { FilterButton } from "./FilterButton";
import { SearchBar } from "./SearchBar";
import { CategoryTabs } from "./inventory/CategoryTabs";

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
        <SearchBar value={searchValue} onChange={onSearchChange} />
        <FilterButton />
        <AddMedicineButton onClick={onAddClick}  label="إضافة دواء جديد" />
      </Box>
      <CategoryTabs activeTab={activeTab} onChange={setActiveTab} />
    </Box>
  );
};
