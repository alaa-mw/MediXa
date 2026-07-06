import { Box } from "@mui/material";

import type { Pharmacy } from "../types/allPharmaciesResponse";

import PharmacyTableHeader from "./PharmacyTableHeader";
import PharmacyTableRow from "./PharmacyTableRow";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import PharmacyStatusMenu from "./PharmacyStatusMenu";
import EditPharmacyDialog from "./EditPharmaDialog";
import usePharmacyActions from "./AllPharmaActions/usePharmacyActions";

interface Props {
  data: Pharmacy[];
  isLoading: boolean;
  refetch: () => void;
  onShowDetails: (pharmacy: Pharmacy) => void;
}

const PharmaciesTable = ({
  data,
  isLoading,
  refetch,
  onShowDetails,
}: Props) => {
  const actions = usePharmacyActions({
    refetch,
  });

  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <PharmacyTableHeader />

      {isLoading ? (
        <LoadingState />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        data.map((pharmacy) => (
          <PharmacyTableRow
            key={pharmacy.pharmacyId}
            pharmacy={pharmacy}
            onEdit={actions.handleEdit}
            onDetails={onShowDetails}
            onOpenStatus={actions.handleOpenStatusMenu}
          />
        ))
      )}

      <EditPharmacyDialog
        open={actions.openEditDialog}
        pharmacy={actions.selectedPharmacy}
        onClose={actions.handleCloseDialog}
        onSubmit={actions.editPharmacy}
        isLoading={actions.isUpdating}
      />

      <PharmacyStatusMenu
        anchorEl={actions.anchorEl}
        open={actions.openStatusMenu}
        onClose={actions.handleCloseStatusMenu}
        onChangeStatus={actions.changeStatus}
      />
    </Box>
  );
};

export default PharmaciesTable;
