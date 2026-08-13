import { Box, Button, Stack } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type PharmacySubscriptionHeader from "../../finance/components/subscriptionSchedule/PharmacySubscriptionHeader";

interface PharmacySubscriptionHeaderProps {
  pharmacy?: string;
}

const OwnerPharmacySubscriptionHeader = ({
  pharmacy,
}: PharmacySubscriptionHeaderProps) => {
  const navigate = useNavigate();

  const handleRenewClick = () => {
    //pharmacy id will get from local storage
    navigate(`/pharmacy_owner/renew-subscription`, {
      state: {},
    });
  };

  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        jestifyItems: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "22px", fontWeight: 700, color: "#000000" }}>
        {localStorage.getItem("pharmacyName") || "اشتراكات الصيدلية"}
      </Box>
      <Button
        variant="contained"
        onClick={handleRenewClick} // ربط دالة التوجيه عند النقر
        startIcon={<Autorenew />}
        sx={{
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "8px 20px",
          fontSize: "15px",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "none",
          gap: "6px",
          "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        تجديد اشتراك الصيدلية
      </Button>
    </Stack>
  );
};

export default OwnerPharmacySubscriptionHeader;
