import React from "react";
import { alpha, Box, Container, Typography } from "@mui/material";
import type { Supplier } from "../../types/purchaseInvoice";
import theme from "../../../../shared/styles/mainTheme";

const SupplierInfo = ({ supplier }: { supplier: Supplier }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: alpha(theme.palette.tertiary.main, 1),
        color: "white",
        p: 4,
        mb: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        معلومات المورد
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            اسم المورد
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier.supplierName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            رقم الموبايل{" "}
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier.phone}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            العنوان{" "}
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier.address}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            ملاحظات{" "}
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier.notes}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SupplierInfo;
