import { Box, Button, Stack } from "@mui/material";
import type { PharmacyInfo } from "../../types/subscriptionDetailes";
import { Autorenew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface PharmacySubscriptionHeaderProps {
  pharmacy?: PharmacyInfo;
}

const PharmacySubscriptionHeader = ({
  pharmacy,
}: PharmacySubscriptionHeaderProps) => {
  const navigate = useNavigate();

  const handleRenewClick = () => {
    // if (isItOwner) {
    //   //pharmacy id will get from local storage
    //   navigate(
    //     `/admin/pharmacies/renew-subscription/${localStorage.getItem("pharmacyId")}`,
    //     {
    //       state: {},
    //     },
    //   );
    // } else {
    navigate(`/admin/pharmacies/renew-subscription/${pharmacy?.pharmacyId}`, {
      state: {
        // يمكنك تمرير تاريخ بداية الاشتراك الجديد هنا إذا كان متوفراً ضمن pharmacyInfo
        // startsAt: pharmacy.endsAt || new Date().toISOString(),
      },
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
        {pharmacy?.pharmacyName ?? "pharmacy"}
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
        تجديد الاشتراك
      </Button>
    </Stack>
  );
};

export default PharmacySubscriptionHeader;
