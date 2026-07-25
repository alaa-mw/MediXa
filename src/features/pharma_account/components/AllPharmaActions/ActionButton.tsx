import { Button } from "@mui/material";
import React, { type ReactNode } from "react";
interface ActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children?: ReactNode;
}
const ActionButton = ({
  label,
  onClick,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        borderColor: "#D5D5D5",
        color: "#3B3B3B",
        bgcolor: "#f8f8f8",
        fontSize: 12,
        fontWeight: 700,
        textTransform: "none",

        "&:hover": {
          borderColor: "#BDBDBD",
          backgroundColor: "#FAFAFA",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
