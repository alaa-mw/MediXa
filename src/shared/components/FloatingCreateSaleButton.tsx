import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { Fab } from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";

const FloatingCreateSaleButton: React.FC = () => {
  const { pathname } = useLocation();

  // Hide when already on the create sale page
  if (pathname.endsWith("/sales/sales/create")) return null;

  const handleClick = () => {
    // Opens the create-sale route in a new tab
    window.open("/pharmacy/sales/sales/create", "_blank");
  };

  return (
    <Fab
      color="secondary"
      aria-label="create-sale"
      onClick={handleClick}
      sx={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: (theme) => theme.zIndex.modal + 2,
        boxShadow: "0 10px 24px rgba(29, 95, 193, 0.35)",
      }}
    >
      <AddShoppingCartRoundedIcon />
    </Fab>
  );
};

export default FloatingCreateSaleButton;
