import { Box, Chip, Container, Typography } from "@mui/material";
import { detailData } from "../detailData";

const DetailsHeader = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "background.paper",
        p: 4,
        m: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          تفاصيل فاتورة الشراء
        </Typography>
        <Chip
          label={detailData.data.invoiceNumber}
          color="primary"
          variant="filled"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            السعر الكلي
          </Typography>
          <Typography
            variant="h5"
            color="secondary"
            sx={{ fontWeight: "bold" }}
          >
            {detailData.data.totalPrice}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            الحالة
          </Typography>
          <Chip label={detailData.data.status} color="info" variant="filled" />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            حالة الدفع
          </Typography>
          <Chip
            label={detailData.data.paymentStatus}
            color="info"
            variant="filled"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DetailsHeader;
