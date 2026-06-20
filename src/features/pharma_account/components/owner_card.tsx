import { useState, useMemo } from "react";
import { Card, CardContent, Grid, Typography, Box, alpha } from "@mui/material";
import CustomTextField from "./CustomTextField";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  OwnerForm,
  PharmacyRegistrationForm,
} from "../pages/CreatePharmacyAccount";

// استيراد المكونات الفرعية
import { OwnerActionButtons } from "./ownerActionButtons";
import { OwnerSearchDialog } from "./ownerSearchDialog";
import type { PharmacyOwnersPaginationData } from "../types/allOwnersResponse";

interface OwnerCardProps {
  ownerData: OwnerForm;
  ownerMode: "NEW" | "EXISTING";
  setFormData: React.Dispatch<React.SetStateAction<PharmacyRegistrationForm>>;
}

const OwnerAccountCard = ({
  ownerData,
  ownerMode,
  setFormData,
}: OwnerCardProps) => {
  const { data, isLoading } = useGetWithParams<PharmacyOwnersPaginationData>(
    "/pharmacy-owners",
    { page: 1, limit: 10 },
  );

  const isLocked = ownerMode === "EXISTING";
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  // تحضير مصفوفة الملاك
  const apiOwners = useMemo(() => {
    return (
      data?.data?.data?.map((owner) => ({
        id: owner.pharmacyOwnerId,
        name: owner.user.fullName,
        email: owner.user.email,
        phone: owner.user.phone,
        nationalId: owner.user.nationalId || "",
      })) || []
    );
  }, [data]);

  // فلترة الملاك
  const filteredOwners = useMemo(() => {
    return apiOwners.filter((owner) =>
      owner.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [apiOwners, search]);

  // عند اختيار مالك مسبق الصنع
  const handleSelectOwner = (owner: (typeof apiOwners)[0]) => {
    setFormData((prev) => ({
      ...prev,
      ownerMode: "EXISTING",
      newOwner: {
        id: owner.id,
        ownerName: owner.name,
        email: owner.email,
        mobile: owner.phone,
        nationalId: owner.nationalId || "",
      },
    }));
    setOpenDialog(false);
  };

  // عند تفريغ الحقول والعودة لمالك جديد
  const handleClearSelection = () => {
    setFormData((prev) => ({
      ...prev,
      ownerMode: "NEW",
      owner: { id: -1, ownerName: "", email: "", mobile: "", nationalId: "" },
    }));
  };

  // ✅ تصحيح الكتابة اليدوية: نقوم بتحديث الحقل داخل كائن الـ owner المتداخل
  const handleInputChange = (field: keyof OwnerForm, value: string) => {
    if (isLocked) return;
    setFormData((prev) => ({
      ...prev,
      newOwner: {
        ...prev.newOwner,
        [field]: value,
      },
    }));
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRight: `7px solid ${alpha("#5EED20", 0.25)}`,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h6">إنشاء حساب مالك الصيدلية</Typography>
          <OwnerActionButtons
            isLocked={isLocked}
            isLoading={isLoading}
            onClear={handleClearSelection}
            onOpenDialog={() => setOpenDialog(true)}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="اسم المالك"
              value={ownerData.ownerName}
              disabled={isLocked}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="البريد الإلكتروني"
              value={ownerData.email}
              disabled={isLocked}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="رقم الموبايل"
              value={ownerData.mobile}
              disabled={isLocked}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="الرقم الوطني"
              value={ownerData.nationalId}
              disabled={isLocked}
              onChange={(e) => handleInputChange("nationalId", e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>

      <OwnerSearchDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        search={search}
        onSearchChange={setSearch}
        filteredOwners={filteredOwners}
        onSelectOwner={handleSelectOwner}
      />
    </Card>
  );
};

export default OwnerAccountCard;
