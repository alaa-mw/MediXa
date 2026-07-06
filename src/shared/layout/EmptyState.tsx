import React from "react";
import { Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

interface EmptyPurchaseInvoicesProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyPurchaseInvoicesProps> = ({
  icon = <InboxIcon sx={{ fontSize: "36px", color: "#64748b" }}  />,
  title = "عنوان",
  description = "وصف",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: -4,
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "bold",
            border: "3px solid #f8fafc",
          }}
        >
          ✕
        </Box>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1e2524" }}>
        {title}{" "}
      </Typography>
      <Typography
        variant="body2"
        color="#5a6369"
        sx={{ maxWidth: "400px", mb: 2 }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;
