import { Box, Container, Typography } from "@mui/material";
import { detailData } from "../detailData";

const InvoiceSummary = () => {
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
        معلومات الفاتورة
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
            رقم الفاتورة
          </Typography>
          <Typography variant="body1" color="secondary">
            {detailData.data.invoiceNumber}
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
            تاريخ الفاتورة{" "}
          </Typography>
          <Typography variant="body1" color="secondary">
            {detailData.data.invoiceDate}
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
            ملاحظة{" "}
          </Typography>
          <Typography variant="body1" color="secondary">
            {detailData.data.notes}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default InvoiceSummary;
