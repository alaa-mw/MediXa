import { AutorenewOutlined } from "@mui/icons-material";

import { Box, Chip, IconButton } from "@mui/material";

import PharmaActionGroup from "./AllPharmaActions/PharmaActionGroup";

import getStatusArabic from "../../../shared/constants/method/TranslateStatus";
import getStatusStyles from "../../../shared/constants/method/StatusColor";

import type { Pharmacy } from "../types/allPharmaciesResponse";

interface Props {
  pharmacy: Pharmacy;

  onEdit: (pharmacy: Pharmacy) => void;

  onDetails: (pharmacy: Pharmacy) => void;

  onOpenStatus: (
    event: React.MouseEvent<HTMLElement>,
    pharmacy: Pharmacy,
  ) => void;
}

const getSubscriptionStyles = (active: boolean) => {
  return active
    ? {
        bgcolor: "#E6F4EA",
        color: "#137333",
      }
    : {
        bgcolor: "#FCE8E6",
        color: "#C5221F",
      };
};

const PharmacyTableRow = ({
  pharmacy,
  onEdit,
  onDetails,
  onOpenStatus,
}: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 4fr",
        p: 1.2,
        borderTop: "1px solid #E2E8F0",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ fontWeight: 500 }}>{pharmacy.pharmacyName}</Box>

        <Box
          sx={{
            fontSize: 12,
            color: "#64748B",
            mt: 0.5,
          }}
        >
          {pharmacy.email}
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        {pharmacy.pharmacyOwner.user.fullName}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Chip
          label={getStatusArabic(pharmacy.status)}
          size="small"
          sx={{
            width: 85,
            fontWeight: 600,
            fontSize: 12,
            ...getStatusStyles(pharmacy.status),
          }}
        />

        <IconButton
          size="small"
          sx={{
            ...getStatusStyles(pharmacy.status),
          }}
          onClick={(e) => onOpenStatus(e, pharmacy)}
        >
          <AutorenewOutlined fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        {pharmacy.openingDate.split("T")[0]}
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Chip
          label={pharmacy.hasActiveSubscription ? "مفعل" : "غير مفعل"}
          size="small"
          sx={{
            width: 80,
            fontWeight: 600,
            fontSize: 12,
            ...getSubscriptionStyles(pharmacy.hasActiveSubscription),
          }}
        />
      </Box>

      <Box>
        <PharmaActionGroup
          pharmacy={pharmacy}
          onEdit={onEdit}
          onDetails={onDetails}
        />
      </Box>
    </Box>
  );
};

export default PharmacyTableRow;
