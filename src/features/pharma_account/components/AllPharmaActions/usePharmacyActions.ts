import { useState } from "react";
import type { Pharmacy } from "../../types/allPharmaciesResponse";
import usePostData from "../../../../shared/hooks/usePostData";
import usePatchData from "../../../../shared/hooks/usePatchData";
import type { PharmacyStatusValue } from "../../../../shared/constants/pharmacyStatuses";

interface UsePharmacyActionsProps {
  refetch: () => void;
}

const usePharmacyActions = ({ refetch }: UsePharmacyActionsProps) => {
    
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<Pharmacy | null>(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const openStatusMenu = Boolean(anchorEl);

  // update pharmacy api
  const updatePharmacy = usePostData<any>(
    `/pharmacy/update/${selectedPharmacy?.pharmacyId}`,
  );

  // update pharmacy status api
  const patchStatus = usePatchData(
    `/pharmacy/${selectedPharmacy?.pharmacyId}/status`,
  );

  const handleEdit = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenEditDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setSelectedPharmacy(null);
  };

  const handleOpenStatusMenu = (
    event: React.MouseEvent<HTMLElement>,
    pharmacy: Pharmacy,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPharmacy(pharmacy);
  };

  const handleCloseStatusMenu = () => {
    setAnchorEl(null);
  };


  const changeStatus = (
    status: PharmacyStatusValue,
  ) => {
    if (!selectedPharmacy) return;

    patchStatus.mutate(
      {
        status,
      },
      {
        onSuccess: () => {
          handleCloseStatusMenu();

          refetch();
        },

        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const editPharmacy = (
    formData: {
      pharmacistLicenseNo: string;
      pharmacyName: string;
      contactPhone: string;
      governorate: string;
      healthDirectorate: string;
      areaName: string;
      addressText: string;
    },
  ) => {
    if (!selectedPharmacy) return;
    
    const cleanData = {
      pharmacistLicenseNo: formData.pharmacistLicenseNo,
      pharmacyName: formData.pharmacyName,
      contactPhone: formData.contactPhone,
      governorate: formData.governorate,
      healthDirectorate: formData.healthDirectorate,
      areaName: formData.areaName,
      addressText: formData.addressText,
    };
    updatePharmacy.mutate(
      cleanData,
      {
        onSuccess: () => {
          refetch();

          handleCloseDialog();
        },

        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return {
    // البيانات
    selectedPharmacy,

    // Dialog
    openEditDialog,

    handleEdit,

    handleCloseDialog,

    // Menu
    anchorEl,

    openStatusMenu,

    handleOpenStatusMenu,

    handleCloseStatusMenu,

    // API
    changeStatus,

    editPharmacy,

    // حالات التحميل (ستفيدنا لاحقاً)
    isUpdating: updatePharmacy.isPending,

    isChangingStatus: patchStatus.isPending,
  };
};

export default usePharmacyActions;