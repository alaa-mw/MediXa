import { Stack } from "@mui/material";
import EditButton from "./EditButton";
import SubscriptionHistoryButton from "./SubscriptionHistoryButton";
import type { Pharmacy } from "../../types/allPharmaciesResponse";
import DetailsButton from "./DetailsButton";

interface Props {
  pharmacy: Pharmacy;
  onEdit: (pharmacy: Pharmacy) => void;
  onDetails: (pharmacy: Pharmacy) => void;
}

const PharmaActionGroup = ({ pharmacy, onEdit, onDetails }: Props) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 1,
        "& > button, & > div": {
          minWidth: "10px",
          textAlign: "center",
        },
      }}
    >
      <EditButton pharmacy={pharmacy} onEdit={onEdit} />
      <DetailsButton pharmacy={pharmacy} onDetails={onDetails} />
      <SubscriptionHistoryButton pharmacyId={pharmacy.pharmacyId} />
    </Stack>
  );
};

export default PharmaActionGroup;
