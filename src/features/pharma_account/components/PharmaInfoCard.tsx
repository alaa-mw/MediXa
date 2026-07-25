import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { Pharmacy } from "../types/allPharmaciesResponse";
import { Close } from "@mui/icons-material";

interface Prop {
  pharmacy: Pharmacy;
  onClose: () => void;
}

const PharmaInfoCard = ({ pharmacy, onClose }: Prop) => {
  return (
    <Card sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 1,
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", pr: 4 }}
        >
          تفاصيل الصيدلية
        </Typography>

        <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          اسم الصيدلية : {pharmacy.pharmacyName}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon fontSize="small" />
            {pharmacy.email}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneOutlinedIcon fontSize="small" />
            {pharmacy.contactPhone}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnOutlinedIcon fontSize="small" />
            {pharmacy.areaName} - {pharmacy.addressText}
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            مالك الصيدلية : {pharmacy.pharmacyOwner.user.fullName}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon fontSize="small" />
            {pharmacy.pharmacyOwner.user.email}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneOutlinedIcon fontSize="small" />
            {pharmacy.pharmacyOwner.user.phone}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: "row", mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>رقم الترخيص</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            {pharmacy.pharmacistLicenseNo}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexDirection: "row", mt: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}> الجهة المسؤولة</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            {pharmacy.healthDirectorate}
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", gap: 2, flexDirection: "row", mt: 4 }}>
            <Typography sx={{ fontWeight: "bold" }}>الجهة المسؤولة</Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {pharmacy.healthDirectorate}
            </Typography>
          </Box> */}
      </Box>
    </Card>
  );
};

export default PharmaInfoCard;
