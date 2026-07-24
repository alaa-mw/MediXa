import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import PharmacySearchForOffer from "./PharmaSearchForOffer";
import PharmacyAssignCard from "./PharamaAssignCard";
import EmptyState from "./EmptyState";
import { useGetPharmacies } from "../../../hooks/useSearchPharamWithOffers";
import type { PharmacyItemData } from "../../../types/pharmacyItem"; // استيراد التايب الخاص بالصيدلية لمنع خطأ الـ any
import type { SelectedPharmacy } from "./PharmaAssigment";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedPharmacies: SelectedPharmacy[];
  onConfirm: (pharmacies: SelectedPharmacy[]) => void;
}

const PharmaciesSearchandSelectDialog = ({
  open,
  onClose,
  selectedPharmacies,
  onConfirm,
}: Props) => {
  const [searchInput, setSearchInput] = useState("");

  // ✅ التعديل هنا: استدعاء الاسم الصحيح pharmaciesList الذي يرسله الـ Hook
  const {
    pharmaciesList,
    totalPages, // تفكيك المتغير الجديد
    isLoading,
    searchPharmacies,
    changePage,
    queryParams,
  } = useGetPharmacies();

  const [localSelected, setLocalSelected] =
    useState<SelectedPharmacy[]>(selectedPharmacies);

  React.useEffect(() => {
    if (open) {
      setLocalSelected(selectedPharmacies);
      setSearchInput("");
      searchPharmacies("");
    }
  }, [open, selectedPharmacies]);

  const handleSearchSubmit = () => {
    searchPharmacies(searchInput);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    changePage(value);
  };

  const handleTogglePharmacy = (pharmacy: PharmacyItemData) => {
    setLocalSelected((prev) => {
      const exists = prev.some((p) => p.id === pharmacy.pharmacyId);

      if (exists) {
        return prev.filter((p) => p.id !== pharmacy.pharmacyId);
      }

      return [
        ...prev,
        {
          id: pharmacy.pharmacyId,
          name: pharmacy.pharmacyName, // أو pharmacy.pharmacyName حسب اسم الحقل الحقيقي
        },
      ];
    });
  };
  const handleConfirm = () => {
    onConfirm(localSelected);
    onClose();
  };
  console.log("Pharmacies List:", pharmaciesList); // إضافة هذا السطر لتصحيح الأخطاء ومعرفة ما إذا كانت البيانات تأتي بشكل صحيح
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: { borderRadius: "16px", p: 1, direction: "rtl" },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        اختيار الصيدليات المطلوبة
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          minHeight: "450px",
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* شريط البحث */}
        <PharmacySearchForOffer
          value={searchInput}
          onChange={setSearchInput}
          onSearchClick={handleSearchSubmit}
        />

        {/* قائمة الصيدليات */}
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Stack spacing={2} sx={{ position: "relative" }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={40} color="primary" />
              </Box>
            ) : !pharmaciesList || pharmaciesList.length === 0 ? ( // ✅ التعديل هنا للاعتماد على pharmaciesList
              <EmptyState />
            ) : (
              pharmaciesList.map(
                (
                  item: PharmacyItemData, // ✅ تعريف نوع الـ item لحل مشكلة implicit any
                ) => (
                  <PharmacyAssignCard
                    key={item.pharmacyId}
                    pharmacy={item}
                    selected={localSelected.some(
                      (p) => p.id === item.pharmacyId,
                    )}
                    onSelect={() => handleTogglePharmacy(item)}
                  />
                ),
              )
            )}
          </Stack>
        </Box>

        {/* شريط الترقيم السفلي */}
        {!isLoading && pharmaciesList && pharmaciesList.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              direction: "ltr",
            }}
          >
            <Pagination
              count={totalPages} // ✅ تحويلها إلى ديناميكية بناءً على الـ API الحقيقي
              page={queryParams.page || 1}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ borderRadius: "10px", px: 4 }}
        >
          تأكيد الاختيار ({localSelected.length})
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{ borderRadius: "10px", px: 3 }}
        >
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PharmaciesSearchandSelectDialog;
