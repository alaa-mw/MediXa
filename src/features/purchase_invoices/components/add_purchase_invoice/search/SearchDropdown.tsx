import { Paper } from "@mui/material";
import type { ReactNode } from "react";

type SearchDropdownProps = {
  children: ReactNode;
};

const SearchDropdown = ({ children }: SearchDropdownProps) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: "115%",
        left: 0,
        right: 0,
        zIndex: 100,
        borderRadius: "24px",
        border: "1px solid #ECE8EF",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        p: 2,
        bgcolor: "#FFFFFF",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      {children}
    </Paper>
  );
};

export default SearchDropdown;
