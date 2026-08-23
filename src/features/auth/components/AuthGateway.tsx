import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import theme from "../../../shared/styles/mainTheme";
import { useNavigate } from "react-router-dom";

const AuthGateway= () => {
  const [role, setRole] = useState<"owner" | "pharmacy">("pharmacy");
  const navigate = useNavigate();

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: "owner" | "pharmacy" | null,
  ) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = () => {
    if (role == "owner") {
      navigate("/owner-login");
    } else if (role == "pharmacy") {
      navigate("/pharmacy-login");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: theme.palette?.primary?.main || "#2c3e50",
          textAlign: "center",
        }}
      >
        الرجاء تحديد نوع الحساب للمتابعة
      </Typography>

      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={handleRoleChange}
        aria-label="Account Type Selector"
        dir="rtl"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "50px",
          p: 0.5,
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: "50px !important", // Pill-shaped buttons
            px: { xs: 3, sm: 5 },
            py: 1.5,
            gap: 1.5,
            fontSize: "1.05rem",
            fontWeight: "bold",
            color: "text.primary",
            transition: "all 0.3s ease",
            "&.Mui-selected": {
              backgroundColor: theme.palette?.primary?.main || "#4a148c",
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: theme.palette?.primary?.dark || "#380b6e",
              },
            },
          },
        }}
      >
        <ToggleButton value="owner" aria-label="Pharmacy Owner">
          <StorefrontIcon fontSize="small" />
          مالك الصيدلية
        </ToggleButton>
        <ToggleButton value="pharmacy" aria-label="Pharmacist">
          <MedicalServicesIcon fontSize="small" />
          صيدلي
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{mt:4}}
      >
        متابعة
      </Button>
    </Box>
  );
};

export default AuthGateway;
