import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { detailData } from "../detailData";

const SupplierInfo = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: "background.paper",
        p: 4,
        m: 2,
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
          <Typography variant="body1" color="secondary">
            {detailData.data.supplier.supplierName}
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
          <Typography variant="body1" color="secondary">
            {detailData.data.supplier.phone}
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
          <Typography variant="body1" color="secondary">
            {detailData.data.supplier.address}
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
          <Typography variant="body1" color="secondary">
            {detailData.data.supplier.notes}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SupplierInfo;
